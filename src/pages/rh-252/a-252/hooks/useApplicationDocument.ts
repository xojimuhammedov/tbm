import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { APPLICATION_QUERY_KEY } from "@/pages/rtsi/application/constants/application.constants.ts";
import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";

const useApplicationDocument = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: ApplicationDocumentInterface;
  }>({
    url: [APPLICATION_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    applicationDocumentQuery,
  };
};

export default useApplicationDocument;
