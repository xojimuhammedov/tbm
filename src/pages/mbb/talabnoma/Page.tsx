import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import KEYS from "@/shared/constants/keys";
import { TalabnomaInterface } from "./interfaces/Talabnoma.interface";
import useTalabnoma from "@/pages/mbb/talabnoma/hooks/useTalabnoma.ts";
import TalabnomaDocumentView from "@/pages/mbb/talabnoma/components/TalabnomaDocumentView.tsx";

const TalabnomaPage = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    handleFilter,
    params,
    handleAdd,
    openView,
    handleCloseView,
    currentItem,
  } = useTalabnoma();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("MBB"),
        path: "/mbb/talabnoma",
        isActive: false,
      },
      {
        name: t("Talabnoma"),
        path: "/mbb/talabnoma",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <TalabnomaDocumentView
        open={openView}
        onOpenChange={handleCloseView}
        document={currentItem}
      />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {t("Add new")}
        </Button>
      </PageHeader>

      <PageWrapper>
        <DataTable<
          TalabnomaInterface,
          PaginationInterface<TalabnomaInterface>
        >
          tableKey={KEYS.MBB_Talabnoma}
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

export default TalabnomaPage;
