export type OrderCode = "17-45" | "17-54";

export interface BaseOrder {
  _id?: string;
  code: OrderCode;
  document_index: string;
  order_date: string;
  responsible: string;
  to: string[];
  copy: string[];
  payload_model?: string;
}

// --- 17-45 uchun
export interface FlowsIdsOrder {
  code: string;
  point_a: string;
  point_b: string;
  port_a: string;
  port_b: string;
  device_a: string;
  device_b: string;
  signal_level?: string;
}

export interface ChannelUpdate {
  old: string;
  new: string;
}

export interface Payload1745 {
  basic: {
    organization_name: string;
    request_number: string;
    request_date: string;
    deadline: string;
    justification: string;
    signal_level: string;
    actions: ("create" | "update" | "delete")[];
  };
  create?: {
    flow_ids: FlowsIdsOrder[];
  };
  update?: {
    channels?: ChannelUpdate[];
    flows?: FlowsIdsOrder[];
  };
  delete?: {
    elements: string[];
  };
}

// --- 17-54 uchun
export interface EventSchedule {
  date: string;
  duration: string;
  event_type: string;
}

export interface OrderEvent {
  location: string;
  connection_spec: string;
  schedule: EventSchedule[];
}

export interface Payload1754 {
  basic: {
    organization_name: string;
    request_number: string;
    request_date: string;
    justification: string;
    context: string;
  };
  events: OrderEvent[];
}

export interface Payload1733 {
  basic: {
    organization_name: string;
    request_number: string;
    request_date: string;
    justification: string;
    context: string;
    delete?: {
      elements: string[];
    };
  };

}

// Bu interfeys "code" maydoniga qarab payloadni avtomatik ajratib beradi

export type OrderApplication =
  | (BaseOrder & { code: "17-45"; payload: Payload1745 })
  | (BaseOrder & { code: "17-54"; payload: Payload1754 })
    | (BaseOrder & { code: "17-33"; payload: Payload1733 });

