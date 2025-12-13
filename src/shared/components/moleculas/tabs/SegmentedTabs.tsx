import { memo } from "react";
import MyTabs, {
  MyTabsProps,
} from "@/shared/components/moleculas/tabs/MyTabs.tsx";

const SegmentedTabs = ({
  tabs,
  listProps,
  triggerProps,
  ...props
}: MyTabsProps) => {
  return (
    <MyTabs
      listProps={{
        type: "segmented",
        scrollable: true,
      }}
      triggerProps={{ className: "h-10 text-body-sm-medium" }}
      {...props}
      tabs={tabs}
    />
  );
};

export default memo(SegmentedTabs);
