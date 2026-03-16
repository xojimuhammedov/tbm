import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useUserStore from "@/shared/store/useUserStore.ts";

interface HasAccessProps {
  roles?: string[];
  children?: ReactNode;
}

const HasAccess = ({ roles, children }: HasAccessProps) => {
  const { me } = useUserStore();
  const userRole = (me as any)?.role?.name;

  if (roles && roles.length > 0) {
    if (!userRole || !roles.includes(userRole)) {
      return <Navigate to="/error/not-found" replace />;
    }
  }

  return <>{children}</>;
};

export default HasAccess;
