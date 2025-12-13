import { F56DocumentInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";
import { F56_QUERY_KEY } from "@/pages/rtsi/f-56/constants/f56.constants.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useF56Document = (id: string) => {
  const f56DocumentQuery = useGetOne<{ data: F56DocumentInterface }>({
    url: [F56_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    f56DocumentQuery,
  };
};

export default useF56Document;
