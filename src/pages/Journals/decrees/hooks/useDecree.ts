import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import {DECREES_QUERY_KEY} from "@/pages/Journals/decrees/constants/decrees.constants.ts";
import {DecreesInterface} from "@/pages/Journals/decrees/interfaces/decrees.interface.ts";

const useDecree = (id: string) => {
  const query = useGetOne<{ data: DecreesInterface }>({
    url: [DECREES_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    channel: query.data?.data,
  };
};

export default useDecree;
