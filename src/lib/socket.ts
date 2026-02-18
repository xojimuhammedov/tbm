import { io, Socket } from "socket.io-client";
import useAuthStore from "@/shared/store/useAuthStore.ts";

export type JobEvents = {
    "job:status": (data: any) => void;
    "job:progress": (data: any) => void;
    "job:completed": (data: any) => void;
    "job:failed": (data: any) => void;
    "leave-job": (data: any) => void;
};

let socket: Socket<JobEvents> | null = null;

export const connectEventsSocket = (): Socket<JobEvents> => {
    const token = useAuthStore.getState().accessToken;

    // Socket mavjud va ulangan bo'lsa qaytaramiz
    if (socket?.connected) return socket;

    // Socket mavjud lekin ulanmagan bo'lsa o'chiramiz
    if (socket) {
        socket.disconnect();
        socket = null;
    }

    socket = io("https://eresurs.rtmc.uz", {
        path: "/events/socket.io", // agar /events namespace bo'lsa
        transports: ["websocket"],
        auth: { token },
        extraHeaders: token ? { Authorization: `Bearer ${token}` } : {},
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    // Debug
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

export const disconnectEventsSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};