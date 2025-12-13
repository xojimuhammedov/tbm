import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useChannel = (id: string) => {
  const query = useGetOne<{ data: ChannelInterface }>({
    url: [CHANNELS_ID_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useChannel;
