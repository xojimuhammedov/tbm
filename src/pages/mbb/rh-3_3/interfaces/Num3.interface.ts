export interface Num3ApplicationInterface {
  _id: string;
  id: string;
  code: string;
  title: string;
  signer: any;
  created_at: string;
  created_by: any;
  data: OrderData[];
  pdf_path?: string;
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
