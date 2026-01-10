import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import {
  LocalInboundInterface
} from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import {
  LOCAL_INBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-98 local inbound document/constants/local.inbound.constants.ts";

const useLocalInbound = (id: string) => {
  const query = useGetOne<{ data: LocalInboundInterface }>({
    url: [LOCAL_INBOUND_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useLocalInbound;
