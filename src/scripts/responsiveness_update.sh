#!/bin/bash

# Responsive Update Script for Portfolio Components

# Function to update Tailwind classes for responsiveness
update_responsiveness() {
    local file="$1"
    
    # Add responsive prefixes to existing classes
    sed -i 's/grid grid-cols-3/grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3/g' "$file"
    sed -i 's/grid-cols-2/grid-cols-1 sm:grid-cols-2/g' "$file"
    
    # Update padding and margin classes
    sed -i 's/p-4/p-2 sm:p-4/g' "$file"
    sed -i 's/px-8/px-4 sm:px-8/g' "$file"
    sed -i 's/py-16/py-8 sm:py-16/g' "$file"
    
    # Adjust text sizes
    sed -i 's/text-4xl/text-2xl sm:text-3xl md:text-4xl/g' "$file"
    sed -i 's/text-5xl/text-3xl sm:text-4xl md:text-5xl/g' "$file"
    sed -i 's/text-6xl/text-4xl sm:text-5xl md:text-6xl/g' "$file"
    
    # Flex and grid layout adjustments
    sed -i 's/flex-row/flex-col sm:flex-row/g' "$file"
    sed -i 's/items-center justify-between/items-center justify-center sm:justify-between/g' "$file"
}

# Process all TSX files in components directory
for file in ../components/*.tsx; do
    echo "Processing $file..."
    update_responsiveness "$file"
done

echo "Responsiveness update complete!"
