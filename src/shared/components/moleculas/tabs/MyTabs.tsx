import { Tabs, TabsList, TabsListProps, TabsTrigger } from "dgz-ui/tab";
import { TabsProps, TabsTriggerProps } from "@radix-ui/react-tabs";
import { Option } from "dgz-ui/form";
import { memo } from "react";

export type MyTabsProps = TabsProps & {
  tabs: Option[];
  listProps?: TabsListProps;
  triggerProps?: Omit<TabsTriggerProps, "value">;
};

const MyTabs = ({ tabs, listProps, triggerProps, ...props }: MyTabsProps) => {
  return (
    <Tabs {...props}>
      <TabsList {...(listProps || {})}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            {...(triggerProps || {})}
            value={`${tab.value}`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default memo(MyTabs);
