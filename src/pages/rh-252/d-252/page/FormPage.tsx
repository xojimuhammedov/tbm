import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import RHDApplication from "../components/RH_D_Application";

const D_Application = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RTSI"),
        path: "rtsi",
        isActive: false,
      },
      {
        name: t("F-51 document"),
        path: "f-51",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `${id}/edit` : "create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
         <RHDApplication />
      </PageWrapper>
    </>
  );
};

export default D_Application;
