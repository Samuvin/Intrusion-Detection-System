#!/usr/bin/env python3
"""
Script to start the Intrusion Detection API server
"""
import uvicorn
import os
import sys

def main():
    print("🛡️  Starting Intrusion Detection API Server...")
    print("=" * 50)
    
    # Check if model files exist
    model_files = [
        'intrusion_detection_model.h5',
        'model_metadata.json', 
        'preprocessing_stats.json'
    ]
    
    missing_files = []
    for file in model_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("⚠️  Warning: The following model files are missing:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nThe API will use mock predictions instead.")
        print("To use the real model, run the Jupyter notebook to generate these files.")
        print()
    else:
        print("✅ All model files found!")
        print()
    
    print("🚀 Starting server on http://localhost:8000")
    print("📖 API documentation available at http://localhost:8000/docs")
    print("❤️  Health check available at http://localhost:8000/health")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
        sys.exit(0)

if __name__ == "__main__":
    main()
