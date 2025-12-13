import { ScrollArea } from "@/shared/components/templates/scroll";
import { ComponentProps } from "react";
import { cn } from "@/shared/utils/utils.ts";

const PageWrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <ScrollArea
      {...props}
      className={cn(
        "relative flex max-h-full w-full flex-col overflow-auto p-4",
        className,
      )}
    />
  );
};

export default PageWrapper;
