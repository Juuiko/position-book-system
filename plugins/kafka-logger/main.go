package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"sync"
	"time"

	"github.com/IBM/sarama"
	"github.com/Kong/go-pdk"
	"github.com/Kong/go-pdk/server"
)

type Config struct {
	KafkaBootstrapServers string `json:"kafka_bootstrap_servers"`
	Topic                 string `json:"topic"`
}

// MessageProducer interface - makes testing and swapping implementations easier
type MessageProducer interface {
	SendMessage(key, value string) error
	SendJSONMessage(key string, data interface{}) error
	Close() error
}

// KafkaAsyncProducer implements MessageProducer interface
type KafkaAsyncProducer struct {
	producer sarama.AsyncProducer
	topic    string
	wg       sync.WaitGroup
	closed   chan struct{}
}

// NewKafkaAsyncProducer creates a new KafkaAsyncProducer instance.
func NewKafkaAsyncProducer(brokers []string, topic string) (*KafkaAsyncProducer, error) {
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForLocal
	config.Producer.Compression = sarama.CompressionSnappy
	config.Producer.Flush.Frequency = 500 * time.Millisecond
	config.Producer.Return.Successes = true
	config.Producer.Return.Errors = true

	producer, err := sarama.NewAsyncProducer(brokers, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create producer: %w", err)
	}

	kp := &KafkaAsyncProducer{
		producer: producer,
		topic:    topic,
		closed:   make(chan struct{}),
	}

	// Start background goroutines to handle responses
	kp.startHandlers()

	return kp, nil
}

func (kp *KafkaAsyncProducer) startHandlers() {
	// Handle success messages
	kp.wg.Add(1)
	go func() {
		defer kp.wg.Done()
		for {
			select {
			case msg := <-kp.producer.Successes():
				fmt.Printf("[SUCCESS] Message sent to partition %d at offset %d\n",
					msg.Partition, msg.Offset)
			case <-kp.closed:
				return
			}
		}
	}()

	// Handle error messages
	kp.wg.Add(1)
	go func() {
		defer kp.wg.Done()
		for {
			select {
			case err := <-kp.producer.Errors():
				log.Printf("[ERROR] Failed to send message: %v", err.Err)
			case <-kp.closed:
				return
			}
		}
	}()
}

func (kp *KafkaAsyncProducer) SendMessage(key, value string) error {
	select {
	case <-kp.closed:
		return fmt.Errorf("producer is closed")
	default:
	}

	message := &sarama.ProducerMessage{
		Topic: kp.topic,
		Key:   sarama.StringEncoder(key),
		Value: sarama.StringEncoder(value),
	}

	// Non-blocking send
	select {
	case kp.producer.Input() <- message:
		fmt.Printf("[QUEUED] Message queued for sending: %s\n", value)
		return nil
	default:
		return fmt.Errorf("producer input channel is full")
	}
}

func (kp *KafkaAsyncProducer) SendJSONMessage(key string, data interface{}) error {
	select {
	case <-kp.closed:
		return fmt.Errorf("producer is closed")
	default:
	}

	// Convert data to string representation
	value := fmt.Sprintf("%+v", data)

	message := &sarama.ProducerMessage{
		Topic: kp.topic,
		Key:   sarama.StringEncoder(key),
		Value: sarama.StringEncoder(value),
		Headers: []sarama.RecordHeader{
			{Key: []byte("content-type"), Value: []byte("application/json")},
		},
	}

	select {
	case kp.producer.Input() <- message:
		fmt.Printf("[QUEUED] JSON message queued: %s\n", value)
		return nil
	default:
		return fmt.Errorf("producer input channel is full")
	}
}

func (kp *KafkaAsyncProducer) Close() error {
	close(kp.closed)
	kp.producer.AsyncClose()
	kp.wg.Wait()
	return nil
}

