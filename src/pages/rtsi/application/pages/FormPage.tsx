import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ApplicationDocumentForm from "@/pages/rtsi/application/components/ApplicationForm.tsx";

const OperativeFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RTSI"),
        path: "rtsi",
        isActive: false,
      },
      {
        name: t("Application"),
        path: "application",
        isActive: false,
      },
      {
        name: t("Application document"),
        path: "application",
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
        <ApplicationDocumentForm
          id={id}
          onSave={() => navigate("/rtsi/application")}
          onCancel={() => navigate("/rtsi/application")}
        />
      </PageWrapper>
    </>
  );
};

export default OperativeFormPage;
