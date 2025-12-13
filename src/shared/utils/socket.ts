import { io } from "socket.io-client";
import { config } from "@/shared/utils/config.ts";

export const socket = io(config.SOCKET_URL, {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("Connected");
});

socket.on("connect_error", (err) => {
  console.log(err);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
