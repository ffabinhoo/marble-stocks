#!/bin/bash

# Base API endpoint
BASE_URL="https://36zb8ptdo4.execute-api.us-east-1.amazonaws.com/Prod/get/stock"

# Path to your data file
DATA_FILE="src/data/stocks-us.json"

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

  # Call API and capture response + status
  response=$(curl -s -w "%{http_code}" -o temp_response.json "$BASE_URL/$ticker")

  # 2. Substitui todos os NaN por null no arquivo JSON
  perl -pi -e 's/: *NaN(,|\})/: null\1/g' temp_response.json



  
  if [ "$response" -eq 200 ]; then
    cat temp_response.json >> "$TEMP_FILE"
    # Add comma if not last element
    if [ $i -lt $(( ${#tickers[@]} - 1 )) ]; then
      echo "," >> "$TEMP_FILE"
    fi
  else
    echo "Skipping $ticker due to error (HTTP $response)"
  fi
done


echo "]" >> "$TEMP_FILE"


# Remove trailing comma before closing bracket
#sed -i '' 's/,]$/]/' "$TEMP_FILE"   # macOS (BSD sed)
# For Linux, use:
sed -i 's/,]$/]/' "$TEMP_FILE"



# Move temp file to stocks.json
mv "$TEMP_FILE" "$DATA_FILE"

# Se o move foi bem-sucedido, faz upload para S3
if [ $? -eq 0 ]; then
    echo "Upload to S3..."
    aws s3 cp "$DATA_FILE" s3://finance-files-servless-fabio/ --acl public-read --profile fabio
    echo "Upload completed!"
else
    echo "Error: Failed to move file, skipping S3 upload."
fi
