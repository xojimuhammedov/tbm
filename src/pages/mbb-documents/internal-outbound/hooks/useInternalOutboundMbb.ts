import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { INTERNAL_OUTBOUND_MBB_QUERY_KEY } from "../constants/internal-outbound-mbb.constants";
import { InternalOutboundMbbDocument } from "../interfaces/internal-outbound-mbb.interface";

const useInternalOutboundMbb = (id: string) => {
  const query = useGetOne<{ data: InternalOutboundMbbDocument }>({
    url: [INTERNAL_OUTBOUND_MBB_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    document: query.data?.data,
  };
};

export default useInternalOutboundMbb;
