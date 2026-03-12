import { connectEventsSocket } from "@/lib/socket";
import { useEffect, useRef } from "react";

export type DocumentStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "REJECTED"
  | "APPROVED"
  | "SIGNING"
  | "SIGNED"
  | "EXECUTING"
  | "EXECUTED"
  | "CANCELLED";

export type RecipientStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCEL";
export type RecipientType = "APPROVAL" | "SIGNING";

export interface SocketRecipient {
  _id: string;
  first_name: string;
  second_name: string;
  middle_name?: string;
  type: RecipientType;
  stages: string;
  status: RecipientStatus;
  isEditor: boolean;
  is_current: boolean;
  is_parallel: boolean;
  order: number;
  shared_id?: string;
  comment?: string;
}

export interface DocumentSocketPayload {
  document_id: string;
  document_code: string;
  document_status: DocumentStatus;
  document_stage?: "APPROVAL" | "SIGNING" | "DONE" | "DRAFT";
  document_type: string;
  users?: SocketRecipient[];
  signers?: SocketRecipient[];
  signer?: SocketRecipient;
}

interface Props {
  documentId: string | undefined;
  onUpdate: (payload: DocumentSocketPayload) => void;
}

const useDocumentSocket = ({ documentId, onUpdate }: Props) => {
  const onUpdateRef = useRef(onUpdate);
  const documentIdRef = useRef(documentId);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);
  useEffect(() => {
    documentIdRef.current = documentId;
  }, [documentId]);

  useEffect(() => {
    if (!documentId) return;

    const sock = connectEventsSocket();

    const handleJoin = () => {
      sock.emit("join-shared", { document_id: documentId });
    };

    if (sock.connected) {
      handleJoin();
    }

    sock.on("connect", handleJoin);

    const handler = (message: any) => {
      let found: DocumentSocketPayload | undefined;

      if (message?.data && Array.isArray(message.data)) {
        found = message.data.find(
          (d: any) => d.document_id === documentIdRef.current,
        );
      } else if (message?.document_id === documentIdRef.current) {
        found = message;
      } else if (Array.isArray(message)) {
        found = message.find(
          (d: any) => d.document_id === documentIdRef.current,
        );
      }

      if (found) {
        onUpdateRef.current(found);
      }
    };

    sock.on("shared:created", handler);
    sock.on("shared:list", handler);

    return () => {
      sock.emit("leave-shared", { document_id: documentId });
      sock.off("connect", handleJoin);
      sock.off("shared:created", handler);
      sock.off("shared:list", handler);
    };
  }, [documentId]);
};

export default useDocumentSocket;
