import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import ListStatisticsCard from "@/shared/components/moleculas/card/ListStatisticsCard.tsx";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH-252"),
        path: "/rh-252",
        isActive: false,
      },
      {
        name: t("3_3 document"),
        path: "/rh-252/f-252",
        isActive: true,
      },
    ],
    [t],
  );

  const handleAdd = useCallback(() => {
    navigate("/rh-252/f-252/create");
  }, [navigate]);

  return (
    <>
      {/* <F51DocumentView
        open={openView}
        onOpenChange={handleCloseView}
        document={currentItem}
      /> */}
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>
      <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-3"}>
        <ListStatisticsCard title={t("Tasdiqlanganlar")} count={123} />
        <ListStatisticsCard title={t("Ko'rib chiqilmoqda")} count={123} />
        <ListStatisticsCard title={t("Rad etilganlar")} count={123} />
      </div>
      {/* <PageWrapper>
        <DataTable<
          F51DocumentInterface,
          PaginationInterface<F51DocumentInterface>
        >
          tableKey={"f51-documents"}
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
