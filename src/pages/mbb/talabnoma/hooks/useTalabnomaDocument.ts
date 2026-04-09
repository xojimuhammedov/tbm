import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { TalabnomaInterface } from "@/pages/mbb/talabnoma/interfaces/Talabnoma.interface.ts";

const useTalabnomaDocumentQuery = (id: string) => {
  const applicationDocumentQuery = useGetOne<{
    data: TalabnomaInterface;
  }>({
    url: [URLS.MBB_Talabnoma, id || ""],
    queryKey: [KEYS.MBB_Talabnoma, id],
    options: {
      enabled: Boolean(id),
    },
  });
  return {
    applicationDocumentQuery,
  };
};

export default useTalabnomaDocumentQuery;
