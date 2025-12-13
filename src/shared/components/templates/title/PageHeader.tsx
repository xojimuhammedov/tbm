import { MyBreadcrumbProps } from "@/shared/components/moleculas/breadcrumb/MyBreadcrumb.tsx";
import { MyBreadcrumb } from "@/shared/components/moleculas/breadcrumb";
import { SidebarTrigger } from "@/layouts/base/components/sidebar.tsx";
import { cn, Separator } from "dgz-ui";
import { HTMLAttributes } from "react";

type PageHeaderProps = MyBreadcrumbProps & HTMLAttributes<HTMLDivElement>;

const PageHeader = ({
  breadcrumbs = [],
  className,
  children,
  ...props
}: PageHeaderProps) => {
  return (
    <div
      {...props}
      className={cn(
        "bg-bg border-border-alpha-light sticky top-0 z-10 flex min-h-16 shrink-0 flex-col justify-between gap-2 border-b p-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className={"flex items-center gap-2"}>
        <div className={"flex items-center gap-2"}>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <MyBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      {children}
    </div>
  );
};
export default PageHeader;
