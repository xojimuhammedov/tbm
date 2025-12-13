import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";
import { StatusHistoryInterface } from "@/pages/rtsi/f-54/interfaces/f54Document.interface.ts";

export interface F51DocumentInterface {
  description: string;
  date: string;
  minute: string;
  noNumber: string;
  teOeDesignation: string;
  workArea: string;
  rerouteSchedule: string;
  ubpZone: string[];
  prophylaxisType: string;
  interestedUbp: string;
  note: string;
  _id: string;
  channel_id: ChannelInterface;
  status: string;
  status_history: StatusHistoryInterface[];
  creatorId: PersonInterface;
  recipientIds: PersonInterface[];
  rejected_at: string;
  finished_at: string;
  created_at: string;
  __v: number;
}

interface PersonInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
}
