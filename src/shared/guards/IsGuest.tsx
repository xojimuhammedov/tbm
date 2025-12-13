import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import AuthHookStore from "../store/useAuthStore.ts";
import useUserStore from "@/shared/store/useUserStore.ts";

interface IsGuestProps {
  children?: ReactNode;
}

const IsGuest = ({ children }: IsGuestProps) => {
  const { accessToken } = AuthHookStore();
  const { me } = useUserStore();

  return <>{accessToken && me?._id ? <Navigate to={`/`} /> : children}</>;
};

export default IsGuest;
