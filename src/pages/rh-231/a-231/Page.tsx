import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { PageWrapper } from "@/shared/components/containers/page";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { DataTable } from "dgz-ui-shared/components/datatable";
import ApplicationDocumentView from "./components/ApplicationDocumentView";
import {rh_231_Interface} from "@/pages/rh-231/a-231/interfaces/rh-231.interface.ts";
import useA231Documents from "@/pages/rh-231/a-231/hooks/useApplicationDocuments.ts";

const Page = () => {
  const { t } = useTranslation();
  const {
    handleAdd,
    loading,
    params,
    dataSource,
    handleFilter,
    columns,
    currentItem,
    handleCloseView,
    openView,
  } = useA231Documents();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH 231"),
        path: "/rh-231",
        isActive: false,
      },
      {
        name: t("A application"),
        path: "/rh-231/a-231",
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
      <PageWrapper>
        <DataTable<rh_231_Interface, PaginationInterface<rh_231_Interface>>
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
      </PageWrapper>
    </>
  );
};

export default Page;
