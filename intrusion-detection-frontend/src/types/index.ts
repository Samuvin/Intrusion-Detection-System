export interface NetworkTrafficData {
  duration: number;
  protocol_type: string;
  service: string;
  flag: string;
  src_bytes: number;
  dst_bytes: number;
  land: number;
  wrong_fragment: number;
  urgent: number;
  hot: number;
  num_failed_logins: number;
  logged_in: number;
  num_compromised: number;
  root_shell: number;
  su_attempted: number;
  num_root: number;
  num_file_creations: number;
  num_shells: number;
  num_access_files: number;
  num_outbound_cmds: number;
  is_host_login: number;
  is_guest_login: number;
  count: number;
  srv_count: number;
  serror_rate: number;
  srv_serror_rate: number;
  rerror_rate: number;
  srv_rerror_rate: number;
  same_srv_rate: number;
  diff_srv_rate: number;
  srv_diff_host_rate: number;
  dst_host_count: number;
  dst_host_srv_count: number;
  dst_host_same_srv_rate: number;
  dst_host_diff_srv_rate: number;
  dst_host_same_src_port_rate: number;
  dst_host_srv_diff_host_rate: number;
  dst_host_serror_rate: number;
  dst_host_srv_serror_rate: number;
  dst_host_rerror_rate: number;
  dst_host_srv_rerror_rate: number;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
  probabilities: { [key: string]: number };
  risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ApiResponse {
  success: boolean;
  data?: PredictionResult;
  error?: string;
}

export const ATTACK_TYPES = [
  'normal',
  'back',
  'buffer_overflow',
  'ftp_write',
  'guess_passwd',
  'imap',
  'ipsweep',
  'land',
  'loadmodule',
  'multihop',
  'neptune',
  'nmap',
  'perl',
  'phf',
  'pod',
  'portsweep',
  'rootkit',
  'satan',
  'smurf',
  'spy',
  'teardrop',
  'warezclient',
  'warezmaster'
] as const;

export const PROTOCOL_TYPES = ['tcp', 'udp', 'icmp'] as const;
export const SERVICE_TYPES = [
  'http', 'private', 'smtp', 'domain_u', 'other', 'ftp_data', 'ecr_i', 'eco_i',
  'ftp', 'finger', 'telnet', 'urp_i', 'auth', 'ntp_u', 'pop_3', 'time'
] as const;
export const FLAG_TYPES = ['SF', 'S0', 'REJ', 'RSTO', 'RSTR', 'S1', 'SH', 'S2', 'RSTOS0', 'S3', 'OTH'] as const;
