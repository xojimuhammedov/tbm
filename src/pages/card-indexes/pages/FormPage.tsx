import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { PageWrapper } from "@/shared/components/containers/page";
import CardIndexForm from "@/pages/card-indexes/components/CardIndexForm.tsx";

const CardIndexesFormPage = () => {
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
        name: t("Card index"),
        path: "/card-indexes",
        isActive: false,
      },
      {
        name: id ? t("Edit") : t("Create"),
        path: id ? `/card-indexes/edit/${id}` : "/card-indexes/create",
        isActive: true,
      },
    ],
    [id, t],
  );

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <CardIndexForm
          id={id || null}
          onSave={() => navigate("/card-indexes")}
        />
      </PageWrapper>
    </>
  );
};

export default CardIndexesFormPage;
