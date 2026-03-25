import useLists from "@/shared/hooks/useLists.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import { useMemo } from "react";
import { StaffInterface } from "@/pages/organizations/interfaces/org.interface.ts";
import { ORG_QUERY_KEY } from "@/pages/organizations/constants/org.constants.ts";

const useOrganizationOptions = () => {
  const { query } = useLists<StaffInterface>({
    url: [ORG_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const staffOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [query.data],
  );

  return {
    staffOptions,
  };
};

export default useOrganizationOptions;
