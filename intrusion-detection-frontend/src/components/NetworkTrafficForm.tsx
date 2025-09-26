'use client'

import { useState } from 'react'
import { NetworkTrafficData, PROTOCOL_TYPES, SERVICE_TYPES, FLAG_TYPES } from '@/types'
import { validateNetworkTrafficData, ValidationError, formatFieldName } from '@/utils/validation'

interface Props {
  onSubmit: (data: NetworkTrafficData) => void
  loading: boolean
  onReset: () => void
}

export default function NetworkTrafficForm({ onSubmit, loading, onReset }: Props) {
  const [formData, setFormData] = useState<NetworkTrafficData>({
    duration: 0,
    protocol_type: 'tcp',
    service: 'http',
    flag: 'SF',
    src_bytes: 0,
    dst_bytes: 0,
    land: 0,
    wrong_fragment: 0,
    urgent: 0,
    hot: 0,
    num_failed_logins: 0,
    logged_in: 0,
    num_compromised: 0,
    root_shell: 0,
    su_attempted: 0,
    num_root: 0,
    num_file_creations: 0,
    num_shells: 0,
    num_access_files: 0,
    num_outbound_cmds: 0,
    is_host_login: 0,
    is_guest_login: 0,
    count: 0,
    srv_count: 0,
    serror_rate: 0,
    srv_serror_rate: 0,
    rerror_rate: 0,
    srv_rerror_rate: 0,
    same_srv_rate: 0,
    diff_srv_rate: 0,
    srv_diff_host_rate: 0,
    dst_host_count: 0,
    dst_host_srv_count: 0,
    dst_host_same_srv_rate: 0,
    dst_host_diff_srv_rate: 0,
    dst_host_same_src_port_rate: 0,
    dst_host_srv_diff_host_rate: 0,
    dst_host_serror_rate: 0,
    dst_host_srv_serror_rate: 0,
    dst_host_rerror_rate: 0,
    dst_host_srv_rerror_rate: 0,
  })

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    const errors = validateNetworkTrafficData(formData)
    setValidationErrors(errors)
    
    // Only submit if no validation errors
    if (errors.length === 0) {
      onSubmit(formData)
    }
  }

  const handleReset = () => {
    setFormData({
      duration: 0,
      protocol_type: 'tcp',
      service: 'http',
      flag: 'SF',
      src_bytes: 0,
      dst_bytes: 0,
      land: 0,
      wrong_fragment: 0,
      urgent: 0,
      hot: 0,
      num_failed_logins: 0,
      logged_in: 0,
      num_compromised: 0,
      root_shell: 0,
      su_attempted: 0,
      num_root: 0,
      num_file_creations: 0,
      num_shells: 0,
      num_access_files: 0,
      num_outbound_cmds: 0,
      is_host_login: 0,
      is_guest_login: 0,
      count: 0,
      srv_count: 0,
      serror_rate: 0,
      srv_serror_rate: 0,
      rerror_rate: 0,
      srv_rerror_rate: 0,
      same_srv_rate: 0,
      diff_srv_rate: 0,
      srv_diff_host_rate: 0,
      dst_host_count: 0,
      dst_host_srv_count: 0,
      dst_host_same_srv_rate: 0,
      dst_host_diff_srv_rate: 0,
      dst_host_same_src_port_rate: 0,
      dst_host_srv_diff_host_rate: 0,
      dst_host_serror_rate: 0,
      dst_host_srv_serror_rate: 0,
      dst_host_rerror_rate: 0,
      dst_host_srv_rerror_rate: 0,
    })
    setValidationErrors([])
    onReset()
  }

  const handleChange = (field: keyof NetworkTrafficData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear validation errors for this field when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors(prev => prev.filter(error => error.field !== field))
    }
  }

  const getFieldError = (fieldName: string): string | undefined => {
    const error = validationErrors.find(err => err.field === fieldName)
    return error?.message
  }

  const loadSampleData = (type: 'normal' | 'attack') => {
    if (type === 'normal') {
      setFormData({
        duration: 0,
        protocol_type: 'tcp',
        service: 'http',
        flag: 'SF',
        src_bytes: 181,
        dst_bytes: 5450,
        land: 0,
        wrong_fragment: 0,
        urgent: 0,
        hot: 0,
        num_failed_logins: 0,
        logged_in: 1,
        num_compromised: 0,
        root_shell: 0,
        su_attempted: 0,
        num_root: 0,
        num_file_creations: 0,
        num_shells: 0,
        num_access_files: 0,
        num_outbound_cmds: 0,
        is_host_login: 0,
        is_guest_login: 0,
        count: 8,
        srv_count: 8,
        serror_rate: 0.0,
        srv_serror_rate: 0.0,
        rerror_rate: 0.0,
        srv_rerror_rate: 0.0,
        same_srv_rate: 1.0,
        diff_srv_rate: 0.0,
        srv_diff_host_rate: 0.0,
        dst_host_count: 9,
        dst_host_srv_count: 9,
        dst_host_same_srv_rate: 1.0,
        dst_host_diff_srv_rate: 0.0,
        dst_host_same_src_port_rate: 0.11,
        dst_host_srv_diff_host_rate: 0.0,
        dst_host_serror_rate: 0.0,
        dst_host_srv_serror_rate: 0.0,
        dst_host_rerror_rate: 0.0,
        dst_host_srv_rerror_rate: 0.0,
      })
    } else {
      setFormData({
        duration: 0,
        protocol_type: 'tcp',
        service: 'http',
        flag: 'S0',
        src_bytes: 0,
        dst_bytes: 0,
        land: 0,
        wrong_fragment: 0,
        urgent: 0,
        hot: 0,
        num_failed_logins: 0,
        logged_in: 0,
        num_compromised: 0,
        root_shell: 0,
        su_attempted: 0,
        num_root: 0,
        num_file_creations: 0,
        num_shells: 0,
        num_access_files: 0,
        num_outbound_cmds: 0,
        is_host_login: 0,
        is_guest_login: 0,
        count: 123,
        srv_count: 6,
        serror_rate: 1.0,
        srv_serror_rate: 1.0,
        rerror_rate: 0.0,
        srv_rerror_rate: 0.0,
        same_srv_rate: 0.05,
        diff_srv_rate: 0.07,
        srv_diff_host_rate: 0.0,
        dst_host_count: 255,
        dst_host_srv_count: 6,
        dst_host_same_srv_rate: 0.02,
        dst_host_diff_srv_rate: 0.06,
        dst_host_same_src_port_rate: 0.0,
        dst_host_srv_diff_host_rate: 0.0,
        dst_host_serror_rate: 1.0,
        dst_host_srv_serror_rate: 1.0,
        dst_host_rerror_rate: 0.0,
        dst_host_srv_rerror_rate: 0.0,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      {/* Validation Errors Summary */}
      {validationErrors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
          <h4 className="text-red-400 font-medium text-sm mb-2">
            ⚠️ Please fix the following errors:
          </h4>
          <ul className="text-red-300 text-xs space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>
                • {formatFieldName(error.field)}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => loadSampleData('normal')}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Load Normal Sample
        </button>
        <button
          type="button"
          onClick={() => loadSampleData('attack')}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Load Attack Sample
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Connection Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-white text-sm">Connection Features</h4>
          
          <div>
            <label className="block text-sm text-white/80 mb-1">Duration</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-1 bg-white/10 border rounded text-white text-sm ${
                getFieldError('duration') 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-white/20 focus:border-blue-400'
              }`}
              step="0.01"
              min="0"
            />
            {getFieldError('duration') && (
              <p className="text-red-400 text-xs mt-1">{getFieldError('duration')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Protocol Type</label>
            <select
              value={formData.protocol_type}
              onChange={(e) => handleChange('protocol_type', e.target.value)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              {PROTOCOL_TYPES.map(type => (
                <option key={type} value={type} className="bg-gray-800">{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Service</label>
            <select
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              {SERVICE_TYPES.map(service => (
                <option key={service} value={service} className="bg-gray-800">{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Flag</label>
            <select
              value={formData.flag}
              onChange={(e) => handleChange('flag', e.target.value)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              {FLAG_TYPES.map(flag => (
                <option key={flag} value={flag} className="bg-gray-800">{flag}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Source Bytes</label>
            <input
              type="number"
              value={formData.src_bytes}
              onChange={(e) => handleChange('src_bytes', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Destination Bytes</label>
            <input
              type="number"
              value={formData.dst_bytes}
              onChange={(e) => handleChange('dst_bytes', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>
        </div>

        {/* Traffic Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-white text-sm">Traffic Features</h4>
          
          <div>
            <label className="block text-sm text-white/80 mb-1">Count</label>
            <input
              type="number"
              value={formData.count}
              onChange={(e) => handleChange('count', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Service Count</label>
            <input
              type="number"
              value={formData.srv_count}
              onChange={(e) => handleChange('srv_count', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Error Rate</label>
            <input
              type="number"
              value={formData.serror_rate}
              onChange={(e) => handleChange('serror_rate', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
              step="0.01"
              min="0"
              max="1"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Same Service Rate</label>
            <input
              type="number"
              value={formData.same_srv_rate}
              onChange={(e) => handleChange('same_srv_rate', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
              step="0.01"
              min="0"
              max="1"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Destination Host Count</label>
            <input
              type="number"
              value={formData.dst_host_count}
              onChange={(e) => handleChange('dst_host_count', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Logged In</label>
            <select
              value={formData.logged_in}
              onChange={(e) => handleChange('logged_in', parseInt(e.target.value))}
              className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
            >
              <option value={0} className="bg-gray-800">No</option>
              <option value={1} className="bg-gray-800">Yes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded font-medium"
        >
          {loading ? 'Analyzing...' : 'Analyze Traffic'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded font-medium"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
