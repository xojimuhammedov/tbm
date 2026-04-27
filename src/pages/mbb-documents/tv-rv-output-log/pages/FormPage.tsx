import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import TvRvOutputLogForm from "../components/TvRvOutputLogForm";

const FormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("MBB Reg Documents"),
        path: "/mbb/mbb-reg-documents",
        isActive: false,
      },
      {
        name: t("TV va RV chiqishlarining vaqtini qayd etish jurnali"),
        path: "/mbb/mbb-reg-documents/tv-rv-output-log",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id
          ? `/mbb/mbb-reg-documents/tv-rv-output-log/edit/${id}`
          : "/mbb/mbb-reg-documents/tv-rv-output-log/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <TvRvOutputLogForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default FormPage;
