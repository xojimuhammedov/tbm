import useGetOne from "@/shared/hooks/api/useGetOne.ts";
import { TV_RV_OUTPUT_LOG_QUERY_KEY } from "../constants/tv-rv-output-log.constants";
import { TvRvOutputLogDocument } from "../interfaces/tv-rv-output-log.interface";

const useTvRvOutputLog = (id: string) => {
  const query = useGetOne<{ data: TvRvOutputLogDocument }>({
    url: [TV_RV_OUTPUT_LOG_QUERY_KEY, id],
    options: {
      enabled: Boolean(id),
    },
  });

  return {
    document: query.data?.data,
  };
};

export default useTvRvOutputLog;
