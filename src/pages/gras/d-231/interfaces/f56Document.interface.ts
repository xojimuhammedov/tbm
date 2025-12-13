import { DocumentFieldsInterface } from "@/pages/rtsi/f-56/interfaces/document-fields.interface.ts";

export interface F56DocumentInterface {
  _id: string;
  title: string;
  created_at: string;
  description: string;
  files: string[];
  status: "draft" | "sent" | "approved" | "rejected";
  submittedBy?: string;
  sentAt?: string;
  docType?: string;
  sendHistory?: Array<{
    date: string;
    recipient: string;
    status: string;
    description?: string;
  }>;
  documents: DocumentFieldsInterface[];
  recipientIds: PersonInterface[];
  creatorId: PersonInterface;
}

export interface PersonInterface {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name: string;
}
