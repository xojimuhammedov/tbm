import { HTMLAttributes, memo, MouseEvent, useCallback } from "react";
import { cn } from "dgz-ui";
import { Copy } from "lucide-react";
import { useToast } from "@/shared/hooks/useToast.ts";
import { useTranslation } from "react-i18next";
import { MyTooltip } from "@/shared/components/atoms/tooltip";

type CopyTextProps = HTMLAttributes<HTMLDivElement> & {
  children?: string | number;
};

const CopyText = ({ className, children, ...props }: CopyTextProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCopy = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      if (children) {
        navigator.clipboard.writeText(`${children}`);
        toast({
          variant: "default",
          title: t("Copied"),
          description: children,
        });
      }
      e.preventDefault();
    },
    [children, t, toast],
  );

  return (
    <code
      {...props}
      onClick={(e) => e.stopPropagation()}
      className={cn("flex flex-wrap gap-1 [&_svg]:size-4", className)}
    >
      {children}
      {children && (
        <MyTooltip content={t("Copy text")}>
          <Copy className={"cursor-pointers"} onClick={handleCopy} />
        </MyTooltip>
      )}
    </code>
  );
};

export default memo(CopyText);
