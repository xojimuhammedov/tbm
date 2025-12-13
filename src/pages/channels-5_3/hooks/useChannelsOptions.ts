import useLists from "@/shared/hooks/useLists.ts";
import { useMemo } from "react";
import { CHANNELS_5_3_QUERY_KEY } from "@/pages/channels-5_3/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

const useChannelsOptions = () => {
  const { query } = useLists<ChannelInterface>({
    url: [CHANNELS_5_3_QUERY_KEY],
    defaultParams: { page: 1, limit: 100 },
  });

  const channelOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.code,
        value: item._id,
      })),
    [query.data],
  );

  return {
    channelOptions,
  };
};

export default useChannelsOptions;
