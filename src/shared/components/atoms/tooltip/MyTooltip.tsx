import { Tooltip, TooltipContent, TooltipTrigger } from "dgz-ui/tooltip";
import { ReactNode } from "react";
import { TooltipContentProps } from "@radix-ui/react-tooltip";

type MyTooltipProps = Omit<TooltipContentProps, "content"> & {
  children: ReactNode;
  content: ReactNode;
  show?: boolean;
};

const MyTooltip = ({
  content,
  children,
  show = true,
  ...props
}: MyTooltipProps) => {
  return show ? (
    <Tooltip>
      <TooltipContent {...props}>{content}</TooltipContent>
      <TooltipTrigger>{children}</TooltipTrigger>
    </Tooltip>
  ) : (
    children
  );
};

export default MyTooltip;
