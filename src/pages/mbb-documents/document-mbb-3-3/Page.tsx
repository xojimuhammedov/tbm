import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import useDocumentMbb33List from "./hooks/useDocumentMbb33List";
import { DOCUMENT_MBB_3_3_QUERY_KEY } from "./constants/document-mbb-3-3.constants";
import { DocumentMbb33 } from "./interfaces/document-mbb-3-3.interface";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    handleFilter,
    params,
  } = useDocumentMbb33List();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("MBB Reg Documents"),
        path: "/mbb/mbb-reg-documents",
        isActive: false,
      },
      {
        name: t("3.3-ma'lumotnoma"),
        path: "/mbb/mbb-reg-documents/document-mbb-3-3",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />

      <PageWrapper>
        <DataTable<
          DocumentMbb33,
          PaginationInterface<DocumentMbb33>
        >
          tableKey={DOCUMENT_MBB_3_3_QUERY_KEY}
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
