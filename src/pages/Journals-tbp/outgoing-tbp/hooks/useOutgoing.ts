import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { OUTGOING_QUERY_KEY } from "@/pages/Journals/outgoing/constants/outgoing.constants.ts";
import { OutgoingInterface } from "@/pages/Journals/outgoing/interfaces/outgoing.interface.ts";

const useOutgoing = (id: string) => {
  const query = useGetOne<{ data: OutgoingInterface }>({
    url: [OUTGOING_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useOutgoing;
