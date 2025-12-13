import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { RTTSI_QUERY_KEY } from "@/pages/rttsi/constants/rttsi.constants.ts";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";

const useRTTSIDocument = (id: string) => {
  const rttsiDocumentQuery = useGetOne<{ data: RTTSIDocumentInterface }>({
    url: [RTTSI_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    rttsiDocumentQuery,
  };
};

export default useRTTSIDocument;
