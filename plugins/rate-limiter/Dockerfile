# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the plugin
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o ps-rate-limiter .

# Runtime stage - minimal image
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/ps-rate-limiter .

# Make it executable
RUN chmod +x ./ps-rate-limiter

# Expose the plugin server port
EXPOSE 8080

CMD ["./ps-rate-limiter"]