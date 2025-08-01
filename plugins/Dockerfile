# 1) Builder stage
FROM golang:1.24-alpine AS builder
WORKDIR /build

# Bring in your plugin sources
COPY ./rate-limiter   ./ps-rate-limiter_source
COPY ./kafka-logger   ./ps-kafka-logger_source

# Prepare the output directory
RUN mkdir -p /app/ps-rate-limiter /app/ps-kafka-logger

# Build the rate-limiter plugin
WORKDIR /build/ps-rate-limiter_source
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/ps-rate-limiter/ps-rate-limiter .

# Build the kafka-logger plugin
WORKDIR /build/ps-kafka-logger_source
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/ps-kafka-logger/ps-kafka-logger .

# 2) Kong image
FROM kong:3.6

USER root

# Create go-plugins dirs
RUN mkdir -p /usr/local/kong/go-plugins/ps-rate-limiter \
             /usr/local/kong/go-plugins/ps-kafka-logger

# Copy in the two statically-built binaries
COPY --from=builder /app/ps-rate-limiter/ps-rate-limiter   /usr/local/kong/go-plugins/ps-rate-limiter/ps-rate-limiter
COPY --from=builder /app/ps-kafka-logger/ps-kafka-logger   /usr/local/kong/go-plugins/ps-kafka-logger/ps-kafka-logger

# Make sure they're executable
RUN chmod +x /usr/local/kong/go-plugins/ps-rate-limiter/ps-rate-limiter \
             /usr/local/kong/go-plugins/ps-kafka-logger/ps-kafka-logger

# Change ownership to the kong user
RUN chown -R kong:kong /usr/local/kong/go-plugins

USER kong

CMD ["kong", "docker-start"]
