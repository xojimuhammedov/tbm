import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UploadIcon, Trash2Icon,Layers   } from "lucide-react";
import { CHANNELS_5_3_QUERY_KEY } from "@/pages/channels-5_3/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";
import useChannels from "@/pages/channels-5_3/hooks/useChannels.ts";
import ChannelImport from "@/pages/channels-5_3/components/ChannelImport.tsx";
import {useChannels53Filters} from "@/pages/channels-5_3/hooks/useChannels53Filters.tsx";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    handleFilter,
    params,
    handleAdd,
    selectedRowKeys,
    handleDeleteMany,
    handleDeleteAll
  } = useChannels();

  const [importModalOpen, setImportModalOpen] = useState(false);
  const filters = useChannels53Filters();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Channels(5_3)"),
        path: "/channels-5_3",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <div className="flex items-center gap-2">
          <Button
              size={"sm"}
              variant="destructive"
              onClick={handleDeleteAll}
          >
            <Layers className="size-4" />
            {t("Delete all")}
          </Button>
          <Button
            size={"sm"}
            disabled={selectedRowKeys.length === 0}
            variant="destructive"
            onClick={handleDeleteMany}
          >
            <Trash2Icon className="size-4" />
            {t("Delete")} ({selectedRowKeys.length})
          </Button>

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
        <DataTable<ChannelInterface, PaginationInterface<ChannelInterface>>
          tableKey={CHANNELS_5_3_QUERY_KEY}
          hasNumbers
          hasSearch
          isStickyHeader
          hasPagination
          loading={loading}
          params={params}
          onParamChange={handleFilter}
          filters={filters}
          handleFilterChange={(filterParams) => {
            handleFilter({ ...params, ...filterParams, page: 1 });
          }}
          rowKey={"_id"}
          dataSource={dataSource}
          dataKey={"docs"}
          columns={columns}
        />
      </PageWrapper>
      <ChannelImport open={importModalOpen} onOpenChange={setImportModalOpen} />
    </>
  );
};

export default Page;
