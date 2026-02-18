import { FilterInterface } from "dgz-ui-shared/components/filters";

export const createChannelsIdFilters = (
  t: (key: string) => string
): FilterInterface[] => {
  return [
    {
      name: "consumer_name",
      label: t("Consumer"),
      placeholder: t("Enter consumer"),
    //   type: "input",
    },
  ];
};
