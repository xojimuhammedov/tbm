import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FilterInterface } from "dgz-ui-shared/components/filters";

export const useChannels53Filters = (): FilterInterface[] => {
    const { t } = useTranslation();

    return useMemo<FilterInterface[]>(
        () => [
            {
                name: "stream_consumer",
                label: t("Consumer"),
                placeholder: t("Enter consumer"),
                type: "input",
            },
            {
                name: "mux_belonging_site_a",
                label: t("Multiplexer A"),
                placeholder: t("Multiplexer A kiriting"),
                type: "input",
            },
            {
                name: "mux_belonging_site_b",
                label: t("Multiplexer B"),
                placeholder: t("Multiplexer B kiriting"),
                type: "input",
            },
        ],
        [t],
    );
};