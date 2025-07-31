FROM golang:1.24-alpine AS builder
WORKDIR /build
# Assuming your Go plugin source is in ./plugins/rate-limiter/
COPY ./rate-limiter /build/ps-rate-limiter_source
# Change the working directory to the source directory where go.mod resides
WORKDIR /build/ps-rate-limiter_source
# Download dependencies (now that go.mod is in the current WORKDIR)
RUN go mod download
# RUN cd /build/ps-rate-limiter && go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/ps-rate-limiter .

FROM kong:3.6
USER root

# Copy plugin binary and startup script
COPY --from=builder /app/ps-rate-limiter /usr/local/kong/go-plugins/ps-rate-limiter

COPY start-kong-with-plugins.sh /usr/local/bin/start-kong-with-plugins.sh
RUN chmod +x /usr/local/kong/go-plugins/ps-rate-limiter
RUN chmod +x /usr/local/bin/start-kong-with-plugins.sh

USER kong

CMD ["/usr/local/bin/start-kong-with-plugins.sh"]