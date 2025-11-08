#!/bin/bash

# Base API endpoint
BASE_URL="https://36zb8ptdo4.execute-api.us-east-1.amazonaws.com/Prod/get/stock"

# Path to your data file
DATA_FILE="src/data/stocks-au.json"

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
for ((i=0; i<${#tickers[@]}; i++)); do
  ticker=$(echo "${tickers[$i]}" | xargs) # Trim spaces
  echo "Fetching data for $ticker..."

  # Call API and append JSON to temp file
  curl -s "$BASE_URL/$ticker" >> "$TEMP_FILE"

  # Add comma if not last element
  if [ $i -lt $(( ${#tickers[@]} - 1 )) ]; then
    echo "," >> "$TEMP_FILE"
  fi
done

echo "]" >> "$TEMP_FILE"

# Move temp file to stocks.json
mv "$TEMP_FILE" "$DATA_FILE"

# Se o move foi bem-sucedido, faz upload para S3
if [ $? -eq 0 ]; then
    echo "Upload to S3..."
    aws s3 cp "$DATA_FILE" s3://finance-files-servless-fabio/ --acl public-read
    echo "Upload completed!"
else
    echo "Error: Failed to move file, skipping S3 upload."
fi
