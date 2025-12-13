import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Button } from "dgz-ui/button";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/shared/components/templates/title";
import { CirclePlusIcon } from "lucide-react";

type PolicyContainerHeaderProps = HTMLAttributes<HTMLDivElement> & {
  breadcrumbs?: BreadcrumbInterface[];
};

const PageContainerHeader = ({
  breadcrumbs = [],
  ...props
}: PolicyContainerHeaderProps) => {
  const { t } = useTranslation();

  return (
    <PageHeader {...props} breadcrumbs={breadcrumbs}>
      <Link to={"create"}>
        <Button size={"sm"}>
          <CirclePlusIcon />
          {t("Add new")}
        </Button>
      </Link>
    </PageHeader>
  );
};

export default PageContainerHeader;
