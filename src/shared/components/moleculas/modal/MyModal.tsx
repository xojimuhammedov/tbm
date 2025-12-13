import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "dgz-ui/dialog";
import type { DialogProps } from "@radix-ui/react-dialog";
import { cn } from "dgz-ui";

export type MyModalProps = DialogProps & {
  className?: string;
  header?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?:
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "80%"
    | "full";
};

export const MyModal = ({
  header,
  footer,
  trigger,
  children,
  className,
  size = "lg",
  ...props
}: MyModalProps) => {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          `data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2`,
          size === "xl" && "max-w-xl",
          size === "2xl" && "max-w-2xl",
          size === "3xl" && "max-w-3xl",
          size === "4xl" && "max-w-5xl",
          size === "5xl" && "max-w-5xl",
          size === "6xl" && "max-w-6xl",
          size === "7xl" && "max-w-7xl",
          size === "80%" && "max-w-[80%]",
          size === "8xl" && "max-w-[90%]",
          size === "full" && "max-w-[95%]",
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription className={"hidden"} />
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
