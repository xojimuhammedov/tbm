import { useEffect, useCallback, useRef } from "react";
import { connectEventsSocket } from "@/lib/socket";
import { DocumentStage } from "../interfaces/detail.interface";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DocumentSocketRecipient {
    _id: string;
    first_name: string;
    second_name: string;
    type: "APPROVAL" | "SIGNING";
    isEditor: boolean;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCEL";
    stage: "DRAFT" | "APPROVAL" | "SIGNING" | "DONE";
}

export interface DocumentSocketPayload {
    document_id: string;
    stage: DocumentStage;
    recipients: DocumentSocketRecipient[];
}

interface Props {
    documentId: string | undefined;
    onUpdate: (payload: DocumentSocketPayload) => void;
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

const useDocumentSocket = ({ documentId, onUpdate }: Props) => {
    const onUpdateRef = useRef(onUpdate);

    // Stale closure oldini olish
    useEffect(() => {
        onUpdateRef.current = onUpdate;
    }, [onUpdate]);

    const handleCreated = useCallback(
        (data: DocumentSocketPayload) => {
            if (data?.document_id !== documentId) return;
            onUpdateRef.current(data);
        },
        [documentId]
    );

    useEffect(() => {
        if (!documentId) return;
        const sock = connectEventsSocket();
        sock.emit("join-shared", { document_id: documentId });
        sock.on("created", handleCreated);
        return () => {
            sock.emit("leave-shared", { document_id: documentId });
            sock.off("created", handleCreated);
        };
    }, [documentId, handleCreated]);
};

export default useDocumentSocket;