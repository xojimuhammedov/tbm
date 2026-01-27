import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import useApplicationDocuments from "@/pages/rh-252/a-252/hooks/useApplicationDocuments.ts";
import { PageWrapper } from "@/shared/components/containers/page";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { OrderApplication } from "./interfaces/order.interface";
import OrderApplicationView1754 from "@/pages/rh-252/a-252/components/View/1754view.tsx";
import OrderApplicationView1745 from "@/pages/rh-252/a-252/components/View/1745view.tsx";
import OrderApplicationView1733 from "@/pages/rh-252/a-252/components/View/1733view.tsx";
import OrderApplicationView1770 from "@/pages/rh-252/a-252/components/View/1770view.tsx";
import EditCodeModal from "@/pages/rh-252/a-252/components/edit/OrderEdit.tsx";
import OrderView1748 from "@/pages/rh-252/a-252/components/View/1748view.tsx";
import OrderApplicationView1731 from "@/pages/rh-252/a-252/components/View/1731view.tsx";

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
      { name: t("RH 252"), path: "/rh-252", isActive: false },
      { name: t("A application"), path: "/rh-252/a-252", isActive: true },
    ],
    [t],
  );

  const renderOrderView = () => {
    if (!currentItem) return null;

    const model = currentItem.payload_model;
    if (model === "17_54_payloads") {
      return (
        <OrderApplicationView1754
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "17_45_payloads") {
      return (
        <OrderApplicationView1745
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "17_33_payloads") {
      return (
        <OrderApplicationView1733
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "17_70_payloads") {
      return (
        <OrderApplicationView1770
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "17_48_payloads") {
      return (
        <OrderView1748
          open={openView}
          onOpenChange={handleCloseView}
          document={currentItem}
        />
      );
    }
    if (model === "17_31_payloads") {
      return (
        <OrderApplicationView1731
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
          tableKey={"application-documents"}
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
