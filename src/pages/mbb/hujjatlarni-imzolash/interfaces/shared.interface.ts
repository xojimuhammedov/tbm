export interface SharedUser {
  shared_id: string;
  first_name: string;
  second_name: string;
  middle_name?: string;
}

export type DocumentStage = "APPROVAL" | "SIGNING" | "DONE" | "DRAFT";

export interface SharedItemInterface {
  _id?: string;
  document_id?: any;
  signer?: SharedUser[];
  user?: SharedUser[];
  status?: string;
  shared_id?: string;
  title?: string;
  signature?: any;
  stage?: DocumentStage | string;
  code?: string;
}
