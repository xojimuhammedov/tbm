import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ExternalInboundForm from "@/pages/tbp-documents/12-22 external inbound document/components/ExternalInboundForm";

const Eid_17_96_FormPage = () => {
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
        name: t("12-22 external inbound"),
        path: "journals/exin-96",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/journals/exin-96/${id}` : "/journals/exin-96/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <ExternalInboundForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default Eid_17_96_FormPage;
