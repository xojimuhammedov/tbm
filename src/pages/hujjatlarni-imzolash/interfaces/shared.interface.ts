export interface DocumentId {
  code: string;
  document_type: string;
  status: string;
  _id: string;
}

export interface FromId {
  first_name: string;
  middle_name?: string;
  second_name: string;
  _id: string;
}

export type SharedType = "SIGNING" | "APPROVAL";
export type SharedStatus = "REJECTED" | "PENDING" | "ACCEPTED" | "CANCEL";
export type SharedStage = "DRAFT" | "SIGNING" | "APPROVAL" | "DONE";

export interface SharedItemInterface {
  _id?: string;
  created_at: string;
  document_id: DocumentId;
  from_id: FromId;
  isEditor: boolean;
  shared_id: string;
  stages: SharedStage;
  status: SharedStatus;
  to_id: string;
  type: SharedType;
}