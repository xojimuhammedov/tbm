import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ChannelForm from "@/pages/channels-5_3/components/ChannelForm.tsx";

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
        name: t("Channels(5_3)"),
        path: "/channels-5_3",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/channels-5_3/edit/${id}` : "/channels-5_3/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <ChannelForm id={id || null} onSave={() => navigate("/channels-5_3")} />
      </PageWrapper>
    </>
  );
};

export default Channels51FormPage;
