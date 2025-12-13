import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
// import { PageWrapper } from "@/shared/components/containers/page";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
// import { DataTable } from "dgz-ui-shared/components/datatable";
// import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
// import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";
import ApplicationDocumentView from "@/pages/gras/a-231/components/ApplicationDocumentView.tsx";
import useApplicationDocuments from "@/pages/gras/a-231/hooks/useApplicationDocuments.ts";
// import ListStatisticsCard from "@/shared/components/moleculas/card/ListStatisticsCard.tsx";

const Page = () => {
  const { t } = useTranslation();
  const {
    handleAdd,
    // loading,
    // dataSource,
    // columns,
    // params,
    // handleFilter,
    currentItem,
    handleCloseView,
    openView,
  } = useApplicationDocuments();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH 231"),
        path: "/gras",
        isActive: false,
      },
      {
        name: t("A application"),
        path: "/gras/a-231",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <ApplicationDocumentView
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
      {/* <PageWrapper>
        <DataTable<
          ApplicationDocumentInterface,
          PaginationInterface<ApplicationDocumentInterface>
        >
          tableKey={"application-documents"}
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
      </PageWrapper> */}
    </>
  );
};

export default Page;
