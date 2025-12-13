import { PersonInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";

export interface OperativeDocumentInterface {
  description: string;
  UbpNumber: string;
  applicationNumber: string;
  workConditions: string;
  date: string;
  magistralName: string;
  NoNumber: string;
  ai9Channels: string;
  reasonJob: string;
  jobDescription: string;
  NOStatus: string;
  aag: string;
  reservation: string;
  responsiblePerson: string;
  headOfTheEnterprise: string;
  aiFullName: string;
  applicantAP: string;
  applicantUBP: string;
  _id: string;
  title: string;
  status: string;
  status_history: StatusHistory[];
  creatorId: PersonInterface;
  recipientIds: PersonInterface[];
  files: string[];
  rejected_at: string;
  finished_at: string;
  created_at: string;
}

export interface StatusHistory {
  status: string;
  timestamp: string;
  changedBy: string;
  _id: string;
}
