export interface FApplicationInterface {
  _id: string;
  id: string;
  action_type: string[];
  ap_input: string;
  ubp_input: string;
  request_number: string;
  created_at: string;
  data: ConnectionData[];

}


export interface ConnectionData {
  order_code: string;
  connection_established_date: string;
  connection_route_details: string;
  comment: string;
}


