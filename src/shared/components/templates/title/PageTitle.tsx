import { ReactNode } from "react";
import { MyBreadcrumbProps } from "@/shared/components/moleculas/breadcrumb/MyBreadcrumb.tsx";
import { MyBreadcrumb } from "@/shared/components/moleculas/breadcrumb";

type PageTitleProps = MyBreadcrumbProps & {
  children: ReactNode;
};

const PageTitle = ({ children, breadcrumbs = [] }: PageTitleProps) => {
  return (
    <>
      <h2 className={"text-xl"}>{children}</h2>
      <MyBreadcrumb breadcrumbs={breadcrumbs} />
    </>
  );
};
export default PageTitle;
