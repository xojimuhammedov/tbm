import { FilterInterface } from "dgz-ui-shared/components/filters";

export const createFlowsFilters = (
  t: (key: string) => string
): FilterInterface[] => {
  return [
    {
      name: "status_filter",
      label: t("Status"),
      placeholder: t("Select status"),
      options: [
        { label: t("Active"), value: "active" },
        { label: t("Inactive"), value: "inactive" },
        { label: t("Inactive 3 years"), value: "inactive_3years" },
      ],
    },
    {
      name: "consumer",
      label: t("Consumer"),
      placeholder: t("Enter consumer"),
    //   type: "input",
    },
    {
      name: "point_a",
      label: t("Point A"),
      placeholder: t("Enter point A"),
    //   type: "input",
    },
    {
      name: "point_b",
      label: t("Point B"),
      placeholder: t("Enter point B"),
    //   type: "input",
    },
  ];
};
