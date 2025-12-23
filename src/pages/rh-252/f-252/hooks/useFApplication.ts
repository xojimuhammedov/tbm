import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { FApplicationInterface } from "@/pages/rh-252/f-252/interfaces/f-252.interface.ts";

const useFApplication = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: FApplicationInterface;
  }>({
    url: [URLS.RH_F_Application, id || ""],
    queryKey: [KEYS.RH_F_Application, id],
    options: {
      enabled: Boolean(id),
    },
  });
  return {
    applicationDocumentQuery,
  };
};

export default useFApplication;
