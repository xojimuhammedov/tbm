export interface ExternalOutboundInterface {
  _id: string;
  reg_num: string;
  reg_date: string;
  external_out_doc_number: string;
  recipient: string;
  summary: string;
  response_reference_number: string | null;
  external_inbound_id: string;
}
