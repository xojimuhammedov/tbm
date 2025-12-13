import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon } from "lucide-react";
import { FLOWS_ID_QUERY_KEY } from "@/pages/flows-id/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";
import useFlows from "@/pages/flows-id/hooks/useFlows.ts";

const Page = () => {
  const { t } = useTranslation();
  const { loading, columns, dataSource, handleFilter, params, handleAdd } =
    useFlows();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Flows ID"),
        path: "/flows-id",
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
        <DataTable<FlowInterface, PaginationInterface<FlowInterface>>
          tableKey={FLOWS_ID_QUERY_KEY}
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
