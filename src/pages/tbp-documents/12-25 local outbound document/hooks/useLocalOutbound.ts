import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { LocalOutboundInterface } from "@/pages/tbp-documents/12-25 local outbound document/interfaces/local.outbound.interface";
import { LOCAL_OUTBOUND_QUERY_KEY } from "@/pages/tbp-documents/12-25 local outbound document/constants/local.outbound.constants";

const useLocalOutbound = (id: string) => {
  const query = useGetOne<{ data: LocalOutboundInterface }>({
    url: [LOCAL_OUTBOUND_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useLocalOutbound;
