import { GROUPS_QUERY_KEY } from "@/pages/groups/constants/groups.constants.ts";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import useLists from "@/shared/hooks/useLists.ts";
import { useMemo } from "react";

const useGroupOptions = () => {
  const { query } = useLists<GroupInterface>({
    url: [GROUPS_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const groupOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [query.data],
  );

  return {
    groupOptions,
  };
};

export default useGroupOptions;