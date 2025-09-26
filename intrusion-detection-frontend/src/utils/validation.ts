import { NetworkTrafficData } from '@/types'

export interface ValidationError {
  field: string
  message: string
}

export function validateNetworkTrafficData(data: NetworkTrafficData): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate duration (should be non-negative)
  if (data.duration < 0) {
    errors.push({ field: 'duration', message: 'Duration must be non-negative' })
  }

  // Validate byte counts (should be non-negative)
  if (data.src_bytes < 0) {
    errors.push({ field: 'src_bytes', message: 'Source bytes must be non-negative' })
  }
  if (data.dst_bytes < 0) {
    errors.push({ field: 'dst_bytes', message: 'Destination bytes must be non-negative' })
  }

  // Validate binary fields (should be 0 or 1)
  const binaryFields = [
    'land', 'logged_in', 'root_shell', 'su_attempted', 
    'is_host_login', 'is_guest_login'
  ]
  
  binaryFields.forEach(field => {
    const value = data[field as keyof NetworkTrafficData] as number
    if (value !== 0 && value !== 1) {
      errors.push({ 
        field, 
        message: `${field.replace('_', ' ')} must be 0 or 1` 
      })
    }
  })

  // Validate count fields (should be non-negative integers)
  const countFields = [
    'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'num_compromised',
    'num_root', 'num_file_creations', 'num_shells', 'num_access_files',
    'num_outbound_cmds', 'count', 'srv_count', 'dst_host_count', 'dst_host_srv_count'
  ]
  
  countFields.forEach(field => {
    const value = data[field as keyof NetworkTrafficData] as number
    if (value < 0 || !Number.isInteger(value)) {
      errors.push({ 
        field, 
        message: `${field.replace('_', ' ')} must be a non-negative integer` 
      })
    }
  })

  // Validate rate fields (should be between 0 and 1)
  const rateFields = [
    'serror_rate', 'srv_serror_rate', 'rerror_rate', 'srv_rerror_rate',
    'same_srv_rate', 'diff_srv_rate', 'srv_diff_host_rate',
    'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
    'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate',
    'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
  ]
  
  rateFields.forEach(field => {
    const value = data[field as keyof NetworkTrafficData] as number
    if (value < 0 || value > 1) {
      errors.push({ 
        field, 
        message: `${field.replace('_', ' ')} must be between 0 and 1` 
      })
    }
  })

  // Validate categorical fields
  const validProtocols = ['tcp', 'udp', 'icmp']
  if (!validProtocols.includes(data.protocol_type)) {
    errors.push({ 
      field: 'protocol_type', 
      message: 'Protocol type must be tcp, udp, or icmp' 
    })
  }

  const validFlags = ['SF', 'S0', 'REJ', 'RSTO', 'RSTR', 'S1', 'SH', 'S2', 'RSTOS0', 'S3', 'OTH']
  if (!validFlags.includes(data.flag)) {
    errors.push({ 
      field: 'flag', 
      message: 'Invalid flag value' 
    })
  }

  // Validate logical constraints
  if (data.srv_count > data.count) {
    errors.push({ 
      field: 'srv_count', 
      message: 'Service count cannot exceed total count' 
    })
  }

  if (data.dst_host_srv_count > data.dst_host_count) {
    errors.push({ 
      field: 'dst_host_srv_count', 
      message: 'Destination host service count cannot exceed destination host count' 
    })
  }

  return errors
}

export function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}
