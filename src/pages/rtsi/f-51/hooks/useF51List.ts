import useLists from "@/shared/hooks/useLists.ts";
import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import { F51_QUERY_KEY } from "@/pages/rtsi/f-51/constants/f51.constants.ts";

const useF51List = () => {
  const { query } = useLists<F51DocumentInterface>({
    url: [F51_QUERY_KEY],
    defaultParams: { page: 1, limit: 9999 },
  });

  return {
    f51List: query.data?.docs,
  };
};

export default useF51List;
