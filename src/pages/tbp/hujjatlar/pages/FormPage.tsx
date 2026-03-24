import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ApplicationDocumentForm from "@/pages/tbp/hujjatlar/components/ApplicationForm.tsx";

const HujjatlarFormPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("TBP"),
        path: "/tbp",
        isActive: false,
      },
      {
        name: t("Hujjatlar"),
        path: "/tbp/hujjatlar",
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
        <ApplicationDocumentForm />
      </PageWrapper>
    </>
  );
};

export default HujjatlarFormPage;
