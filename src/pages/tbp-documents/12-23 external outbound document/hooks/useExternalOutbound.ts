import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { EXTERNAL_OUTBOUND_QUERY_KEY } from "@/pages/tbp-documents/12-23 external outbound document/constants/external.outbound.constants";
import { ExternalOutboundInterface } from "@/pages/tbp-documents/12-23 external outbound document/interfaces/external.outbound.interface";

const useExternalOutbound = (id: string) => {
  const query = useGetOne<{ data: ExternalOutboundInterface }>({
    url: [EXTERNAL_OUTBOUND_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useExternalOutbound;
