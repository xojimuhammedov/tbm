import { MenuItemInterface } from "@/layouts/base/interfaces/menu-item.interface.ts";
import { cn } from "@/shared/utils/utils.ts";
import { Button } from "dgz-ui/button";
import { Link, LinkProps } from "react-router-dom";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { useIsMobile } from "@/shared/hooks/useMobile.ts";

type MyMenuProps = Omit<LinkProps, "to"> & {
  item: MenuItemInterface;
};

const MyMenuItem = ({ item, ...props }: MyMenuProps) => {
  const { menuOpen } = useMenuStore();
  const isMobile = useIsMobile();

  return (
    <Link {...props} to={item.url}>
      <MyTooltip
        show={menuOpen || isMobile}
        content={item.title}
        side={"right"}
      >
        <Button
          asChild
          variant={item.isActive ? "tertiary" : "ghost"}
          className={cn(
            "text-body-xs-medium [&>span]:text-secondary hover:[&>span]:text-primary [&>svg]:text-secondary justify-start rounded-md p-2 [&>svg]:size-5",
            item.isActive && "[&>span]:text-primary",
            (menuOpen || isMobile) && "h-9",
          )}
        >
          <div className={"flex w-full flex-nowrap gap-3"}>
            {item.icon && <item.icon />}
            {!(menuOpen || isMobile) && <span>{item.title}</span>}
          </div>
        </Button>
      </MyTooltip>
    </Link>
  );
};

export default MyMenuItem;
