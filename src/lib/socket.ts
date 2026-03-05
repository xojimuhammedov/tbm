import useAuthStore from "@/shared/store/useAuthStore.ts";
import { io, Socket } from "socket.io-client";

// ─── Socket event types ───────────────────────────────────────────────────────

export type EventsSocketEvents = {
    // Job events (mavjud)
    "job:status": (data: any) => void;
    "job:progress": (data: any) => void;
    "job:completed": (data: any) => void;
    "job:failed": (data: any) => void;
    "leave-job": (data: any) => void;

    // Document shared events
    "join-shared": (data: { document_id: string }) => void;
    "leave-shared": (data: { document_id: string }) => void;
    "join-notification": (data: { document_id: string }) => void;
    "shared:created": (data: any) => void;
};

let socket: Socket<EventsSocketEvents> | null = null;

export const connectEventsSocket = (): Socket<EventsSocketEvents> => {
    const token = useAuthStore.getState().accessToken;

    if (socket) {
        // Update token just in case it changed
        socket.auth = { token };
        if (socket.io?.opts) {
            socket.io.opts.extraHeaders = token ? { Authorization: `Bearer ${token}` } : {};
        }

        // If it was manually disconnected, reconnect
        if (socket.disconnected) {
            socket.connect();
        }
        return socket;
    }

    socket = io("https://eresurs.rtmc.uz", {
        path: "/socket.io",
        transports: ["websocket"],
        auth: { token },
        extraHeaders: token ? { Authorization: `Bearer ${token}` } : {},
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
        console.log("✅ Socket connected:", socket?.id);
    });
    socket.on("connect_error", (err) => {
        console.error("❌ Socket connect_error:", err.message);
    });
    socket.on("disconnect", (reason) => {
        console.warn("🔌 Socket disconnected:", reason);
    });

    return socket;
};