import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, Trash2Icon, Layers } from "lucide-react";
import useInternalOutboundMbbList from "./hooks/useInternalOutboundMbbList";
import { INTERNAL_OUTBOUND_MBB_QUERY_KEY } from "./constants/internal-outbound-mbb.constants";
import { InternalOutboundMbbDocument } from "./interfaces/internal-outbound-mbb.interface";

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
    handleDeleteMany,
    handleDeleteAll,
  } = useInternalOutboundMbbList();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("MBB Reg Documents"),
        path: "/mbb/mbb-reg-documents",
        isActive: false,
      },
      {
        name: t("Chiqish hujjatlarini ro‘yxatga olish jurnali"),
        path: "/mbb/mbb-reg-documents/internal-outbound",
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
          <Button size={"sm"} onClick={handleAdd}>
            <CirclePlusIcon className="size-4" />
            {t("Add new")}
          </Button>
        </div>
      </PageHeader>

      <PageWrapper>
        <DataTable<
          InternalOutboundMbbDocument,
          PaginationInterface<InternalOutboundMbbDocument>
        >
          tableKey={INTERNAL_OUTBOUND_MBB_QUERY_KEY}
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

export default Page;
