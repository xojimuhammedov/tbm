import { TranslationArgsType } from "dgz-ui-shared/types";
import { FilterInterface } from "dgz-ui-shared/components/filters";
import { createOptions } from "@/shared/utils/utils.ts";
import { StaffStatus } from "@/pages/staff/enums/StaffStatus.ts";

const createStaffFilters = (
  t: (...args: TranslationArgsType) => string,
): FilterInterface[] => [
  {
    name: "permission_group",
    label: t("Permission group"),
    isMulti: false,
    options: [],
  },
  {
    name: "status",
    label: t("Status"),
    isMulti: false,
    options: createOptions(StaffStatus, t),
  },
];

export default createStaffFilters;
