import { PersonInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";
import { StatusHistory } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";

export interface TelevisionRowInterface {
  address: string;
  speed_and_type?: string;
  date: string;
  duration: string;
  type?: string;
}

export interface InboxInterface {
  _id: string;
  title: string;
  description?: string;
  chairman: string;
  director: string;
  text1: string;
  text2: string;
  speed: string;
  documents: TelevisionRowInterface[];
  status?: string;
  status_history?: StatusHistory[];
  creatorId: PersonInterface;
  recipientIds: PersonInterface[];
  files?: string[];
  rejected_at?: string;
  finished_at?: string;
  created_at?: string;
}
