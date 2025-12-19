export interface DApplicationInterface {
  _id: string;
  id: string;
  action_type: string[];
  actionType: string[];
  leader: string;
  recipient: string;
  requestNumber: string;
  sender: string;
  created_at: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

