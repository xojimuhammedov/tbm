import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createSidebarGroups } from "@/layouts/base/helpers";
import useMenuActive from "@/shared/hooks/useMenuActive.ts";

const useMySidebar = () => {
  const { t } = useTranslation();
  const { isActive } = useMenuActive();
  const groups = useMemo(() => createSidebarGroups(t, isActive), [t, isActive]);
  return {
    groups,
  };
};

export default useMySidebar;
