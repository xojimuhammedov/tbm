import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";
import ListStatisticsCard from "@/shared/components/moleculas/card/ListStatisticsCard.tsx";
import useInboxes from "@/pages/inbox/hooks/useInboxes.ts";
import InboxView from "@/pages/inbox/components/InboxView.tsx";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    dataSource,
    columns,
    params,
    handleFilter,
    currentItem,
    handleCloseView,
    openView,
  } = useInboxes();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Inboxes"),
        path: "/inbox",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <InboxView
        open={openView}
        onOpenChange={handleCloseView}
        document={currentItem}
      />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />

      <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3"}>
        <ListStatisticsCard title={t("Tasdiqlanganlar")} count={123} />
        <ListStatisticsCard title={t("Ko'rib chiqilmoqda")} count={123} />
        <ListStatisticsCard title={t("Rad etilganlar")} count={123} />
      </div>
      <PageWrapper>
        <DataTable<
          TelevisionDocumentInterface,
          PaginationInterface<TelevisionDocumentInterface>
        >
          tableKey={"television-documents"}
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
