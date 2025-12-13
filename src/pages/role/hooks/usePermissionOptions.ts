import useLists from "@/shared/hooks/useLists.ts";
import { PERMISSION_QUERY_KEY } from "@/pages/role/constants/role.constants.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import { useMemo } from "react";
import { PermissionInterface } from "@/pages/role/interfaces/permission.interface.ts";

const usePermissionOptions = () => {
  const { query } = useLists<PermissionInterface>({
    url: [PERMISSION_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const permissionOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.name,
        value: item.value,
      })),
    [query.data],
  );

  return {
    permissionOptions,
  };
};

export default usePermissionOptions;
