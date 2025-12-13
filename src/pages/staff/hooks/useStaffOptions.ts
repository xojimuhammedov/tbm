import useLists from "@/shared/hooks/useLists.ts";
import { MAX_LIMIT } from "@/shared/constants/page.constants.ts";
import { useMemo } from "react";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";
import { STAFF_QUERY_KEY } from "@/pages/staff/constants/staff.constants.ts";

const useStaffOptions = () => {
  const { query } = useLists<StaffInterface>({
    url: [STAFF_QUERY_KEY],
    defaultParams: { page: 1, limit: MAX_LIMIT },
  });

  const staffOptions = useMemo(
    () =>
      query.data?.docs?.map((item) => ({
        label: `${item.second_name} ${item.first_name} ${item.middle_name}`,
        value: item._id,
      })),
    [query.data],
  );

  return {
    staffOptions,
  };
};

export default useStaffOptions;
