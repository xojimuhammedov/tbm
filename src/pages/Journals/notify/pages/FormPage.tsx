import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import NotifyForm from "@/pages/Journals/notify/components/NotifyForm.tsx";

const NotifyFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      // {
      //   name: t("Resource Database"),
      //   path: "/",
      //   isActive: false,
      // },
      {
        name: t("Notify"),
        path: "journals/notify",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/journals/notify/${id}` : "/journals/notify/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <NotifyForm id={id || null} onSave={() => navigate(-1)} />
      </PageWrapper>
    </>
  );
};

export default NotifyFormPage;
