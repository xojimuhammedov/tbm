import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/layouts/base/components/sidebar.tsx";
import { BellIcon } from "lucide-react";
import { config } from "@/shared/utils/config.ts";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { useTranslation } from "react-i18next";

const MySidebarHeader = () => {
  const { menuOpen } = useMenuStore();
  const { t } = useTranslation();

  return (
    <SidebarHeader
      className={
        "border-border-alpha-light flex h-16 flex-row items-center justify-between gap-3 border-b py-2"
      }
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2">
            {config.SIGNED && (
              <>
                <div className="aspect-auto items-center justify-center rounded-lg flex gap-3">
                  <img
                    className={"size-12"}
                    src={menuOpen ? config.APP.LOGO : config.APP.LOGO_MIN}
                    alt=""
                  />
                  {menuOpen && (
                    <span className={"text-headline-sm-bold"}>
                      {t("TBM docs")}
                    </span>
                  )}
                  {/*<img className={'max-h-14'} src={config.APP.LOGO} alt="" />*/}
                </div>
                {menuOpen && <BellIcon size={18} className="ml-auto" />}
              </>
            )}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
export default MySidebarHeader;
