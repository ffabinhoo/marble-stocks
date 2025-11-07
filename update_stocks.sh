#!/bin/bash

# Base API endpoint
BASE_URL="https://36zb8ptdo4.execute-api.us-east-1.amazonaws.com/Prod/get/stock"

# Path to your data file
DATA_FILE="src/data/stocks.json"

# Check if argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./update_stocks.sh TICKER1,TICKER2,TICKER3"
  exit 1
fi

# Split comma-separated tickers into array
IFS=',' read -r -a tickers <<< "$1"

# Create temp file for new data
TEMP_FILE=$(mktemp)
echo "[" > "$TEMP_FILE"

# Loop through tickers
for ticker in "${tickers[@]}"; do
  ticker=$(echo "$ticker" | xargs) # Trim spaces
  echo "Fetching data for $ticker..."
  
  # Call API and append JSON to temp file
  curl -s "$BASE_URL/$ticker" >> "$TEMP_FILE"
  
  # Add comma if not last element
  if [ "$ticker" != "${tickers[-1]}" ]; then
    echo "," >> "$TEMP_FILE"
  fi
done

echo "]" >> "$TEMP_FILE"

# Move temp file to stocks.json
mv "$TEMP_FILE" "$DATA_FILE"

