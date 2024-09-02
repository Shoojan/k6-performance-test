#!/bin/bash

# Find the path to npm
NPM_PATH=$(which npm)

# Check if npm was found
if [ -z "$NPM_PATH" ]; then
    echo "npm is not installed or not in your PATH."
    exit 1
fi

# Run the build command
"$NPM_PATH" run build

docker compose down -v
docker compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker compose run --rm k6 run /dist/stage-test.js
