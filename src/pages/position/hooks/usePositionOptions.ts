import useLists from "@/shared/hooks/useLists.ts";
import { POSITION_QUERY_KEY } from "@/pages/position/constants/position.constants.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import { useMemo } from "react";
import { PositionInterface } from "@/pages/position/interfaces/position.interface.ts";

const usePositionOptions = () => {
  const { query } = useLists<PositionInterface>({
    url: [POSITION_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const positionOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [query.data],
  );

  return {
    positionOptions,
  };
};

export default usePositionOptions;
