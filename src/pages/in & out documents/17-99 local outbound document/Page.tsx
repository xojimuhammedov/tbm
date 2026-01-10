import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UploadIcon } from "lucide-react";
import useLocalOutbounds from "@/pages/in & out documents/17-99 local outbound document/hooks/useLocalOutbounds.ts";
import {
    LocalOutboundInterface
} from "@/pages/in & out documents/17-99 local outbound document/interfaces/local.outbound.interface.ts";
import {
    LOCAL_OUTBOUND_QUERY_KEY
} from "@/pages/in & out documents/17-99 local outbound document/constants/local.outbound.constants.ts";
import ImportLocalOutboundModal
    from "@/pages/in & out documents/17-99 local outbound document/components/ImportLocalOutboundModal.tsx";

const Page = () => {
  const { t } = useTranslation();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const { loading, columns, dataSource, handleFilter, params, handleAdd } =
      useLocalOutbounds();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("locout-17-99"),
        path: "/inout/locout-99",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <div className="flex items-center gap-2">
          <Button size={"sm"} onClick={() => setImportModalOpen(true)}>
            <UploadIcon className="size-4" />
            {t("Import")}
          </Button>

          <Button size={"sm"} onClick={handleAdd}>
            <CirclePlusIcon />
            {t("Add new")}
          </Button>
        </div>
      </PageHeader>

      <PageWrapper>
        <DataTable<LocalOutboundInterface, PaginationInterface<LocalOutboundInterface>>
          tableKey={LOCAL_OUTBOUND_QUERY_KEY}
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

      <ImportLocalOutboundModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
      />
    </>
  );
};

export default Page;
