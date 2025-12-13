import { HTMLAttributes, memo, useState } from "react";
import { cn } from "dgz-ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type ShowPasswordProps = HTMLAttributes<HTMLDivElement> & {
  children?: string;
};
const ShowPassword = ({ children, className, ...props }: ShowPasswordProps) => {
  const [show, setShow] = useState(false);

  return children ? (
    <div {...props} className={cn("flex items-center gap-1", className)}>
      {show ? (
        <EyeOffIcon
          className={"size-4.5"}
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        />
      ) : (
        <EyeIcon
          className={"size-4.5"}
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
          }}
        />
      )}
      {show ? children : "********"}{" "}
    </div>
  ) : (
    <></>
  );
};

export default memo(ShowPassword) as typeof ShowPassword;
