import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import {NOTIFY_QUERY_KEY} from "@/pages/Journals/notify/constants/notify.constants.ts";
import {NotifyInterface} from "@/pages/Journals/notify/interfaces/notify.interface.ts";

const useNotify = (id: string) => {
  const query = useGetOne<{ data: NotifyInterface }>({
    url: [NOTIFY_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useNotify;
