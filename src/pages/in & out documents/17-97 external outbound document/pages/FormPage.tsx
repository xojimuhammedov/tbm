import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ExternalOutboundForm from "@/pages/in & out documents/17-97 external outbound document/components/ExternalOutboundForm.tsx";

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
        path: "/inout/exout-97",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/inout/exout-97/edit/${id}` : "/inout/exout-97/create",
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
