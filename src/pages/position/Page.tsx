import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { POSITION_QUERY_KEY } from "@/pages/position/constants/position.constants.ts";
import { PositionInterface } from "@/pages/position/interfaces/position.interface.ts";
import PositionForm from "@/pages/position/components/PositionForm.tsx";
import usePositions from "@/pages/position/hooks/usePositions.ts";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    handleFilter,
    params,
    openForm,
    handleClose,
    handleAdd,
    handleSave,
    id,
    handleDeleteMany,
    selectedRowKeys,
  } = usePositions();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Positions"),
        path: "/settings/positions",
        isActive: true,
      },
    ],
    [t],
  );

  return (
    <>
      <MyModal
        open={openForm}
        onOpenChange={handleClose}
        size={"2xl"}
        header={
          <div className={"flex items-center gap-2"}>
            <UserPlusIcon className={"h-5 w-5"} />
            <span>{id ? t("Edit position") : t("New position")}</span>
          </div>
        }
      >
        <PositionForm id={id} onSave={handleSave} />
      </MyModal>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <div className="flex items-center gap-2">
            <Button
              size={"sm"}
              variant="destructive"
              onClick={handleDeleteMany}
              className="btn-delete"
              disabled={selectedRowKeys.length === 0}
            >
              <Trash2Icon className="size-4" />
              {t("Delete")} ({selectedRowKeys.length})
            </Button>
          <Button size={"sm"} onClick={handleAdd}>
            <CirclePlusIcon className="size-4" />
            {t("Add new")}
          </Button>
        </div>
      </PageHeader>
      <PageWrapper>
        <DataTable<PositionInterface, PaginationInterface<PositionInterface>>
          tableKey={POSITION_QUERY_KEY}
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
