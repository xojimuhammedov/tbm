import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { CARD_INDEXES_QUERY_KEY } from "@/pages/card-indexes/constants/card-indexes.constants.ts";
import { CardIndexInterface } from "@/pages/card-indexes/interfaces/card-index.interface.ts";
import useCardIndexes from "@/pages/card-indexes/hooks/useCardIndexes.ts";

const Page = () => {
  const { t } = useTranslation();
  const { loading, columns, dataSource, handleFilter, params, handleAdd } =
    useCardIndexes();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Card index"),
        path: "/card-indexes",
        isActive: true,
      },
    ],
    [t],
  );
  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>
      <PageWrapper>
        <DataTable<CardIndexInterface, PaginationInterface<CardIndexInterface>>
          tableKey={CARD_INDEXES_QUERY_KEY}
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
