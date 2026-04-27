import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { CHANNEL_STATUS_QUERY_KEY } from "../constants/channel-status.constants";
import { ChannelStatusDocument } from "../interfaces/channel-status.interface";

const useChannelStatus = (id: string) => {
  const query = useGetOne<{ data: ChannelStatusDocument }>({
    url: [CHANNEL_STATUS_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    document: query.data?.data,
  };
};

export default useChannelStatus;
