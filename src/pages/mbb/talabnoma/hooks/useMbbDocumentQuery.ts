import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { MbbDocumentInterface } from "@/pages/mbb/talabnoma/interfaces/MbbDocument.interface.ts";

const useMbbDocumentQuery = (id: string) => {
  const documentQuery = useGetOne<{
    data: MbbDocumentInterface;
  }>({
    url: [URLS.MBB_Document, id || ""],
    queryKey: [KEYS.MBB_Document, id],
    options: {
      enabled: Boolean(id),
    },
  });
  return {
    documentQuery,
  };
};

export default useMbbDocumentQuery;
