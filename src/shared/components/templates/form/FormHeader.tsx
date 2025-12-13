import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "dgz-ui/button";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/shared/components/templates/title";
import { ArrowLeftIcon } from "lucide-react";

type FormHeaderProps = HTMLAttributes<HTMLDivElement> & {
  breadcrumbs?: BreadcrumbInterface[];
};

const FormHeader = ({ breadcrumbs = [] }: FormHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button size={"sm"} onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
        {t("Back")}
      </Button>
    </PageHeader>
  );
};

export default FormHeader;
