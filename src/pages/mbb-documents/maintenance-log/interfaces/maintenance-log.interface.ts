export interface MaintenanceLogDocument {
  _id: string;
  scheduled_at: string;
  actual_at: string;
  actual_duration: number;
  ko_number: string;
  channel_designation: string;
  work_section: string;
  maintenance_type: string;
  work_reason: string;
  mbb_zone: string;
  notes: string;
}
