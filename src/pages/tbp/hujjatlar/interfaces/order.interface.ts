import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";

export interface BaseOrder {
  _id?: string;
  code: string;
  document_index: string;
  nomenclature_number: string;
  order_date: string;
  status?: string;
  pdf_path?: string;
  responsible: ResponsibleUser;
  director: ResponsibleUser;
  to: GroupInterface[] | string[];
  copy: string[];
  from?: string[];
  signer?: string;
  approver_ids?: string[];
  position?: string;
  payload_model?: string;
  created_at: string;
  created_by: ResponsibleUser;
}

export interface ResponsibleUser {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
  email: string;
  phone: string;
}

export interface Payload1214 {
  basic: {
    title: string;
    start_time: string;
    end_time: string;
    base_file?: string;
  };
  stopped_flows: string[];
  including: string;
  main_routes: string;
  reserve_routes: string;
  responsible_person: string;
  concert_text: string;
  concert_second: string;
  basis: string;
  content: string;
}

export interface Payload1212FlowId {
  code: string;
  point_a: string;
  point_b: string;
  signal_level?: string;
  port_a: string;
  port_b: string;
  device_a: string;
  device_b: string;
}

export interface Payload1212Channel {
  old: string;
  new: string;
}

export interface Payload1212Flow {
  code: string;
  point_a: string;
  point_b: string;
  device_a: string;
  device_b: string;
  port_a: string;
  port_b: string;
}

export interface Payload1212 {
  basic: {
    organization_name: string;
    request_date: string | null;
    request_number: string;
    signal_level: string;
    actions: string[];
    start_time: string | null;
    description: string;
    no_raqami: string;
    base_file?: string;
  };
  create?: {
    flow_ids: Payload1212FlowId[];
  };
  update?: {
    channels: Payload1212Channel[];
    flows: Payload1212Flow[];
  };
  delete?: {
    elements: string[];
  };
  file_name?: string;
}

export interface Payload1234 {
  basic: {
    title: string;
    station_interval: string;
    cause: string;
    control_station: string;
    requirement_ip: string;
    requirement_ip_date: string | null;
    requirement_user: string;
    requirement_user_date: string | null;
    connection_closure_type: string;
    start_time: string;
    end_time: string;
    base_file: string;
  };
  with_a_pause: string[];
  flow_ids?: string[];
  file_name?: string;
}

export type OrderApplication =
  | (BaseOrder & { code: "12-12"; payload: Payload1212 })
  | (BaseOrder & { code: "12-14"; payload: Payload1214 })
  | (BaseOrder & { code: "12-34"; payload: Payload1234 });
