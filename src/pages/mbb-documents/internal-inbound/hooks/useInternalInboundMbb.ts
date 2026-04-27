import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { INTERNAL_INBOUND_MBB_QUERY_KEY } from "@/pages/mbb-documents/internal-inbound/constants/internal-inbound-mbb.constants";
import { InternalInboundMbbDocument } from "@/pages/mbb-documents/internal-inbound/interfaces/internal-inbound-mbb.interface";

const useInternalInboundMbb = (id: string) => {
  const query = useGetOne<{ data: InternalInboundMbbDocument }>({
    url: [INTERNAL_INBOUND_MBB_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    document: query.data?.data,
  };
};

export default useInternalInboundMbb;
