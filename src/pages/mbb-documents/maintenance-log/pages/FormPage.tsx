import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import MaintenanceLogForm from "../components/MaintenanceLogForm";

const FormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      { name: t("MBB Reg Documents"), path: "/mbb/mbb-reg-documents", isActive: false },
      { name: t("Maintenance Log"), path: "/mbb/mbb-reg-documents/maintenance-log", isActive: false },
      { name: id ? t("Edit") : t("Create"), path: id ? `/mbb/mbb-reg-documents/maintenance-log/edit/${id}` : "/mbb/mbb-reg-documents/maintenance-log/create", isActive: true },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <MaintenanceLogForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default FormPage;
