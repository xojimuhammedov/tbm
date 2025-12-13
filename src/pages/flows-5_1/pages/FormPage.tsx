import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import FlowForm from "@/pages/flows-5_1/components/FlowForm.tsx";

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
        name: t("Flows(5_1)"),
        path: "/flows-5_1",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/flows-5_1/edit/${id}` : "/flows-5_1/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <FlowForm id={id || null} onSave={() => navigate("/flows-5_1")} />
      </PageWrapper>
    </>
  );
};

export default Flows51FormPage;
