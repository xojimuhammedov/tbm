export interface ExternalInboundDocument {
  _id: string;
  reg_num: string;
  reg_date: string;
  journal_index: string;
  reception_date: string;
  original_num: string;
  original_date: string;
  doc_type: string;
  organization: string;
  content: string;
  assignee: string;
  reply_order_date: string | null;
}
