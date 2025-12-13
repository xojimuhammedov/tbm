import { ComponentProps, memo } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { set } from "lodash";
import { cn } from "@/shared/utils/utils.ts";

export type ImagePlayerProps = ComponentProps<"img"> & {};

const ImageViewer = ({ className, ...props }: ImagePlayerProps) => {
  return (
    <div
      className={"shrink-0"}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Zoom>
        <img
          {...props}
          alt={""}
          className={cn("border-border-alpha-light border", className)}
          onError={($e) => set($e.target, "src", "/images/fallback.png")}
        />
      </Zoom>
    </div>
  );
};

export default memo(ImageViewer);
