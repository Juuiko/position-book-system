FROM golang:1.24-alpine AS builder
WORKDIR /build
# Assuming your Go plugin source is in ./plugins/rate-limiter/
COPY ./rate-limiter /build/ps-rate-limiter_source
COPY ./kafka-logger /build/ps-kafka-logger_source

WORKDIR /build/ps-rate-limiter_source
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/ps-rate-limiter .

WORKDIR /build/ps-kafka-logger_source
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/ps-kafka-logger .

FROM kong:3.6
USER root

# Copy plugin binary and startup script
COPY --from=builder /app/ps-rate-limiter /usr/local/kong/go-plugins/ps-rate-limiter
COPY --from=builder /app/ps-kafka-logger /usr/local/kong/go-plugins/ps-kafka-logger

RUN chmod +x /usr/local/kong/go-plugins/ps-rate-limiter
RUN chmod +x /usr/local/kong/go-plugins/ps-kafka-logger

COPY start-kong-with-plugins.sh /usr/local/bin/start-kong-with-plugins.sh
RUN chmod +x /usr/local/bin/start-kong-with-plugins.sh

USER kong

CMD ["/usr/local/bin/start-kong-with-plugins.sh"]