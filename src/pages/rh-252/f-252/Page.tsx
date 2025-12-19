import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import KEYS from "@/shared/constants/keys";
import { FApplicationInterface } from "./interfaces/f-252.interface";
import useFApplication from "@/pages/rh-252/f-252/hooks/useFApplication.ts";
import FApplicationView from "@/pages/rh-252/f-252/components/FApplicationView.tsx";


const FApplicationPage = () => {
    const { t } = useTranslation();


    const {
        loading,
        columns,
        dataSource,
        handleFilter,
        params,
        handleAdd,
        openView,
        handleCloseView,
        currentItem
    } = useFApplication();

    const breadcrumbs = useMemo<BreadcrumbInterface[]>(
        () => [
            {
                name: t("RH-252"),
                path: "/rh-252",
                isActive: false,
            },
            {
                name: t("F Application"),
                path: "/rh-252/f-252",
                isActive: true,
            },
        ],
        [t],
    );

    return (
        <>
            <FApplicationView
                open={openView}
                onOpenChange={handleCloseView}
                document={currentItem}
            />

            <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
                <Button size={"sm"} onClick={handleAdd}>
                    <CirclePlusIcon className="mr-2 h-4 w-4" />
                    {t("Add new")}
                </Button>
            </PageHeader>

            <PageWrapper>
                <DataTable<
                        FApplicationInterface,
                        PaginationInterface<FApplicationInterface>
                    >
                    tableKey={KEYS.RH_F_Application}
                    hasNumbers
                    hasSearch
                    isStickyHeader
                    hasPagination
                    loading={loading}
                    params={params}
                    onParamChange={handleFilter}
                    rowKey={"_id"}
                    dataSource={dataSource}
                    dataKey={"docs"}
                    columns={columns}
                />
            </PageWrapper>
        </>
    );
};

export default FApplicationPage;