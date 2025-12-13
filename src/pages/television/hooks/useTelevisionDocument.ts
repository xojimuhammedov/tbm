import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { TELEVISION_QUERY_KEY } from "@/pages/television/constants/television.constants.ts";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";

const useTelevisionDocument = (id: string) => {
  const televisionDocumentQuery = useGetOne<{
    data: TelevisionDocumentInterface;
  }>({
    url: [TELEVISION_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return { televisionDocumentQuery };
};

export default useTelevisionDocument;
