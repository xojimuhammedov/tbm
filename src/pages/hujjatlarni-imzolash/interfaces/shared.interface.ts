export interface SharedUser {
  shared_id: string;
  first_name: string;
  second_name: string;
  middle_name?: string;
  type: string;
  isEditor: boolean;
  status: string;
  stages: string;
  order: number;
  is_parallel: boolean;
  is_current: boolean;
  comment?: string | null;
}

export type DocumentStage = "APPROVAL" | "SIGNING" | "DONE" | "DRAFT";

export interface SharedItemInterface {
  _id?: string;
  document_id?: any;
  document_status?: string;
  document_code?: string;
  document_type?: string;
  document_stage?: DocumentStage;
  signers?: SharedUser[];
  users?: SharedUser[];
  status?: string;
  stages?: DocumentStage | string;
  shared_id?: string;
}
