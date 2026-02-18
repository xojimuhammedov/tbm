import { FilterInterface } from "dgz-ui-shared/components/filters";

export const createFlows51Filters = (
  t: (key: string) => string,
): FilterInterface[] => {
  return [
    {
      name: "flow_id",
      label: t("Flow ID"),
      placeholder: t("Enter Flow ID"),
      //   type: "input",
    },
    {
      name: "consumer",
      label: t("Consumer"),
      placeholder: t("Enter consumer"),
      //   type: "input",
    },
  ];
};
