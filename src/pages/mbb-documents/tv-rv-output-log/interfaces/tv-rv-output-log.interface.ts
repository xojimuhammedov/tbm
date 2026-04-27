export interface TvRvOutputLogDocument {
  _id: string;
  record_date: string;
  output_type: string;
  tv_output_section: string;
  planned_time: string;
  actual_time: string;
  recipient_address: string;
  transferred_to: string;
  tv_output_result: string;
  signed_by: {
    full_name: string;
    signature: string;
  };
}
