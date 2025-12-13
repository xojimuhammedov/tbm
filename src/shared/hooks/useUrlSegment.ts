import { useLocation } from "react-router-dom";

const useUrlSegment = () => {
  const { pathname } = useLocation();

  return pathname.slice(1).split("/");
};

export default useUrlSegment;
