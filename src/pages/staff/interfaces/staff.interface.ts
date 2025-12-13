export interface StaffInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
  email: string;
  role: { _id: string; name: string };
  pinfl: string;
  phone: string;
  creatorId: string;
  created_at: string;
  updated_at: string;
  __v: number;
}
