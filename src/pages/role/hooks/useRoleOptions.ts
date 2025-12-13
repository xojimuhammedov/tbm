import useLists from "@/shared/hooks/useLists.ts";
import { ROLE_QUERY_KEY } from "@/pages/role/constants/role.constants.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import { useMemo } from "react";
import { RoleInterface } from "@/pages/role/interfaces/role.interface.ts";

const useRoleOptions = () => {
  const { query } = useLists<RoleInterface>({
    url: [ROLE_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const roleOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [query.data],
  );

  return {
    roleOptions,
  };
};

export default useRoleOptions;
