import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import InternalOutboundMbbForm from "../components/InternalOutboundMbbForm";

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
        name: t("Internal Outbound"),
        path: "/mbb/mbb-reg-documents/internal-outbound",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id
          ? `/mbb/mbb-reg-documents/internal-outbound/edit/${id}`
          : "/mbb/mbb-reg-documents/internal-outbound/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <InternalOutboundMbbForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default FormPage;
