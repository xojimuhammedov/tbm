import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "../../shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import { DataTable } from "dgz-ui-shared/components/datatable";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import { CirclePlusIcon, User, UserPlusIcon } from "lucide-react";
import useStaffs from "@/pages/organizations/hooks/useOrganization.ts";
import StaffForm from "@/pages/organizations/components/StaffForm.tsx";
import { ORG_QUERY_KEY } from "@/pages/organizations/constants/org.constants.ts";
import { StaffInterface } from "@/pages/organizations/interfaces/org.interface.ts";

const Page = () => {
  const { t } = useTranslation();
  const {
    loading,
    columns,
    dataSource,
    filters,
    handleFilter,
    params,
    openForm,
    handleClose,
    handleAdd,
    handleSave,
    id,
    openView,
    viewId,
    handleCloseView,
  } = useStaffs();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Organizations"),
        path: "/organizations",
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
            <span>{t("New organization")}</span>
          </div>
        }
      >
        <StaffForm id={id} onSave={handleSave} />
      </MyModal>

      <MyModal
        open={openView}
        onOpenChange={handleCloseView}
        size={"2xl"}
        header={
          <div className={"flex items-center gap-2"}>
            <User className={"h-5 w-5"} />
            <span>{t("View organization")}</span>
          </div>
        }
      >
        <StaffForm id={viewId} readOnly />
      </MyModal>

      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs}>
        <Button size={"sm"} onClick={handleAdd}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </PageHeader>
      <PageWrapper>
        <DataTable<StaffInterface, PaginationInterface<StaffInterface>>
          tableKey={ORG_QUERY_KEY}
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
          filters={filters}
        />
      </PageWrapper>
    </>
  );
};

export default Page;
