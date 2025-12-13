import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils/utils.ts";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      ref={ref}
      className={cn(
        "text-body-md-regular text-secondary hover:text-primary transition-colors",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export default BreadcrumbLink;
