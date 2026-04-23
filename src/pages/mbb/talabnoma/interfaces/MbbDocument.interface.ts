export interface BaseMbbDocument {
  _id: string;
  id?: string;
  code: string;
  document_type: "MEMO" | "REQUISITION" | "MEMO_3_3" | "DECLARATION";
  signer: any;
  created_at?: string;
  created_by?: any;
  pdf_path?: string;
  status?: string;
}

export interface RequisitionDocument extends BaseMbbDocument {
  document_type: "REQUISITION";
  payload?: RequisitionPayload;
}

export interface MemoDocument extends BaseMbbDocument {
  document_type: "MEMO";
  payload?: MemoPayload;
}

export interface TMemoDocument extends BaseMbbDocument {
  document_type: "MEMO_3_3";
  payload?: TMemoPayload;
}

export interface DeclarationDocument extends BaseMbbDocument {
  document_type: "DECLARATION";
  payload?: DeclarationPayload;
}

export type MbbDocumentInterface = RequisitionDocument | MemoDocument | TMemoDocument | DeclarationDocument;

export type MbbPayloadInterface = RequisitionPayload | MemoPayload | TMemoPayload | DeclarationPayload;

export interface RequisitionPayload {
  working_condition?: string;
  schedule?: MbbSchedule[];
  station?: string;
  no_number?: string;
  ai_channel?: string;
  reason_work?: string;
  content_work?: string;
  no_status?: string;
  aoj_number?: string;
  reverse?: string;
  responsible_person?: string;
  agreed?: string;
  ai_agreed?: string;
  creator_ip?: string;
  creator_mbb?: string;
  application?: MbbApplication[];
  status?: string;
}

export interface MemoPayload {
  title?: string;
  data?: MbbOrderData[];
}

export interface TMemoPayload {
  ap_executor?: string;
  ubp_executor?: string;
  rows?: TMemoRow[];
}

export interface TMemoRow {
  branch_order_info?: string;
  connection_date?: string;
  connection_route?: string;
  note?: string;
}

export interface DeclarationPayload {
  basic?: {
    organization_name?: string;
    request_number?: string;
    request_date?: string;
  };
  context?: string;
}

export interface MbbSchedule {
  start_at: string;
  end_at: string;
}

export interface MbbApplication {
  operator_name: string;
  ranges: MbbRange[];
}

export interface MbbRange {
  from: string;
  to: string;
}

export interface MbbOrderData {
  _id?: string;
  order_code: string;
  assigned_time: string;
  completed_time: string;
  responsible_executor: string;
  customer_details: string;
  comment: string;
}
