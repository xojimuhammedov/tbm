import useAuthStore from "@/shared/store/useAuthStore.ts";
import { io, Socket } from "socket.io-client";

// Get socket URL from environment or fallback
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://eresurs.rtmc.uz";

// ─── Socket event types ───────────────────────────────────────────────────────

export type EventsSocketEvents = {
  "job:status": (data: any) => void;
  "job:progress": (data: any) => void;
  "job:completed": (data: any) => void;
  "job:failed": (data: any) => void;
  "leave-job": (data: any) => void;

  "join-shared": (data: any) => void;
  "leave-shared": (data: any) => void;
  "join-notification": (data: { document_id: string }) => void;
  "shared:created": (data: any) => void;

  // Mana shu qator TS2345 xatosini yo'qotadi
  "shared:list": (data: any) => void;
};

let socket: Socket<EventsSocketEvents> | null = null;

export const connectEventsSocket = (): Socket<EventsSocketEvents> => {
  const token = useAuthStore.getState().accessToken;

  if (socket) {
    // Agar token o'zgargan bo'lsa, uni yangilash
    if (socket.auth && (socket.auth as any).token !== token) {
      socket.auth = { token };
      if (socket.io?.opts) {
        socket.io.opts.extraHeaders = token
          ? { Authorization: `Bearer ${token}` }
          : {};
      }
      // Token yangilangach qayta ulanish shart
      socket.disconnect().connect();
    }

    if (socket.disconnected) {
      socket.connect();
    }
    return socket;
  }

  socket = io(SOCKET_URL, {
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

  return socket;
};
