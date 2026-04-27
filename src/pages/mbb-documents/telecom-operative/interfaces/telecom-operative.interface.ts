export interface TelecomOperativeKodogram {
  status_index: string;
  ko_number: string;
  start_time: string;
  end_time: string;
}

export interface TelecomOperativeDocument {
  _id: string;
  received_at: string;
  transmitted_at: string;
  sender_address: string;
  recipient_address: string;
  transferred_to: string;
  kodogram: TelecomOperativeKodogram;
  content_info: string;
}
