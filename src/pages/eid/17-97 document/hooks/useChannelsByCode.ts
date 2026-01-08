import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";
import useGetOne from "@/shared/hooks/api/useGetOne.ts";

const useChannelsByCode = (code: string) => {
  const query = useGetOne<{ data: ChannelInterface }>({
    url: [CHANNELS_ID_QUERY_KEY, "code", code],
    options: {
      enabled: Boolean(code),
    },
  });

  return {
    channelByCode: query.data?.data,
  };
};

export default useChannelsByCode;
