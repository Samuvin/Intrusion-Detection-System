'use client'

import { PredictionResult } from '@/types'

interface Props {
  prediction: PredictionResult | null
  loading: boolean
  error: string | null
}

export default function PredictionResults({ prediction, loading, error }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Analyzing network traffic...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <p className="text-red-400 font-medium">Analysis Failed</p>
          <p className="text-white/60 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-white/40 text-4xl mb-4">📊</div>
          <p className="text-white/60">Enter network traffic data to see analysis results</p>
        </div>
      </div>
    )
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'High': return 'text-orange-400'
      case 'Critical': return 'text-red-400'
      default: return 'text-white'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return '✅'
      case 'Medium': return '⚠️'
      case 'High': return '🔶'
      case 'Critical': return '🚨'
      default: return '❓'
    }
  }

  const getAttackTypeColor = (prediction: string) => {
    if (prediction === 'normal') return 'text-green-400'
    return 'text-red-400'
  }

  const getAttackTypeIcon = (prediction: string) => {
    if (prediction === 'normal') return '✅'
    return '🚨'
  }

  // Sort probabilities by value for better display
  const sortedProbabilities = Object.entries(prediction.probabilities)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5) // Show top 5

  return (
    <div className="space-y-6">
      {/* Main Prediction */}
      <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="text-3xl mb-2">
          {getAttackTypeIcon(prediction.prediction)}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">
          Detection Result
        </h3>
        <p className={`text-xl font-bold ${getAttackTypeColor(prediction.prediction)}`}>
          {prediction.prediction.toUpperCase().replace('_', ' ')}
        </p>
        <p className="text-white/60 text-sm mt-1">
          Confidence: {(prediction.confidence * 100).toFixed(1)}%
        </p>
      </div>

      {/* Risk Level */}
      <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="text-3xl mb-2">
          {getRiskIcon(prediction.risk_level)}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">
          Risk Level
        </h3>
        <p className={`text-xl font-bold ${getRiskColor(prediction.risk_level)}`}>
          {prediction.risk_level}
        </p>
      </div>

      {/* Top Probabilities */}
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-3">
          🎯 Top Predictions
        </h3>
        <div className="space-y-2">
          {sortedProbabilities.map(([type, prob], index) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-white/80 text-sm">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📊'} 
                {' '}{type.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full" 
                    style={{ width: `${prob * 100}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm w-12 text-right">
                  {(prob * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-2">
          💡 Recommendation
        </h3>
        <p className="text-white/80 text-sm">
          {prediction.prediction === 'normal' 
            ? "Traffic appears normal. Continue monitoring for any anomalies."
            : `Potential ${prediction.prediction.replace('_', ' ')} attack detected. Review security logs and consider implementing additional protective measures.`
          }
        </p>
      </div>
    </div>
  )
}
