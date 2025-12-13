import { PersonInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";

export interface ApplicationDocumentInterface {
  applicationNumber: string;
  workProcedure: string;
  workDateTime: string;
  station: string;
  noNumber: string;
  aiChannels: string;
  workReason: string;
  workDescription: string;
  description: string;
  koStatus: string;
  bypassSchedule: string;
  alternativeBackup: string;
  responsiblePerson: string;
  approvedByTechnicalDirector: string;
  approvedByLocalAI: string;
  orderAP: string;
  orderMBB: string;
  _id: string;
  title: string;
  status: string;
  status_history: StatusHistory[];
  creatorId: PersonInterface;
  recipientIds: PersonInterface[];
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
