import { CHANNELS_5_3_QUERY_KEY } from "@/pages/channels-5_3/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useChannel = (id: string) => {
  const query = useGetOne<{ data: ChannelInterface }>({
    url: [CHANNELS_5_3_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useChannel;
