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
import { Num3ApplicationInterface } from "./interfaces/Num3.interface";
import useNum3Application from "@/pages/rh-252/rh-3_3/hooks/useNum3Application.ts";
import BApplicationDocumentView from "@/pages/rh-252/rh-3_3/components/B-ApplicationDocumentView.tsx";

const Num3ApplicationPage = () => {
  const { t } = useTranslation();
  const { loading, columns, dataSource, handleFilter, params, handleAdd ,viewModalOpen,
      handleCloseView,
      selectedItem} =
    useNum3Application();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH-252"),
        path: "/rh-252",
        isActive: false,
      },
      {
        name: t("3.3 Application"),
        path: "/rh-252/3.3",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
        <BApplicationDocumentView
            open={viewModalOpen}
            onOpenChange={handleCloseView}
            document={selectedItem}
        />

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {t("Add new")}
        </Button>
      </PageHeader>
      <PageWrapper>
        <DataTable<
          Num3ApplicationInterface,
          PaginationInterface<Num3ApplicationInterface>
        >
          tableKey={KEYS.RH_D_Application}
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

export default Num3ApplicationPage;
