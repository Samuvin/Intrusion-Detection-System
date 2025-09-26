import { NextRequest, NextResponse } from 'next/server'
import { NetworkTrafficData, PredictionResult } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: NetworkTrafficData = await request.json()
    
    // Call Python backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    try {
      const response = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`)
      }
      
      const prediction = await response.json()
      
      return NextResponse.json({
        success: true,
        data: prediction
      })
    } catch (backendError) {
      console.error('Backend API error:', backendError)
      // Fallback to mock prediction if backend is unavailable
      const mockPrediction = await mockPredict(data)
      
      return NextResponse.json({
        success: true,
        data: mockPrediction
      })
    }
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process prediction'
    }, { status: 500 })
  }
}

// Mock prediction function - replace with actual API call to Python backend
async function mockPredict(data: NetworkTrafficData): Promise<PredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simple heuristic for demo purposes
  const isLikelyAttack = 
    data.serror_rate > 0.5 || 
    data.dst_host_count > 200 || 
    data.flag === 'S0' ||
    data.src_bytes === 0 && data.dst_bytes === 0
  
  const attackTypes = [
    'back', 'buffer_overflow', 'ftp_write', 'guess_passwd', 'imap', 
    'ipsweep', 'land', 'loadmodule', 'multihop', 'neptune', 'nmap', 
    'perl', 'phf', 'pod', 'portsweep', 'rootkit', 'satan', 'smurf', 
    'spy', 'teardrop', 'warezclient', 'warezmaster'
  ]
  
  let prediction: string
  let confidence: number
  let probabilities: { [key: string]: number } = {}
  
  if (isLikelyAttack) {
    // Simulate attack detection
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
    prediction = attackType
    confidence = 0.75 + Math.random() * 0.2 // 75-95% confidence
    
    // Generate mock probabilities
    probabilities[attackType] = confidence
    probabilities['normal'] = Math.random() * (1 - confidence)
    
    // Add a few other random probabilities
    const otherTypes = attackTypes.filter(t => t !== attackType).slice(0, 3)
    otherTypes.forEach(type => {
      probabilities[type] = Math.random() * 0.1
    })
  } else {
    // Simulate normal traffic
    prediction = 'normal'
    confidence = 0.85 + Math.random() * 0.1 // 85-95% confidence
    
    probabilities['normal'] = confidence
    
    // Add some low probability attacks
    const randomAttacks = attackTypes.slice(0, 4)
    randomAttacks.forEach(type => {
      probabilities[type] = Math.random() * (1 - confidence) / 4
    })
  }
  
  // Normalize probabilities
  const total = Object.values(probabilities).reduce((sum, val) => sum + val, 0)
  Object.keys(probabilities).forEach(key => {
    probabilities[key] = probabilities[key] / total
  })
  
  // Determine risk level
  let risk_level: 'Low' | 'Medium' | 'High' | 'Critical'
  if (prediction === 'normal') {
    risk_level = 'Low'
  } else if (confidence < 0.7) {
    risk_level = 'Medium'
  } else if (confidence < 0.85) {
    risk_level = 'High'
  } else {
    risk_level = 'Critical'
  }
  
  return {
    prediction,
    confidence,
    probabilities,
    risk_level
  }
}
