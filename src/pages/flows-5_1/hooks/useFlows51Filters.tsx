import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FilterInterface } from "dgz-ui-shared/components/filters";

export const useFlows51Filters = (): FilterInterface[] => {
    const { t } = useTranslation();

    return useMemo<FilterInterface[]>(
        () => [
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
                name: "flow_id",
                label: t("Flow ID"),
                placeholder: t("Enter Flow ID"),
                type: "input",
            },
            {
                name: "consumer",
                label: t("Consumer"),
                placeholder: t("Enter consumer"),
                type: "input",
            },
        ],
        [t],
    );
};