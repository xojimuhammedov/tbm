import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ChannelStatusForm from "../components/ChannelStatusForm";

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
        name: t("AI-7, AI-9 va AI-98 ijarasidagi aloqa kanal va oqimlarining holati bo‘yicha jurnali"),
        path: "/mbb/mbb-reg-documents/channel-status",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id
          ? `/mbb/mbb-reg-documents/channel-status/edit/${id}`
          : "/mbb/mbb-reg-documents/channel-status/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <ChannelStatusForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default FormPage;
