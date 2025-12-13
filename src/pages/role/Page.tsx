import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "../../shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, UserPlusIcon } from "lucide-react";
import { ROLE_QUERY_KEY } from "@/pages/role/constants/role.constants.ts";
import { RoleInterface } from "@/pages/role/interfaces/role.interface.ts";
import RoleForm from "@/pages/role/components/RoleForm.tsx";
import useRoles from "@/pages/role/hooks/useRoles.ts";

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
  } = useRoles();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Role"),
        path: "/roles",
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
            <span>{t("New role")}</span>
          </div>
        }
      >
        <RoleForm id={id} onSave={handleSave} />
      </MyModal>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>
      <PageWrapper>
        <DataTable<RoleInterface, PaginationInterface<RoleInterface>>
          tableKey={ROLE_QUERY_KEY}
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
