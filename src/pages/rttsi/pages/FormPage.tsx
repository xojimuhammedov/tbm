import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import RTTSIDocumentForm from "@/pages/rttsi/components/RTTSIForm.tsx";

const RTTSIFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RTTSI"),
        path: "rttsi",
        isActive: false,
      },
      {
        name: t("RTTSI document"),
        path: "rttsi",
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
        <RTTSIDocumentForm
          id={id}
          onSave={() => navigate("/rttsi")}
          onCancel={() => navigate("/rttsi")}
        />
      </PageWrapper>
    </>
  );
};

export default RTTSIFormPage;
