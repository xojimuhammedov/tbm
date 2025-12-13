import { F54DocumentInterface } from "@/pages/rtsi/f-54/interfaces/f54Document.interface.ts";
import { F54_QUERY_KEY } from "@/pages/rtsi/f-54/constants/f54.constants.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useF54Document = (id: string) => {
  const f54DocumentQuery = useGetOne<{ data: F54DocumentInterface }>({
    url: [F54_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    f54DocumentQuery,
  };
};

export default useF54Document;
