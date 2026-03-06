import { PageWrapper } from "@/shared/components/containers/page";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { BreadcrumbInterface } from "dgz-ui";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useListSocket from "./hooks/useListSocket";
import { SharedItemInterface } from "./interfaces/shared.interface";
const HUJJATLARN_IMZOLASH_KEY = "hujjatlarni-imzolash-list";

const Page = () => {
  const { t } = useTranslation();
  const { dataSource, loading, params, handleFilter, columns } =
    useListSocket();

  console.log(dataSource);

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Hujjatlarni imzolash", {
          defaultValue: "Hujjatlarni imzolash",
        }),
        path: "/hujjatlarni-imzolash",
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
          SharedItemInterface,
          PaginationInterface<SharedItemInterface>
        >
          tableKey={HUJJATLARN_IMZOLASH_KEY}
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
