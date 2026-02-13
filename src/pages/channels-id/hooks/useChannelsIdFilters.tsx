import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FilterInterface } from "dgz-ui-shared/components/filters";

export const useChannelsIdFilters = (): FilterInterface[] => {
    const { t } = useTranslation();

    return useMemo<FilterInterface[]>(
        () => [
            {
                name: "consumer_name",
                label: t("Consumer"),
                placeholder: t("Enter consumer"),
                type: "input",
            },
        ],
        [t],
    );
};