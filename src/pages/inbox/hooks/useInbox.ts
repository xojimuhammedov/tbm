import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { InboxInterface } from "@/pages/inbox/interfaces/inbox.interface.ts";
import { INBOX_QUERY_KEY } from "@/pages/inbox/constants/television.constants.ts";

const useInbox = (id: string) => {
  const inboxQuery = useGetOne<{
    data: InboxInterface;
  }>({
    url: [INBOX_QUERY_KEY, id || ""],
    options: {
      enabled: Boolean(id),
    },
  });

  return { inboxQuery };
};

export default useInbox;
