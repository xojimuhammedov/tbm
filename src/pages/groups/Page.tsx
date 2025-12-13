import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UsersRoundIcon } from "lucide-react";
import useGroups from "@/pages/groups/hooks/useGroups.ts";
import GroupForm from "@/pages/groups/components/GroupForm.tsx";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";
import { GROUPS_QUERY_KEY } from "@/pages/groups/constants/groups.constants.ts";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    params,
    handleFilter,
    openForm,
    handleClose,
    handleAdd,
    handleSave,
    id,
    openView,
    viewId,
    handleCloseView,
  } = useGroups();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Groups"),
        path: "/groups",
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
            <UsersRoundIcon className={"h-5 w-5"} />
            <span>{t("New group")}</span>
          </div>
        }
      >
        <GroupForm id={id} onSave={handleSave} />
      </MyModal>
      <MyModal
        open={openView}
        onOpenChange={handleCloseView}
        size={"2xl"}
        header={
          <div className={"flex items-center gap-2"}>
            <UsersRoundIcon className={"h-5 w-5"} />
            <span>{t("View group")}</span>
          </div>
        }
      >
        <GroupForm id={viewId} readOnly />
      </MyModal>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>
      <PageWrapper>
        <DataTable<GroupInterface, PaginationInterface<GroupInterface>>
          tableKey={GROUPS_QUERY_KEY}
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
