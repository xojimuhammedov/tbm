import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UploadIcon, Trash2Icon, Layers } from "lucide-react";
import useOutgoings from "@/pages/Journals/outgoing/hooks/useOutgoings.ts";
import { OutgoingInterface } from "@/pages/Journals/outgoing/interfaces/outgoing.interface.ts";
import { OUTGOING_QUERY_KEY } from "@/pages/Journals/outgoing/constants/outgoing.constants.ts";
import OutgoingModal from "@/pages/Journals/outgoing/components/ImportExternalInboundModal.tsx";

const Page = () => {
  const { t } = useTranslation();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const {
    loading,
    columns,
    dataSource,
    handleFilter,
    params,
    handleAdd,
    selectedRowKeys,
    handleDeleteMany,
    handleDeleteAll,
  } = useOutgoings();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Outgoing"),
        path: "/journals/outgoing",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <div className="flex items-center gap-2">
          <Button size={"sm"} variant="destructive" onClick={handleDeleteAll}>
            <Layers className="size-4" />
            {t("Delete all")}
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            size={"sm"}
            variant="destructive"
            onClick={handleDeleteMany}
          >
            <Trash2Icon className="size-4" />
            {t("O'chirish")}{" "}
            {selectedRowKeys.length > 0 && `(${selectedRowKeys.length})`}
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
        <DataTable<OutgoingInterface, PaginationInterface<OutgoingInterface>>
          tableKey={OUTGOING_QUERY_KEY}
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

      <OutgoingModal open={importModalOpen} onOpenChange={setImportModalOpen} />
    </>
  );
};

export default Page;
