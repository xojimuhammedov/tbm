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

// Komponentlarni import qilish
import OrderApplicationView1754 from "@/pages/rh-252/a-252/components/View/1754view.tsx";
import OrderApplicationView1745 from "@/pages/rh-252/a-252/components/View/1745view.tsx";
import OrderApplicationView1733 from "@/pages/rh-252/a-252/components/View/1733view.tsx"; // Yangi qo'shildi

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

    // 17-54 Modeli uchun
    if (model === "17_54_payloads") {
      return (
          <OrderApplicationView1754
              open={openView}
              onOpenChange={handleCloseView}
              document={currentItem}
          />
      );
    }

    // 17-45 Modeli uchun
    if (model === "17_45_payloads") {
      return (
          <OrderApplicationView1745
              open={openView}
              onOpenChange={handleCloseView}
              document={currentItem}
          />
      );
    }

    // 17-33 Modeli uchun (Yangi qo'shilgan qism)
    if (model === "17_33_payloads") {
      return (
          <OrderApplicationView1733
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