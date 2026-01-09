export interface ExternalInboundDocument {
  _id: string;
  reg_num: string;
  reg_date: string;
  journal_index: string;
  reception_num: string;
  reception_date: string;
  original_num: string;
  original_date: string;
  doc_type: string;
  organization: string;
  content: string;
  assignee: string;
  resolution: string;
  deadline: string;
  status: "pending" | "completed" | "in_process" | "rejected";
  reply_order_date: string | null;
}

