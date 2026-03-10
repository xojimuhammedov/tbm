import { PageWrapper } from "@/shared/components/containers/page";
import { DateRangeFilter } from "@/shared/components/templates/filters";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { BreadcrumbInterface } from "dgz-ui";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AgreementReviewModal } from "./components/AgreementReviewModal";
import useListSocket from "./hooks/useListSocket";
import { SharedItemInterface } from "./interfaces/shared.interface";
const AGREEMENT_DECREES_KEY = "agreement-decrees-list";

const Page = () => {
  const { t } = useTranslation();
  const { dataSource, loading, params, handleFilter, columns, filters, openView, setOpenView, currentItem, setCurrentItem } =
    useListSocket();

  console.log(dataSource);

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Kelishuv farmoyishlar", {
          defaultValue: "Kelishuv farmoyishlar",
        }),
        path: "/agreement-decrees",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <AgreementReviewModal
        open={openView}
        onClose={() => { setOpenView(false); setCurrentItem(null); }}
        currentItem={currentItem}
        sharedId={currentItem?.sharedId}
      />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
         <DateRangeFilter dateKey={AGREEMENT_DECREES_KEY} />
      </PageHeader>

      <PageWrapper>
        <DataTable<
          SharedItemInterface,
          PaginationInterface<SharedItemInterface>
        >
          tableKey={AGREEMENT_DECREES_KEY}
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
          filters={filters}
        />
      </PageWrapper>
    </>
  );
};

export default Page;
