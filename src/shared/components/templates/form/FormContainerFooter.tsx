import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/utils.ts";
import { Spin } from "@/shared/components/atoms/loading";
import { Button } from "dgz-ui/button";
import { useTranslation } from "react-i18next";

type FormContainerFooterProps = HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
  children?: ReactNode;
};

const FormContainerFooter = ({
  loading = false,
  className,
  children,
  ...props
}: FormContainerFooterProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={cn("flex justify-end gap-3 border-t pt-3", className)}
    >
      {children}
      <Button type="submit" className={"rounded-lg"} size={"sm"}>
        {loading && <Spin />} {t("Save", { ns: "common" })}
      </Button>
    </div>
  );
};

export default FormContainerFooter;
