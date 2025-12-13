import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import { CircleArrowLeftIcon, HouseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(123);
  return (
    <div className={"flex flex-col items-center justify-center gap-4"}>
      <h1 className={"text-headline-2xl-black"}>404</h1>
      <h2 className={"text-headline-lg-medium uppercase"}>
        {t("Page not found")}
      </h2>
      <div className={"flex gap-4"}>
        <Button variant={"tertiary"} onClick={() => navigate(-2)}>
          <CircleArrowLeftIcon /> {t("Back")}
        </Button>
        <Button variant={"tertiary"} onClick={() => navigate("/")}>
          <HouseIcon /> {t("Home page")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
