import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import ChannelForm from "@/pages/eid/17-96 document/components/ChannelForm.tsx";

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
        name: t("Channels ID"),
        path: "/eid/eid-96",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/eid/eid-96/${id}` : "/eid/eid-96/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <ChannelForm id={id || null} onSave={() => navigate("/channels-id")} />
      </PageWrapper>
    </>
  );
};

export default Eid_17_96_FormPage;
