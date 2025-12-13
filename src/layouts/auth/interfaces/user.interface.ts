export interface UserInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
  email: string;
  pinfl: string;
  role: { _id: string; name: string };
  created_at: string;
  updated_at: string;
}
