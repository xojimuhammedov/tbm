import { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/utils.ts";

type NarrowFormContainerProps = HTMLAttributes<HTMLDivElement> & {};

const NarrowFormContainer = ({
  className,
  ...props
}: NarrowFormContainerProps) => {
  return (
    <div
      {...props}
      className={cn("mx-auto grid max-w-2xl grid-cols-1 gap-4", className)}
    />
  );
};

export default NarrowFormContainer;
