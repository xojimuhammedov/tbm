import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import useRTTSIDocuments from "@/pages/rttsi/hooks/useRTTSIDocuments.ts";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import RTTSIDocumentView from "@/pages/rttsi/components/RTTSIDocumentView.tsx";
import ListStatisticsCard from "@/shared/components/moleculas/card/ListStatisticsCard.tsx";

const Page = () => {
  const { t } = useTranslation();
  const {
    handleAdd,
    loading,
    dataSource,
    columns,
    params,
    handleFilter,
    currentItem,
    handleCloseView,
    openView,
  } = useRTTSIDocuments();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RTTSI"),
        path: "/rttsi",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <RTTSIDocumentView
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
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3"}>
        <ListStatisticsCard title={t("Tasdiqlanganlar")} count={123} />
        <ListStatisticsCard title={t("Ko'rib chiqilmoqda")} count={123} />
        <ListStatisticsCard title={t("Rad etilganlar")} count={123} />
      </div>
      <PageWrapper>
        <DataTable<
          RTTSIDocumentInterface,
          PaginationInterface<RTTSIDocumentInterface>
        >
          tableKey={"rttsi-documents"}
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
