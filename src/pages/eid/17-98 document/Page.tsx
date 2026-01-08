import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UploadIcon } from "lucide-react";
import { CHANNELS_ID_QUERY_KEY } from "@/pages/channels-id/constants/channels.constants.ts";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";
import useChannels from "@/pages/eid/17-98 document/hooks/useChannels.ts";
import ImportChannelsModal from "./components/ImportChannelsModal";

const Page = () => {
  const { t } = useTranslation();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const { loading, columns, dataSource, handleFilter, params, handleAdd } =
    useChannels();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("EID-17-98"),
        path: "/eid-98",
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
        <DataTable<ChannelInterface, PaginationInterface<ChannelInterface>>
          tableKey={CHANNELS_ID_QUERY_KEY}
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

      <ImportChannelsModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
      />
    </>
  );
};

export default Page;
