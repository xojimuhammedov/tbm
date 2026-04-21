export interface TurnoverDocument {
  _id?: string;
  code: string;
  order_date: string;
  register_code: string;
  to: string[];
  copy: string[];
  reason: string;
  status: string;
}
