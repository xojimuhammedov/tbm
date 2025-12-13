import { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/utils.ts";
import { Loader } from "@/shared/components/atoms/loading";

type PolicyContainerProps = HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
};

const PageContainer = ({
  loading = false,
  className,
  ...props
}: PolicyContainerProps) => {
  return !loading ? (
    <div
      {...props}
      className={cn(
        "grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3",
        className,
      )}
    />
  ) : (
    <Loader />
  );
};

export default PageContainer;
