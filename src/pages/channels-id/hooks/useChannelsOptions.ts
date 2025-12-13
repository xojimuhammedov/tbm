import useLists from "@/shared/hooks/useLists.ts";
import { useMemo } from "react";
import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";

const useChannelsOptions = () => {
  const { query } = useLists<ChannelInterface>({
    url: [CHANNELS_ID_QUERY_KEY],
    defaultParams: { page: 1, limit: 100 },
  });

  const channelOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.id_number,
        value: item._id,
      })),
    [query.data],
  );

  return {
    channelOptions,
  };
};

export default useChannelsOptions;
