import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import {
  EXTERNAL_INBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-96 external inbound document/constants/external-inbound.constants.ts";
import {
  ExternalInboundDocument
} from "@/pages/in & out documents/17-96 external inbound document/interfaces/ex-in.interface.ts";

const useExternalInbound = (id: string) => {
  const query = useGetOne<{ data: ExternalInboundDocument }>({
    url: [EXTERNAL_INBOUND_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useExternalInbound;
