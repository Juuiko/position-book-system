package main

import (
	"github.com/Kong/go-pdk"
	"github.com/Kong/go-pdk/server"
)

type Config struct{}

type RateLimiter struct{}

func New() any {
	return &RateLimiter{}
}

// Access is called for every request during the access phase
func (p *RateLimiter) Access(kong *pdk.PDK) {
	kong.Log.Info("Reqest test 123456789")
}

// Response is called for every response during the response phase
func (p *RateLimiter) Response(kong *pdk.PDK) {
	kong.Log.Info("Response test 123456789")
}

func main() {
	err := server.StartServer(New, "1.0.0", 1)
	if err != nil {
		panic(err)
	}
}
