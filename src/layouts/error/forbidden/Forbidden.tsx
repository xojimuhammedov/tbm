import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "dgz-ui/button";
import { HouseIcon } from "lucide-react";

const Forbidden = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={"flex flex-col items-center justify-center gap-4"}>
      <h1 className={"text-headline-2xl-black"}>403</h1>
      <h2 className={"text-headline-lg-medium uppercase"}>
        {t("This page is forbidden")}
      </h2>
      <Button variant={"tertiary"} onClick={() => navigate("/")}>
        <HouseIcon /> {t("Home page")}
      </Button>
    </div>
  );
};

export default Forbidden;
