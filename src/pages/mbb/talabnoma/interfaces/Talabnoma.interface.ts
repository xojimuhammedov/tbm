export interface TalabnomaInterface {
  _id: string;
  id?: string;
  code: string;
  title?: string;
  working_condition: string;
  schedule: TalabnomaSchedule[];
  station: string;
  no_number: string;
  ai_channel: string;
  reason_work: string;
  content_work: string;
  no_status: string;
  aoj_number: string;
  reverse: string;
  responsible_person: string;
  agreed: string;
  ai_agreed: string;
  creator_ip: string;
  creator_mbb: string;
  application: TalabnomaApplication[];
  signer: any;
  created_at?: string;
  created_by?: any;
  pdf_path?: string;
}

export interface TalabnomaSchedule {
  start_at: string;
  end_at: string;
}

export interface TalabnomaApplication {
  operator_name: string;
  ranges: TalabnomaRange[];
}

export interface TalabnomaRange {
  from: string;
  to: string;
}
