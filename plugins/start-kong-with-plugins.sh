#!/bin/sh
set -e

echo "=== Starting Kong first, then plugin ==="

# Start Kong in background
echo "Starting Kong..."
/docker-entrypoint.sh kong docker-start &
KONG_PID=$!

echo "Kong started with PID: $KONG_PID"

# Wait for Kong to fully initialize (this prevents it from cleaning up our socket)
echo "Waiting for Kong to initialize..."
sleep 10

# Check if Kong is still running
if ! kill -0 $KONG_PID 2>/dev/null; then
    echo "ERROR: Kong process died during startup!"
    exit 1
fi

# Now start the plugin
echo "Starting ps-rate-limiter plugin..."
/usr/local/kong/go-plugins/ps-rate-limiter &
PLUGIN_PID=$!

echo "Plugin started with PID: $PLUGIN_PID"

# Wait for socket to be created
SOCKET_PATH="/usr/local/kong/ps-rate-limiter.socket"
TIMEOUT=30
COUNTER=0
while [ ! -S "$SOCKET_PATH" ] && [ $COUNTER -lt $TIMEOUT ]; do
    echo "Waiting for plugin socket... ($COUNTER/$TIMEOUT)"
    
    # Check if plugin process is still running
    if ! kill -0 $PLUGIN_PID 2>/dev/null; then
        echo "ERROR: Plugin process died!"
        exit 1
    fi
    
    sleep 1
    COUNTER=$((COUNTER + 1))
done

if [ ! -S "$SOCKET_PATH" ]; then
    echo "ERROR: Plugin socket was not created within $TIMEOUT seconds"
    kill $PLUGIN_PID 2>/dev/null || true
    kill $KONG_PID 2>/dev/null || true
    exit 1
fi

echo "Plugin socket created successfully!"
ls -la "$SOCKET_PATH"

echo "Both Kong and plugin are running successfully!"

# Setup signal handlers to cleanup both processes
cleanup() {
    echo "Shutting down..."
    kill $PLUGIN_PID 2>/dev/null || true
    kill $KONG_PID 2>/dev/null || true
    exit
}

trap cleanup TERM INT

# Wait for Kong (main process)
wait $KONG_PID