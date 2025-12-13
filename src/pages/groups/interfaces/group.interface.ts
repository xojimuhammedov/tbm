import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  users: StaffInterface[];
  userCount: number;
  created_at: string;
  updated_at: string;
}
