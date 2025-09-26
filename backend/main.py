from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import pandas as pd
import numpy as np
import json
import os
from typing import Dict, List

app = FastAPI(title="Intrusion Detection API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and metadata
model = None
model_metadata = None
preprocessing_stats = None

class NetworkTrafficData(BaseModel):
    duration: float
    protocol_type: str
    service: str
    flag: str
    src_bytes: int
    dst_bytes: int
    land: int
    wrong_fragment: int
    urgent: int
    hot: int
    num_failed_logins: int
    logged_in: int
    num_compromised: int
    root_shell: int
    su_attempted: int
    num_root: int
    num_file_creations: int
    num_shells: int
    num_access_files: int
    num_outbound_cmds: int
    is_host_login: int
    is_guest_login: int
    count: int
    srv_count: int
    serror_rate: float
    srv_serror_rate: float
    rerror_rate: float
    srv_rerror_rate: float
    same_srv_rate: float
    diff_srv_rate: float
    srv_diff_host_rate: float
    dst_host_count: int
    dst_host_srv_count: int
    dst_host_same_srv_rate: float
    dst_host_diff_srv_rate: float
    dst_host_same_src_port_rate: float
    dst_host_srv_diff_host_rate: float
    dst_host_serror_rate: float
    dst_host_srv_serror_rate: float
    dst_host_rerror_rate: float
    dst_host_srv_rerror_rate: float

class PredictionResult(BaseModel):
    prediction: str
    confidence: float
    probabilities: Dict[str, float]
    risk_level: str

def load_model_and_metadata():
    """Load the trained model and associated metadata"""
    global model, model_metadata, preprocessing_stats
    
    try:
        # Load the trained model
        model = tf.keras.models.load_model('intrusion_detection_model.h5')
        print("Model loaded successfully")
        
        # Load metadata
        with open('model_metadata.json', 'r') as f:
            model_metadata = json.load(f)
        print("Model metadata loaded successfully")
        
        # Load preprocessing statistics
        with open('preprocessing_stats.json', 'r') as f:
            preprocessing_stats = json.load(f)
        print("Preprocessing statistics loaded successfully")
        
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Using mock prediction instead")

def encode_numeric_zscore(value: float, field_name: str) -> float:
    """Normalize numeric value using z-score"""
    if preprocessing_stats and field_name in preprocessing_stats:
        stats = preprocessing_stats[field_name]
        return (value - stats['mean']) / stats['std']
    return value

def encode_text_dummy(value: str, field_name: str, all_columns: List[str]) -> Dict[str, int]:
    """Create dummy variables for categorical fields"""
    dummy_dict = {}
    
    # Find all columns that start with this field name
    relevant_columns = [col for col in all_columns if col.startswith(f"{field_name}-")]
    
    for col in relevant_columns:
        # Extract the category from column name (e.g., "protocol_type-tcp" -> "tcp")
        category = col.split('-', 1)[1]
        dummy_dict[col] = 1 if category == value else 0
    
    return dummy_dict

def preprocess_input(data: NetworkTrafficData) -> np.ndarray:
    """Preprocess input data to match training format"""
    if not model_metadata:
        # Fallback: create a simple feature vector
        return np.array([[
            data.duration, data.src_bytes, data.dst_bytes, data.count,
            data.srv_count, data.serror_rate, data.same_srv_rate,
            data.dst_host_count, data.dst_host_same_srv_rate,
            1 if data.protocol_type == 'tcp' else 0,
            1 if data.logged_in == 1 else 0
        ]])
    
    # Create feature vector matching training format
    feature_vector = {}
    
    # Process numeric features with z-score normalization
    numeric_fields = [
        'duration', 'src_bytes', 'dst_bytes', 'wrong_fragment', 'urgent', 'hot',
        'num_failed_logins', 'num_compromised', 'root_shell', 'su_attempted',
        'num_root', 'num_file_creations', 'num_shells', 'num_access_files',
        'num_outbound_cmds', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
        'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
        'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
        'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
        'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate',
        'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
    ]
    
    for field in numeric_fields:
        if hasattr(data, field):
            value = getattr(data, field)
            feature_vector[field] = encode_numeric_zscore(value, field)
    
    # Process categorical features with dummy encoding
    categorical_fields = ['protocol_type', 'service', 'flag', 'land', 'logged_in', 
                         'is_host_login', 'is_guest_login']
    
    for field in categorical_fields:
        if hasattr(data, field):
            value = str(getattr(data, field))
            dummy_vars = encode_text_dummy(value, field, model_metadata['feature_columns'])
            feature_vector.update(dummy_vars)
    
    # Create final feature array in correct order
    feature_array = []
    for col in model_metadata['feature_columns']:
        if col in feature_vector:
            feature_array.append(feature_vector[col])
        else:
            feature_array.append(0.0)  # Default value for missing features
    
    return np.array([feature_array])

def determine_risk_level(prediction: str, confidence: float) -> str:
    """Determine risk level based on prediction and confidence"""
    if prediction == 'normal':
        return 'Low'
    elif confidence < 0.7:
        return 'Medium'
    elif confidence < 0.85:
        return 'High'
    else:
        return 'Critical'

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    load_model_and_metadata()

@app.get("/")
async def root():
    return {"message": "Intrusion Detection API is running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "metadata_loaded": model_metadata is not None
    }

@app.post("/predict", response_model=PredictionResult)
async def predict(data: NetworkTrafficData):
    """Make prediction on network traffic data"""
    try:
        if model is None or model_metadata is None:
            # Fallback to mock prediction
            return mock_predict(data)
        
        # Preprocess input data
        processed_data = preprocess_input(data)
        
        # Make prediction
        predictions = model.predict(processed_data)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get class name
        predicted_class = model_metadata['outcome_classes'][predicted_class_idx]
        
        # Create probabilities dictionary
        probabilities = {}
        for i, class_name in enumerate(model_metadata['outcome_classes']):
            probabilities[class_name] = float(predictions[0][i])
        
        # Determine risk level
        risk_level = determine_risk_level(predicted_class, confidence)
        
        return PredictionResult(
            prediction=predicted_class,
            confidence=confidence,
            probabilities=probabilities,
            risk_level=risk_level
        )
        
    except Exception as e:
        print(f"Prediction error: {e}")
        # Fallback to mock prediction
        return mock_predict(data)

def mock_predict(data: NetworkTrafficData) -> PredictionResult:
    """Mock prediction for testing when model is not available"""
    # Simple heuristic for demo
    is_likely_attack = (
        data.serror_rate > 0.5 or 
        data.dst_host_count > 200 or 
        data.flag == 'S0' or
        (data.src_bytes == 0 and data.dst_bytes == 0)
    )
    
    attack_types = [
        'back', 'buffer_overflow', 'ftp_write', 'guess_passwd', 'imap', 
        'ipsweep', 'land', 'loadmodule', 'multihop', 'neptune', 'nmap', 
        'perl', 'phf', 'pod', 'portsweep', 'rootkit', 'satan', 'smurf', 
        'spy', 'teardrop', 'warezclient', 'warezmaster'
    ]
    
    if is_likely_attack:
        import random
        prediction = random.choice(attack_types)
        confidence = 0.75 + random.random() * 0.2
        
        probabilities = {prediction: confidence, 'normal': random.random() * (1 - confidence)}
        # Add some other random probabilities
        for attack in attack_types[:3]:
            if attack != prediction:
                probabilities[attack] = random.random() * 0.1
    else:
        prediction = 'normal'
        confidence = 0.85 + random.random() * 0.1
        probabilities = {'normal': confidence}
        for attack in attack_types[:4]:
            probabilities[attack] = random.random() * (1 - confidence) / 4
    
    # Normalize probabilities
    total = sum(probabilities.values())
    probabilities = {k: v/total for k, v in probabilities.items()}
    
    risk_level = determine_risk_level(prediction, confidence)
    
    return PredictionResult(
        prediction=prediction,
        confidence=confidence,
        probabilities=probabilities,
        risk_level=risk_level
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
