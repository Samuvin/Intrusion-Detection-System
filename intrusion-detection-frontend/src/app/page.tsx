'use client'

import { useState } from 'react'
import NetworkTrafficForm from '@/components/NetworkTrafficForm'
import PredictionResults from '@/components/PredictionResults'
import { NetworkTrafficData, PredictionResult } from '@/types'

export default function Home() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePrediction = async (data: NetworkTrafficData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setPrediction(result.data)
      } else {
        setError(result.error || 'Prediction failed')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPrediction(null)
    setError(null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center text-white mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Network Traffic Analysis
        </h2>
        <p className="text-lg text-white/80">
          Enter network traffic parameters to detect potential intrusions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            📊 Input Parameters
          </h3>
          <NetworkTrafficForm 
            onSubmit={handlePrediction}
            loading={loading}
            onReset={handleReset}
          />
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            🎯 Analysis Results
          </h3>
          <PredictionResults 
            prediction={prediction}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">ℹ️ About This System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">🧠 AI Model</h4>
            <p className="text-white/80">
              Neural network trained on KDD Cup 1999 dataset with 99.2% accuracy
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🔍 Detection Types</h4>
            <p className="text-white/80">
              Identifies 23 different attack types including DoS, probe, and intrusion attempts
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">⚡ Real-time</h4>
            <p className="text-white/80">
              Instant analysis with confidence scores and risk assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