// ProducerManager handles the global producer instance
type ProducerManager struct {
	producer MessageProducer
	mu       sync.RWMutex
}

func NewProducerManager() *ProducerManager {
	return &ProducerManager{}
}

func (pm *ProducerManager) SetProducer(producer MessageProducer) {
	pm.mu.Lock()
	defer pm.mu.Unlock()
	pm.producer = producer
}

func (pm *ProducerManager) GetProducer() MessageProducer {
	pm.mu.RLock()
	defer pm.mu.RUnlock()
	return pm.producer
}

func (pm *ProducerManager) SendMessage(key, value string) error {
	producer := pm.GetProducer()
	if producer == nil {
		return fmt.Errorf("producer not initialized")
	}
	return producer.SendMessage(key, value)
}

func (pm *ProducerManager) SendJSONMessage(key string, data interface{}) error {
	producer := pm.GetProducer()
	if producer == nil {
		return fmt.Errorf("producer not initialized")
	}
	return producer.SendJSONMessage(key, data)
}

func (pm *ProducerManager) Close() error {
	producer := pm.GetProducer()
	if producer == nil {
		return nil
	}
	return producer.Close()
}

// Global producer manager instance
var producerManager = NewProducerManager()

// KafkaLogger plugin with dependency on MessageProducer
type KafkaLogger struct {
	producerManager *ProducerManager
}

func New() any {
	return &KafkaLogger{
		producerManager: producerManager,
	}
}

// Access is called for every request during the access phase
func (p *KafkaLogger) Access(kong *pdk.PDK) {
	// Get request information
	requestID, _ := kong.Request.GetHost()
	method, _ := kong.Request.GetMethod()
	path, _ := kong.Request.GetPath()

	accessData := map[string]interface{}{
		"phase":      "access",
		"request_id": requestID,
		"method":     method,
		"path":       path,
		"timestamp":  time.Now().Format(time.RFC3339),
	}

	err := p.producerManager.SendJSONMessage(requestID, accessData)
	if err != nil {
		log.Printf("Failed to send access message: %v", err)
		// In production, you might want to use Kong's logging instead
		kong.Log.Err("Failed to send access message: " + err.Error())
	}
}

// Response is called for every response during the response phase
func (p *KafkaLogger) Response(kong *pdk.PDK) {
	// Get request and response information
	requestID, _ := kong.Request.GetHost()
	method, _ := kong.Request.GetMethod()
	path, _ := kong.Request.GetPath()
	status, _ := kong.Response.GetStatus()

	responseData := map[string]interface{}{
		"phase":      "response",
		"request_id": requestID,
		"method":     method,
		"path":       path,
		"status":     status,
		"timestamp":  time.Now().Format(time.RFC3339),
	}

	err := p.producerManager.SendJSONMessage(requestID, responseData)
	if err != nil {
		log.Printf("Failed to send response message: %v", err)
		kong.Log.Err("Failed to send response message: " + err.Error())
	}
}

func main() {
	brokers := []string{"kafka:29092"}
	topic := "gateway-logs"

	// Create producer
	kafkaProducer, err := NewKafkaAsyncProducer(brokers, topic)
	if err != nil {
		log.Fatalf("Failed to create producer: %v", err)
	}

	// Set the producer in the global manager
	producerManager.SetProducer(kafkaProducer)

	defer func() {
		if err := producerManager.Close(); err != nil {
			log.Printf("Failed to close producer: %v", err)
		}
		fmt.Println("Producer closed successfully")
	}()

	// Handle shutdown gracefully
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt)

	// Start the Kong plugin server
	go func() {
		err := server.StartServer(New, "1.0.0", 1)
		if err != nil {
			log.Printf("Server error: %v", err)
			signals <- os.Interrupt
		}
	}()

	// Wait for shutdown signal
	<-signals
	fmt.Println("\nShutting down...")

	// Give time for final messages to be sent
	time.Sleep(2 * time.Second)
}
