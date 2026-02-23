import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ApplicationDocumentForm from "@/pages/rh-252/a-252/components/ApplicationForm.tsx";

const RH231AFormPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH-252"),
        path: "rh-252",
        isActive: false,
      },
      {
        name: t("Application"),
        path: "a-252",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `${id}/edit` : "create",
        isActive: true,
      },
        {
            name: t("E-imzo"),
            path: "rh-252/a-252/sign/:id",
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

export default RH231AFormPage;
