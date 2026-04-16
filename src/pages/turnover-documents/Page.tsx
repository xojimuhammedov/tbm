
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import useTurnoverDocuments from "./hooks/useTurnoverDocuments";
import { TurnoverDocument } from "./interfaces/turnover.interface";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    params,
    dataSource,
    handleFilter,
    columns,
  } = useTurnoverDocuments();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      { name: t("Turnover documents"), path: "/turnover-documents", isActive: true },
    ],
    [t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />

      <PageWrapper>
        <DataTable<TurnoverDocument, PaginationInterface<TurnoverDocument>>
          tableKey={"turnover-documents"}
          hasNumbers
          hasSearch
          isStickyHeader
          loading={loading}
          hasPagination
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