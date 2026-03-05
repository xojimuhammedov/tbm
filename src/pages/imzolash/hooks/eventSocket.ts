import { io, Socket } from "socket.io-client";
import useAuthStore from "@/shared/store/useAuthStore.ts";

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
  created: (data: any) => void;
};

let socket: Socket<EventsSocketEvents> | null = null;

export const connectEventsSocket = (): Socket<EventsSocketEvents> => {
  const token = useAuthStore.getState().accessToken;

  if (socket?.connected) return socket;

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io("https://eresurs.rtmc.uz", {
    path: "/events/socket.io",
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

export const disconnectEventsSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
