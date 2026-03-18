import EditCodeModal from "@/pages/tbp/hujjatlar/components/edit/OrderEdit.tsx";
import OrderView1212 from "@/pages/tbp/hujjatlar/components/View/1212view.tsx";
import OrderView1248 from "@/pages/tbp/hujjatlar/components/View/1248view.tsx";
import OrderApplicationView1214 from "@/pages/tbp/hujjatlar/components/View/1214view.tsx";
import useApplicationDocuments from "@/pages/tbp/hujjatlar/hooks/useApplicationDocuments.ts";
import { PageWrapper } from "@/shared/components/containers/page";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OrderApplication } from "./interfaces/order.interface";

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
    openEditCode,
    editCodeId,
    editCodeValue,
    handleCloseEditCode,
    handleEditCodeSuccess,
  } = useApplicationDocuments();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      { name: t("TBP"), path: "/tbp", isActive: false },
      { name: t("Hujjatlar"), path: "/tbp/hujjatlar", isActive: true },
    ],
    [t],
  );

  const renderOrderView = () => {
    if (!currentItem) return null;

    const model = currentItem.payload_model;
    if (model === "12_12_payloads") {
      return (
        <OrderView1212
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "12_14_payloads") {
      return (
        <OrderApplicationView1214
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "12_48_payloads") {
      return (
        <OrderView1248
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }

    return null;
  };

  return (
    <>
      {renderOrderView()}

      <EditCodeModal
        open={openEditCode}
        onOpenChange={handleCloseEditCode}
        documentId={editCodeId}
        currentCode={editCodeValue}
        onSuccess={handleEditCodeSuccess}
      />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>

      <PageWrapper>
        <DataTable<OrderApplication, PaginationInterface<OrderApplication>>
          tableKey={"application-documents-tbp"}
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
