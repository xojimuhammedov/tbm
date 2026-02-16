export interface UserInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
}

export interface OutgoingInterface {
  _id: string;
  id: string;
  year: number;
  seq_number: string;
  registration_date: string;
  doc_index: string;
  recipient: string;
  summary: string;
  created_at: string;
  user: UserInterface;
}