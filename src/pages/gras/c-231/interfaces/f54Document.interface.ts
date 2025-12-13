import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

export interface F54DocumentInterface {
  description: string;
  date: string;
  minute: string;
  real_minutes: string;
  noNumber: string;
  teOeDesignation: string;
  workArea: string;
  cause: string;
  ubpZone: string[];
  prophylaxisType: string;
  note: string;
  _id: string;
  status: string;
  status_history: StatusHistoryInterface[];
  creatorId: PersonInterface;
  recipientIds: PersonInterface[];
  rejected_at: string;
  finished_at: string;
  created_at: string;
  channel_id: ChannelInterface;
  __v: number;
}

interface PersonInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
}

export interface StatusHistoryInterface {
  status: string;
  timestamp: string;
  changedBy: string;
  _id: string;
}
