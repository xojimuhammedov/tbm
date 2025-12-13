import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import F56DocumentForm from "@/pages/gras/d-231/components/F56DocumentForm.tsx";

const F56FormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RTSI"),
        path: "rtsi",
        isActive: false,
      },
      {
        name: t("F-56 document"),
        path: "f-56",
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
        <F56DocumentForm
          id={id}
          onSave={() => navigate("/rtsi/f-56")}
          onCancel={() => navigate("/rtsi/f-56")}
        />
      </PageWrapper>
    </>
  );
};

export default F56FormPage;
