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
  content: string;
  create: {
    flows: FlowsIdsOrder[];
    flow_ids: string[];
  };
}


// export interface ChannelDetail {
//   code: string;
//   international_stream_number: string;
// }
//
// export interface ChannelUpdateItem {
//   old: ChannelDetail;
//   new: ChannelDetail;
//   _id: string;
// }
//
// export interface OrderApplication {
//   _id: string;
//   code: string;
//   order_date: string;
//   dead_line: string;
//   created_at: string;
//   workDateTime?: string;
//   finished_at?: string;
//   rejected_at?: string;
//   title?: string;
//   status: 'pending' | 'finished' | 'rejected' | string;
//   count: number;
//   from: string;
//   to: string;
//   copy?: string;
//   responsible: string;
//   action_type?: string[];
//   signal_level?: string;
//   content?: string;
//   reason?: string;
//   consumer_id?: string;
//   request_number?: string;
//   request_date?: string;
//   create: {
//     flow_ids: string[];
//     flows?: FlowsIdsOrder[];
//   };
//   delete: {
//     flow_ids: string[];
//     channels?: string[];
//     channel_ids?: string[];
//   };
//   update: {
//     channels?: ChannelUpdateItem[];
//     flows?: string[];
//     deleted_flow_ids?: string[];
//     new_flow_ids?: string[];
//   };
// }
