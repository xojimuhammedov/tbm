import { Option } from "dgz-ui/form";

const DEFAULT_LIMIT = 20;
const DEFAULT_CARD_ITEMS_LIMIT = 24;
const MAX_LIMIT = Number.MAX_SAFE_INTEGER;

const DEFAULT_CARD_ITEMS_LIMIT_OPTIONS: Option[] = [
  {
    value: 12,
    label: "12",
  },
  {
    value: 24,
    label: "24",
  },
  {
    value: 48,
    label: "48",
  },
  {
    value: 96,
    label: "96",
  },
];

const DEFAULT_PARAMS = {
  page: 1,
  limit: DEFAULT_LIMIT,
};

export {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  DEFAULT_PARAMS,
  DEFAULT_CARD_ITEMS_LIMIT,
  DEFAULT_CARD_ITEMS_LIMIT_OPTIONS,
};
