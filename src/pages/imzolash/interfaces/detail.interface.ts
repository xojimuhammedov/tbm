// ─── Document ────────────────────────────────────────────────────────────────

export interface BasicPayload {
    title: string;
    start_time: string;
    end_time: string;
    connection_closure_type: string;
    max_duration_minutes: number;
    timezone: string;
    request_date?: string;
    request_number?: string;
}

export interface DocumentPayload {
    basic: BasicPayload;
    flow_ids?: { code: string }[];
}

export interface StaffUser {
    _id: string;
    first_name: string;
    second_name: string;
    short_phone?: string;
}

export interface ApplicationDocument {
    _id: string;
    code: string;
    order_date: string;
    created_at: string;
    payload: DocumentPayload;
    to: string[];
    copy: string[];
    responsible: StaffUser;
    director: StaffUser;
    created_by: StaffUser;
}

// ─── Share / Bulk send ────────────────────────────────────────────────────────

export type ShareType = "APPROVAL" | "SIGNING";

export interface ShareRecipient {
    user_id: string;
    type: ShareType;
    isEditor: boolean;
}

export interface BulkSharePayload {
    document_id: string;
    isQueue: boolean;
    data: ShareRecipient[];
}

export interface BulkShareResponse {
    success: boolean;
    message: string;
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

export interface GeneratePdfResponse {
    success: boolean;
    message: string;
    fileName: string;
}

// ─── Stage ───────────────────────────────────────────────────────────────────

export type DocumentStage = "draft" | "approval" | "signing" | "done";