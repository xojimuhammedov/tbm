import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { OPERATIVE_QUERY_KEY } from "@/pages/operative/constants/operative.constants.ts";
import { OperativeDocumentInterface } from "@/pages/operative/interfaces/operativeDocument.interface.ts";

const useOperativeDocument = (id: string) => {
  const operativeDocumentQuery = useGetOne<{
    data: OperativeDocumentInterface;
  }>({
    url: [OPERATIVE_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    operativeDocumentQuery,
  };
};

export default useOperativeDocument;
