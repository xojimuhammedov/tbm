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
import { MbbDocumentInterface } from "./interfaces/MbbDocument.interface";
import useMbbDocument from "@/pages/mbb/talabnoma/hooks/useMbbDocument.ts";
import MbbDocumentView from "@/pages/mbb/talabnoma/components/MbbDocumentView.tsx";
import { createDocumentFilters } from "./hooks/useDocumentFilters";

const TalabnomaPage = () => {
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
    currentItem,
  } = useMbbDocument();

  const filters = useMemo(() => createDocumentFilters(t), [t]);

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("MBB"),
        path: "/mbb/talabnoma",
        isActive: false,
      },
      {
        name: t("Hujjatlar"),
        path: "/mbb/talabnoma",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <MbbDocumentView
        open={openView}
        onOpenChange={handleCloseView}
        document={currentItem}
      />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <div className="flex items-center gap-2">
          <Button size={"sm"} onClick={handleAdd}>
            <CirclePlusIcon className="mr-2 h-4 w-4" />
            {t("Add new")}
          </Button>
        </div>
      </PageHeader>

      <PageWrapper>
        <DataTable<
          MbbDocumentInterface,
          PaginationInterface<MbbDocumentInterface>
        >
          tableKey={KEYS.MBB_Document}
          hasNumbers
          hasSearch
          isStickyHeader
          hasPagination
          loading={loading}
          params={params}
          onParamChange={handleFilter}
          filters={filters}
          rowKey={"_id"}
          dataSource={dataSource}
          dataKey={"docs"}
          columns={columns}
        />
      </PageWrapper>
    </>
  );
};

export default TalabnomaPage;
