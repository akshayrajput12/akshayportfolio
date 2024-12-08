#!/bin/bash

# Check for x-overflow in React components
COMPONENTS_DIR="../components"

echo "Checking components for potential x-overflow issues:"

for file in $COMPONENTS_DIR/*.tsx; do
    echo "Analyzing $file:"
    
    # Check for width-related classes
    echo "Width-related classes:"
    grep -n "w-" "$file"
    
    # Check for max-width and overflow classes
    echo "Max-width and overflow classes:"
    grep -n "max-w-\|overflow-" "$file"
    
    # Check for horizontal padding and margins
    echo "Horizontal padding and margins:"
    grep -n "px-\|mx-" "$file"
    
    echo "---"
done
