import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import TelevisionDocumentForm from "@/pages/television/components/TelevisionDocumentForm.tsx";

const TelevisionFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Television"),
        path: "television",
        isActive: false,
      },
      {
        name: t("Television document"),
        path: "television",
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
        <TelevisionDocumentForm
          id={id}
          onSave={() => navigate("/television")}
          onCancel={() => navigate("/television")}
        />
      </PageWrapper>
    </>
  );
};

export default TelevisionFormPage;
