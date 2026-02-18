// hooks/useJobSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/shared/hooks/useToast.ts";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/shared/store/useAuthStore.ts";

const SOCKET_URL = "https://eresurs.rtmc.uz";

export type JobStatus = "active" | "completed" | "failed" | "waiting";

interface JobStatusPayload {
    jobId: string;
    status: JobStatus;
    progress?: number;
    result?: unknown;
    error?: string;
}

interface UseJobSocketOptions {
    jobId: string | null;
    onProgress?: (progress: number) => void;
    onCompleted?: (result: unknown) => void;
    onFailed?: (error: string) => void;
}

const useJobSocket = ({
                          jobId,
                          onProgress,
                          onCompleted,
                          onFailed,
                      }: UseJobSocketOptions) => {
    const { toast } = useToast();
    const { t } = useTranslation();
    const accessToken = useAuthStore((s) => s.accessToken);
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        if (!jobId) return;
        console.log("[Socket] Connecting for jobId:", jobId);
        const socket = io(SOCKET_URL, {
            transports: ["websocket"],
            auth: { token: accessToken },
        });
        socketRef.current = socket;
        socket.on("connect", () => {
            console.log("[Socket] Connected. Socket ID:", socket.id);
            console.log("[Socket] join-job emitting → jobId:", jobId);

            socket.emit("join-job",  jobId , (ack: unknown) => {
                console.log("[Socket] join-job ack response:", ack);
            });
        });
        socket.on("disconnect", (reason) => {
            console.log("[Socket] Disconnected. Reason:", reason);
        });
        socket.on("connect_error", (err) => {
            console.error("[Socket] Connection error:", err.message);
            toast({
                variant: "destructive",
                title: t("Connection Error"),
                description: err.message,
            });
        });
        socket.on("job:status", (payload: JobStatusPayload) => {
            if (payload.jobId !== jobId) return;
            console.log("[Socket] job:status →", payload);
            toast({
                title: t("Job Status"),
                description: t(`Status: ${payload.status}`),
            });
        });
        socket.on("job:progress", (payload: { jobId: string; progress: number }) => {
            if (payload.jobId !== jobId) return;
            console.log("[Socket] job:progress →", payload.progress, "%");
            onProgress?.(payload.progress);
        });
        socket.on("job:completed", (payload: JobStatusPayload) => {
            if (payload.jobId !== jobId) return;
            console.log("[Socket] job:completed →", payload);
            toast({
                variant: "success",
                title: t("Import Completed"),
                description: t("Fayl muvaffaqiyatli import qilindi"),
            });
            onCompleted?.(payload.result);
            socket.emit("leave-job", { jobId });
            console.log("[Socket] leave-job emitted for", jobId);
            socket.disconnect();
        });
        socket.on("job:failed", (payload: JobStatusPayload) => {
            if (payload.jobId !== jobId) return;
            console.log("[Socket] job:failed →", payload);
            toast({
                variant: "destructive",
                title: t("Import Failed"),
                description: payload.error ?? t("Noma'lum xatolik"),
            });
            onFailed?.(payload.error ?? "Unknown error");
            socket.emit("leave-job", { jobId });
            console.log("[Socket] leave-job emitted for", jobId);
            socket.disconnect();
        });
        return () => {
            console.log("[Socket] Cleanup — disconnecting socket for", jobId);
            if (socket.connected) {
                socket.emit("leave-job", { jobId });
                console.log("[Socket] leave-job emitted on cleanup for", jobId);
            }
            socket.disconnect();
        };
    }, [jobId]);
};

export default useJobSocket;
