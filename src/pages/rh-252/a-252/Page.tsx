import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import useApplicationDocuments from "@/pages/rh-252/a-252/hooks/useApplicationDocuments.ts";
import { PageWrapper } from "@/shared/components/containers/page";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { OrderApplication } from "./interfaces/order.interface";
import ApplicationDocumentView from "./components/ApplicationDocumentView";

const Page = () => {
    const { t } = useTranslation();
    const {
        handleAdd,
        loading,
        params,
        dataSource,
        handleFilter,
        columns,
        currentItem,
        handleCloseView,
        openView,
    } = useApplicationDocuments();

    const breadcrumbs = useMemo<BreadcrumbInterface[]>(
        () => [
            {
                name: t("RH 252"),
                path: "/rh-252",
                isActive: false,
            },
            {
                name: t("A application"),
                path: "/rh-252/a-252",
                isActive: true,
            },
        ],
        [t],
    );

    return (
        <>
            <ApplicationDocumentView
                open={openView}
                onOpenChange={handleCloseView}
                document={currentItem}
            />

            <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
                <Button size={"sm"} onClick={handleAdd}>
                    <CirclePlusIcon />
                    {t("Add new")}
                </Button>
            </PageHeader>
            <PageWrapper>
                <DataTable<OrderApplication, PaginationInterface<OrderApplication>>
                    tableKey={"application-documents"}
                    hasNumbers
                    hasSearch
                    isStickyHeader
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

export default Page;