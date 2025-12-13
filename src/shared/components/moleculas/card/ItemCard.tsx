import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
} from "dgz-ui/card";

type PolicyCardProps = Omit<CardProps, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

const ItemCard = ({
  title,
  footer,
  children,
  description,
  ...props
}: PolicyCardProps) => {
  return (
    <Card {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && (
        <CardContent>
          <div className={"flex flex-col gap-3"}>{children}</div>
        </CardContent>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default ItemCard;
