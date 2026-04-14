import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ExternalOutboundForm from "@/pages/tbp-documents/12-23 external outbound document/components/ExternalOutboundForm";

const Channels51FormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Resource Database"),
        path: "/",
        isActive: false,
      },
      {
        name: t("External outbound"),
        path: "/journals/exout-97",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id
          ? `/journals/exout-97/edit/${id}`
          : "/journals/exout-97/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <ExternalOutboundForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default Channels51FormPage;
