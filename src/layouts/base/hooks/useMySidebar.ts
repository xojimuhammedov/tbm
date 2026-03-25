import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createSidebarGroups } from "@/layouts/base/helpers";
import useMenuActive from "@/shared/hooks/useMenuActive.ts";
import useUserStore from "@/shared/store/useUserStore.ts";
import { MenuItemInterface } from "@/layouts/base/interfaces/menu-item.interface.ts";

const useMySidebar = () => {
  const { t } = useTranslation();
  const { isActive } = useMenuActive();
  const { me } = useUserStore();

  const userRole = (((me as any)?.role?.name as string | undefined) ?? "")
    .toLowerCase()
    .trim();

  const groups = useMemo(() => {
    const defaultGroups = createSidebarGroups(t, isActive);
    
    if (!userRole) return defaultGroups;

    const filterItems = (items: MenuItemInterface[]): MenuItemInterface[] => {
      return items
        .filter((item) => {
          if (
            item.roles &&
            !item.roles.some((role) => role.toLowerCase().trim() === userRole)
          ) {
            return false;
          }
          return true;
        })
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: filterItems(item.children),
            };
          }
          return item;
        })
        .filter((item) => {
          // If it has children and they were all filtered out, and it's a parent menu without a direct valid URL
          if (item.children && item.children.length === 0) {
             return false;
          }
           return true;
        });
    };

    return defaultGroups
      .filter((group) => {
        if (
          group.roles &&
          !group.roles.some((role) => role.toLowerCase().trim() === userRole)
        ) {
          return false;
        }
        return true;
      })
      .map((group) => {
        return {
          ...group,
          items: filterItems(group.items),
        };
      })
      .filter((group) => group.items.length > 0);
  }, [t, isActive, userRole]);

  return {
    groups,
  };
};

export default useMySidebar;
