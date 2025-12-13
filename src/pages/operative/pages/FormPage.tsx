import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import OperativeDocumentForm from "@/pages/operative/components/OperativeForm.tsx";

const OperativeFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Operational work"),
        path: "operational-work",
        isActive: false,
      },
      {
        name: t("Operative document"),
        path: "operational-work",
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
        <OperativeDocumentForm
          id={id}
          onSave={() => navigate("/operational-work")}
          onCancel={() => navigate("/operational-work")}
        />
      </PageWrapper>
    </>
  );
};

export default OperativeFormPage;
