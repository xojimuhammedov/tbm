import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import { F51_QUERY_KEY } from "@/pages/rtsi/f-51/constants/f51.constants.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useF51Document = (id: string) => {
  const f51DocumentQuery = useGetOne<{ data: F51DocumentInterface }>({
    url: [F51_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    f51DocumentQuery,
  };
};

export default useF51Document;
