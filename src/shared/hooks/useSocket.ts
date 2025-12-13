import { useCallback } from "react";
import { socket } from "../utils/socket";
import useAuthStore from "@/shared/store/useAuthStore.ts";

const useSocket = () => {
  const { accessToken } = useAuthStore();
  const connect = useCallback(() => {
    if (!socket.connected) {
      socket.io.opts.query = {
        token: accessToken || "",
      };
      socket.connect();
    }
  }, [accessToken]);

  return {
    socket,
    connect,
  };
};

export default useSocket;
