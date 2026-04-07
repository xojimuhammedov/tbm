export interface Num3ApplicationInterface {
  _id: string;
  id: string;
  code: string;
  title: string;
  signer: string;
  created_at: string;
  data: OrderData[];
}

export interface OrderData {
  _id: string;
  order_code: string;
  assigned_time: string;
  completed_time: string;
  responsible_executor: string;
  customer_details: string;
  comment: string;
}
