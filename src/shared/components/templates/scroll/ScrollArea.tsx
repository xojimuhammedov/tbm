import { cn } from "@/shared/utils/utils.ts";
import { ComponentProps } from "react";

const ScrollArea = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto",
        className,
      )}
    />
  );
};

export default ScrollArea;
