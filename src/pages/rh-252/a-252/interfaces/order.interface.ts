export interface FlowsIdsOrder {
  code: string;
  point_a: string;
  point_b: string;
  port_a: string;
  port_b: string;
  device_a: string;
  device_b: string;
}

export interface OrderApplication {
  code: string;
  order_date: string;
  workDateTime: string;
  _id: string;
  title: string;
  status: string;
  rejected_at: string;
  finished_at: string;
  created_at: string;
  dead_line: string;
  to: string;
  create: {
    flows: FlowsIdsOrder[];
    flow_ids: string[];
  };
}
