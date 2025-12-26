import {useTranslation} from "react-i18next";
import {useMemo, useState} from "react";
import {BreadcrumbInterface} from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import {PageWrapper} from "@/shared/components/containers/page";
import {DataTable} from "dgz-ui-shared/components/datatable";
import {PaginationInterface} from "@/shared/interfaces/pagination.interface.ts";
import {Button} from "dgz-ui/button";
import {CirclePlusIcon, UploadIcon} from "lucide-react";
import {FLOWS_ID_QUERY_KEY} from "@/pages/flows-id/constants/flows.constants.ts";
import {FlowInterface} from "@/pages/flows-id/interfaces/flow.interface.ts";
import useFlows from "@/pages/flows-id/hooks/useFlows.ts";
import ImportFlowModal from "./components/ImportFlowModal";
import {FilterInterface} from "dgz-ui-shared/components/filters";
import FlowView from "@/pages/flows-id/components/FlowIdView.tsx";

const Page = () => {
    const {t} = useTranslation();

    const {
        loading,
        columns,
        dataSource,
        handleFilter,
        params,
        handleAdd,
        openView,
        handleCloseView,
        currentItem,
    } = useFlows();

    const [importModalOpen, setImportModalOpen] = useState(false);

    const filters: FilterInterface[] = useMemo(
        () => [
            {
                name: "status_filter",
                label: t("Status"),
                placeholder: t("Select status"),
                options: [
                    {label: t("Active"), value: "active"},
                    {label: t("Inactive"), value: "inactive"},
                    {label: t("Inactive 3 years"), value: "inactive_3years"},
                ],
            },
        ],
        [t],
    );

    const breadcrumbs = useMemo<BreadcrumbInterface[]>(
        () => [
            {
                name: t("Flows ID"),
                path: "/flows-id",
                isActive: true,
            },
        ],
        [t],
    );

    return (
        <>
            <FlowView
                open={openView}
                onOpenChange={handleCloseView}
                document={currentItem}
            />
            <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
                <div className="flex items-center gap-2">
                    <Button size={"sm"} onClick={() => setImportModalOpen(true)}>
                        <UploadIcon className="size-4"/>
                        {t("Import")}
                    </Button>
                    <Button size={"sm"} onClick={handleAdd}>
                        <CirclePlusIcon/>
                        {t("Add new")}
                    </Button>
                </div>
            </PageHeader>

            <PageWrapper>
                <DataTable<FlowInterface, PaginationInterface<FlowInterface>>
                    tableKey={FLOWS_ID_QUERY_KEY}
                    hasNumbers
                    hasSearch
                    isStickyHeader
                    hasPagination
                    loading={loading}
                    params={params}
                    onParamChange={handleFilter}
                    filters={filters}
                    handleFilterChange={(filterParams) => {
                        handleFilter({...params, ...filterParams, page: 1});
                    }}
                    rowKey={"_id"}
                    dataSource={dataSource}
                    dataKey={"docs"}
                    columns={columns}
                />
            </PageWrapper>

            <ImportFlowModal
                open={importModalOpen}
                onOpenChange={setImportModalOpen}
            />
        </>
    );
};

export default Page;
