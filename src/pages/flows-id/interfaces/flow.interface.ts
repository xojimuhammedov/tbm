export interface FlowInterface {
  _id: string;
  consumer_id_point_a: string;
  code: string;
  interest_level: string;
  updated_at: string;
  consumer_name_point_b: string;
  point_a: string;
  point_b: string;
  signal_level: string;
  organization_order: string;
  deciphering_order_number: string;
  note: string;
  deciphering_archive: string;
  organization_archive: string;
  name_point_a?: string;
  name_point_b?: string;
  device_a?: string;
  device_b?: string;
  status?: string;
  dissolution_order?: string;
  status_filter?: string
}
