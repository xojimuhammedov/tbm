import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { DApplicationInterface } from "@/pages/rh-252/d-252/interfaces/d-252.interface.ts";

const useApplicationDocumentB = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: DApplicationInterface;
  }>({
    url: [URLS.RH_D_Application, id || ""],
    queryKey: [KEYS.RH_D_Application, id],
    options: {
      enabled: Boolean(id),
    },
  });
  return {
    applicationDocumentQuery,
  };
};

export default useApplicationDocumentB;
