export interface Num3ApplicationInterface {
  _id: string;
  id: string;
  action_type: string[];
  ap_input: string;
  ubp_input: string;
  request_number: string;
  created_at: string;
  data: OrderData[];
}

export interface OrderData {
  _id: string;
  order_code: string;
  execution_status: "completed" | "pending" | "failed" | string;
  responsible_executor: string;
  customer_details: string;
  failure_reason: string;
  comment: string;
}
