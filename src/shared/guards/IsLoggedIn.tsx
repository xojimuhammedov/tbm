import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuthStore from "../store/useAuthStore.ts";
import useUserStore from "@/shared/store/useUserStore.ts";

interface IsLoggedInProps {
  children?: ReactNode;
}

const IsLoggedIn = ({ children }: IsLoggedInProps) => {
  const { accessToken } = useAuthStore();
  const { me } = useUserStore();

  return <>{accessToken && me?._id ? children : <Navigate to={`/auth`} />}</>;
};

export default IsLoggedIn;
