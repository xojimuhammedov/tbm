import { ComponentProps, ReactNode } from "react";
import { MenuItemInterface } from "@/layouts/base/interfaces/menu-item.interface.ts";
import { cn } from "@/shared/utils/utils.ts";
import { ScrollArea } from "@/shared/components/templates/scroll";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { useIsMobile } from "@/shared/hooks/useMobile.ts";
import { Separator } from "dgz-ui/separator";
import MyMenuItem from "@/shared/components/templates/menu/MyMenuItem.tsx";

type MyMenuProps = ComponentProps<"div"> & {
  header?: ReactNode;
  items: MenuItemInterface[];
};

const MyMenu = ({ items = [], header, className, ...props }: MyMenuProps) => {
  const { menuOpen } = useMenuStore();
  const isMobile = useIsMobile();

  return (
    <div
      {...props}
      className={cn(
        "border-border-alpha-light flex h-full w-64 flex-col space-y-2 border-r p-3 transition-[width]",
        className,
        (menuOpen || isMobile) && "w-12 p-1.5",
      )}
    >
      {header && (
        <>
          <div className={"shrink-0"}>{header}</div>
          <Separator className={"bg-border-alpha-light"} />
        </>
      )}
      <ScrollArea className={"size-full shrink overflow-x-hidden"}>
        {items.map((item, index) => (
          <MyMenuItem key={index} item={item} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default MyMenu;
