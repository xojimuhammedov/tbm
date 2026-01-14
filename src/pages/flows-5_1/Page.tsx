import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UploadIcon, Trash2Icon } from "lucide-react";
import { FLOWS_5_1_QUERY_KEY } from "@/pages/flows-5_1/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";
import useFlows from "@/pages/flows-5_1/hooks/useFlows.ts";
import ImportFlow_5_1_Modal from "@/pages/flows-5_1/components/ImportFlow_5_1_Modal.tsx";

const Page = () => {
    const { t } = useTranslation();
    const {
        loading,
        columns,
        dataSource,
        handleFilter,
        params,
        handleAdd,
        selectedRowKeys,
        handleDeleteMany
    } = useFlows();

    const [importModalOpen, setImportModalOpen] = useState(false);

    const breadcrumbs = useMemo<BreadcrumbInterface[]>(
        () => [
            {
                name: t("Flows(5_1)"),
                path: "/flows-5_1",
                isActive: true,
            },
        ],
        [t],
    );

    return (
        <>
            <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
                <div className="flex items-center gap-2">

                    <Button
                        size={"sm"}
                        variant="destructive"
                        onClick={handleDeleteMany}
                        disabled={selectedRowKeys.length === 0}
                        className="btn-delete"
                    >
                        <Trash2Icon className="size-4" />
                        {t("Delete")} ({selectedRowKeys.length})
                    </Button>

                    <Button size={"sm"} onClick={() => setImportModalOpen(true)}>
                        <UploadIcon className="size-4" />
                        {t("Import")}
                    </Button>

                    <Button size={"sm"} onClick={handleAdd}>
                        <CirclePlusIcon className="size-4" />
                        {t("Add new")}
                    </Button>
                </div>
            </PageHeader>

            <PageWrapper>
                <DataTable<FlowInterface, PaginationInterface<FlowInterface>>
                    tableKey={FLOWS_5_1_QUERY_KEY}
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

            <ImportFlow_5_1_Modal
                open={importModalOpen}
                onOpenChange={setImportModalOpen}
            />
        </>
    );
};

export default Page;