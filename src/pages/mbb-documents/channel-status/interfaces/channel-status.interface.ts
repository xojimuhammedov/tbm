export interface ChannelStatusDocument {
  _id: string;
  device_type: string;
  point_name: string;
  duty_officer: string;
  ko_status_at_shift_handover: string;
  shift_handover_at: string;
}
