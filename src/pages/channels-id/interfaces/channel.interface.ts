export interface ChannelInterface {
  _id: string;
  id: string;
  code: string;
  consumer_name: string;
  point_a: string;
  point_b: string;
  link_N1: string;
  organization_order: string;
  organization_order_date: string | Date;
  dissolution_order: string | null;
  dissolution_order_date: string | null;
  archive_order: string | null;
  archive_order_date: string | null;
  status: 'active' | 'inactive' | string;
  created_at: string | Date;
  connection_number?: string;
  deciphering_notes?: string;
  verification_status?: string;
  is_archived?: boolean | string;
}