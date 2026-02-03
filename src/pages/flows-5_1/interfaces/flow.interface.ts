export interface FlowIdDetails {
  _id: string;
  code: string;
  signal_level: string;
}

export interface FlowInterface {
  _id: string;
  flow_id: FlowIdDetails;
  port_a: string;
  mux_a: string;
  pa: string;
  final_ms_name: string;
  signal_transmission_level: string;
  au4: string;
  ts: string;
  pb: string;
  transit: string;
  mux_b: string;
  port_b: string;
  speed: string;
  column1?: string;
  outs_id?: string;
  international?: string;
  forward?: string;
  reverse?: string;
  start?: string;
  end?: string;
  consumer?: string;
  order_number?: string;
  interest_level?: string;
  mt?: string;
  protection_mode?: string;
  sp?: string;
  additional_information?: string;
  payment_status?: string;
  e1_name_in_vs?: string;
  ms_name_in_vs?: string;
  creatorId?: string;
  created_at?: string;
  updated_at?: string;
  __v?: number;
}