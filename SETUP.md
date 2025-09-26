# 🛡️ Intrusion Detection System - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** (for the backend)
- **Node.js 18+** (for the frontend)
- **pip** (Python package manager)
- **npm** (Node.js package manager)

## 🚀 Quick Start

### Option 1: Using Startup Scripts (Recommended)

1. **Start the Backend:**
   ```bash
   ./start_backend.sh
   ```
   This will:
   - Create a Python virtual environment
   - Install all Python dependencies
   - Start the FastAPI server on port 8000

2. **Start the Frontend (in a new terminal):**
   ```bash
   ./start_frontend.sh
   ```
   This will:
   - Install Node.js dependencies
   - Start the Next.js development server on port 3000

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server:**
   ```bash
   python start_server.py
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd intrusion-detection-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🧠 Training the ML Model

To use the actual trained model instead of mock predictions:

1. **Open the Jupyter notebook:**
   ```bash
   jupyter notebook cloud_computing.ipynb
   ```

2. **Run all cells** to train the model and export the files:
   - `intrusion_detection_model.h5`
   - `model_metadata.json`
   - `preprocessing_stats.json`

3. **Move the generated files** to the `backend/` directory

4. **Restart the backend server** to load the trained model

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
BACKEND_URL=http://localhost:8000
```

### Backend Configuration

The backend automatically detects if model files are present:
- ✅ **With model files**: Uses trained neural network
- ⚠️ **Without model files**: Uses mock predictions for testing

## 📊 Testing the System

### Sample Data

The frontend includes two sample data buttons:

1. **Load Normal Sample**: Simulates legitimate network traffic
2. **Load Attack Sample**: Simulates suspicious network activity

### Manual Testing

You can also manually enter network traffic parameters:

**Connection Features:**
- Duration, Protocol Type, Service, Flag
- Source/Destination Bytes

**Traffic Features:**
- Connection counts, Error rates
- Service statistics, Host information

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start:**
   - Check Python version: `python3 --version`
   - Ensure virtual environment is activated
   - Install dependencies: `pip install -r requirements.txt`

2. **Frontend won't start:**
   - Check Node.js version: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **API connection errors:**
   - Ensure backend is running on port 8000
   - Check CORS settings in backend
   - Verify BACKEND_URL environment variable

4. **Model loading errors:**
   - Ensure model files are in the backend directory
   - Check file permissions
   - Verify TensorFlow installation

### Port Conflicts

If ports 3000 or 8000 are already in use:

**Backend (change port 8000):**
```bash
uvicorn main:app --host 0.0.0.0 --port 8001
```

**Frontend (change port 3000):**
```bash
npm run dev -- --port 3001
```

## 📁 Project Structure

```
Intrusion-Detection-System/
├── backend/                    # Python FastAPI backend
│   ├── main.py                # Main API application
│   ├── requirements.txt       # Python dependencies
│   └── start_server.py       # Server startup script
├── intrusion-detection-frontend/  # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.ts   # Tailwind configuration
├── cloud_computing.ipynb     # ML model training notebook
├── start_backend.sh         # Backend startup script
├── start_frontend.sh        # Frontend startup script
├── README.md               # Main documentation
└── SETUP.md               # This setup guide
```

## 🔒 Security Notes

- The system is configured for development use
- For production deployment:
  - Enable HTTPS
  - Configure proper CORS origins
  - Add rate limiting
  - Implement authentication
  - Use environment variables for secrets

## 📞 Support

If you encounter issues:

1. Check the console logs in both frontend and backend
2. Verify all dependencies are installed
3. Ensure ports are not blocked by firewall
4. Check the troubleshooting section above

## 🎉 Success!

Once both servers are running, you should see:

- ✅ Frontend at http://localhost:3000
- ✅ Backend API at http://localhost:8000
- ✅ API docs at http://localhost:8000/docs
- ✅ Health check at http://localhost:8000/health

You're now ready to analyze network traffic for potential intrusions! 🛡️
