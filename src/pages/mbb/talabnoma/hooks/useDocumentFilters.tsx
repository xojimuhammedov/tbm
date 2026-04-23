import { FilterInterface } from "dgz-ui-shared/components/filters";

export const createDocumentFilters = (
  t: (key: string) => string,
): FilterInterface[] => {
  return [
    {
      name: "search",
      label: t("Qidirish"),
      placeholder: t("Qidirish"),
    },
    {
      name: "status",
      label: t("Holat"),
      isMulti: false,
      options: [
        { value: "SIGNED", label: t("Imzolangan") },
        { value: "SIGNING", label: t("Imzolanmoqda") },
        { value: "CANCELLED", label: t("Bekor qilingan") },
        { value: "REJECTED", label: t("Rad etilgan") },
      ],
    },
    {
      name: "document_type",
      label: t("Hujjat turi"),
      isMulti: false,
      options: [
        { value: "REQUISITION", label: t("Talabnoma") },
        { value: "MEMO", label: t("3.3 Ma'lumotnoma") },
        { value: "DECLARATION", label: t("Bildirgi") },
        { value: "MEMO_3_3", label: t("3.3-T Ma'lumotnoma") },
      ],
    },
  ];
};
