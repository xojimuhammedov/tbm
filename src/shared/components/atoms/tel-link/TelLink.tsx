import { HTMLAttributes, memo } from "react";
import { cn } from "dgz-ui";

type TelLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  children?: string | number;
};

const TelLink = ({ className, ...props }: TelLinkProps) => {
  return (
    <a
      {...props}
      onClick={(e) => e.stopPropagation()}
      className={cn("underline", className)}
      href={`tel:${props.children}`}
    />
  );
};

export default memo(TelLink);
