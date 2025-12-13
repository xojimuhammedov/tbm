import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

const useMenuActive = () => {
  const { pathname } = useLocation();

  const isActive = useCallback(
    (path: string) => pathname.search(path) > -1,
    [pathname],
  );

  const isMainMenuActive = useCallback(
    (path: string) => pathname.search(path) === 0,
    [pathname],
  );
  const lastSegment = useMemo(
    () => pathname.split("/").filter(Boolean).pop(),
    [pathname],
  );

  return {
    isActive,
    isMainMenuActive,
    lastSegment,
  };
};

export default useMenuActive;
