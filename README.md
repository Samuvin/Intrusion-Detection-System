# 🛡️ Intrusion Detection System

A modern web-based intrusion detection system powered by machine learning, built with Next.js frontend and Python backend.

## 🌟 Features

- **AI-Powered Detection**: Neural network trained on KDD Cup 1999 dataset with 99.2% accuracy
- **Real-time Analysis**: Instant network traffic analysis with confidence scores
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **23 Attack Types**: Detects various intrusion types including DoS, probe, and infiltration attempts
- **Risk Assessment**: Automatic risk level classification (Low, Medium, High, Critical)
- **RESTful API**: FastAPI backend with automatic documentation

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐
│   Next.js       │ ──────────────► │   FastAPI       │
│   Frontend      │                 │   Backend       │
│   (Port 3000)   │ ◄────────────── │   (Port 8000)   │
└─────────────────┘                 └─────────────────┘
                                            │
                                            ▼
                                    ┌─────────────────┐
                                    │  TensorFlow     │
                                    │  Neural Network │
                                    │  Model          │
                                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Intrusion-Detection-System
```

### 2. Set Up the Backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Train and Export the Model

Run the Jupyter notebook `cloud_computing.ipynb` to train the model and export the necessary files:
- `intrusion_detection_model.h5`
- `model_metadata.json`
- `preprocessing_stats.json`

### 4. Start the Backend Server

```bash
python start_server.py
```

The API will be available at `http://localhost:8000`

### 5. Set Up the Frontend

```bash
cd ../intrusion-detection-frontend
npm install
npm run dev
```

The web interface will be available at `http://localhost:3000`

## 📊 Usage

1. **Open the Web Interface**: Navigate to `http://localhost:3000`
2. **Input Network Traffic Data**: Fill in the network traffic parameters
3. **Use Sample Data**: Click "Load Normal Sample" or "Load Attack Sample" for quick testing
4. **Analyze**: Click "Analyze Traffic" to get predictions
5. **Review Results**: View the detection results, confidence scores, and risk assessment

## 🔧 API Endpoints

### Backend API (Port 8000)

- `GET /` - API status
- `GET /health` - Health check and model status
- `POST /predict` - Make predictions on network traffic data
- `GET /docs` - Interactive API documentation

### Frontend API (Port 3000)

- `POST /api/predict` - Proxy endpoint that calls the backend

## 📈 Model Performance

- **Accuracy**: 99.2%
- **Dataset**: KDD Cup 1999 (494,021 samples)
- **Features**: 41 network traffic features
- **Classes**: 23 different attack types + normal traffic
- **Architecture**: Deep neural network with multiple hidden layers

## 🎯 Detected Attack Types

- **Normal Traffic**: Legitimate network activity
- **DoS Attacks**: back, land, neptune, pod, smurf, teardrop
- **Probe Attacks**: ipsweep, nmap, portsweep, satan
- **R2L Attacks**: ftp_write, guess_passwd, imap, multihop, phf, spy, warezclient, warezmaster
- **U2R Attacks**: buffer_overflow, loadmodule, perl, rootkit

## 🛠️ Development

### Project Structure

```
├── backend/                    # Python FastAPI backend
│   ├── main.py                # Main API application
│   ├── requirements.txt       # Python dependencies
│   └── start_server.py       # Server startup script
├── intrusion-detection-frontend/  # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   └── types/           # TypeScript type definitions
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.ts   # Tailwind CSS configuration
├── cloud_computing.ipynb     # ML model training notebook
└── README.md                # This file
```

### Adding New Features

1. **Backend**: Modify `backend/main.py` to add new endpoints
2. **Frontend**: Add new components in `src/components/`
3. **Types**: Update `src/types/index.ts` for new data structures

## 🔒 Security Considerations

- Input validation on both frontend and backend
- CORS configuration for secure cross-origin requests
- Error handling to prevent information leakage
- Rate limiting recommended for production deployment

## 🚀 Deployment

### Backend Deployment

```bash
# Using Docker (recommended)
docker build -t intrusion-detection-api .
docker run -p 8000:8000 intrusion-detection-api

# Or using uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment

```bash
npm run build
npm start
```

## 📝 Environment Variables

### Backend
- `PORT`: Server port (default: 8000)

### Frontend
- `BACKEND_URL`: Backend API URL (default: http://localhost:8000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- KDD Cup 1999 dataset for training data
- TensorFlow team for the ML framework
- Next.js and FastAPI communities for excellent frameworks