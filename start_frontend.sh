#!/bin/bash

echo "🛡️  Starting Intrusion Detection System Frontend"
echo "================================================="

cd intrusion-detection-frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting Next.js development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo "================================================="

npm run dev
