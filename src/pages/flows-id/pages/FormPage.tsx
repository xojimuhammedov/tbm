import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import FlowForm from "@/pages/flows-id/components/FlowForm.tsx";

const Flows51FormPage = () => {
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
        name: t("Flows ID"),
        path: "/flows-id",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/flows-id/edit/${id}` : "/flows-id/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <FlowForm id={id || null} onSave={() => navigate("/flows-id")} />
      </PageWrapper>
    </>
  );
};

export default Flows51FormPage;
