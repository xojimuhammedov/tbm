export interface OrderDetails {
  _id: string;
  order_code: string;
  order_date: string;
  base_file?: string;
}

export interface FlowInterface {
  _id: string;
  id: string;
  code: string;
  point_a: string;
  point_b: string;
  name_point_a: string;
  name_point_b: string;
  signal_level: string;
  status: 'active' | 'inactive' | string;
  organization_order: OrderDetails[];
  dissolution_order: OrderDetails[];
  created_at: string;
  updated_at?: string;
  consumer_id_point_a?: string;
  consumer_name_point_b?: string;
  interest_level?: string;
  device_a?: string;
  device_b?: string;
  note?: string;
  deciphering_order_number?: string;
  deciphering_archive?: string;
  organization_archive?: string;
  status_filter?: string;
  base_file?: string;
}