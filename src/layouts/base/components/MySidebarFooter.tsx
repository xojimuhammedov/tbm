import { SidebarFooter } from "@/layouts/base/components/sidebar.tsx";
import useUserStore from "@/shared/store/useUserStore.ts";
import { Avatar, AvatarFallback } from "dgz-ui/avatar";
import { Globe2, LogOut, MoonStar } from "lucide-react";
import { Button } from "dgz-ui/button";
import useLogin from "@/layouts/auth/hooks/useLogin.tsx";
import { useTranslation } from "react-i18next";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import LanguageSelector from "../../../shared/components/atoms/language/LanguageSelector.tsx";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { cn } from "@/shared/utils/utils.ts";
import { useIsMobile } from "@/shared/hooks/useMobile.ts";
import { ThemeToggle } from "dgz-ui-shared/components/theme";

const MySidebarFooter = () => {
  const { me } = useUserStore();
  const { logout } = useLogin();
  const { t } = useTranslation();
  const { menuOpen } = useMenuStore();
  const isMobile = useIsMobile();

  return (
    <SidebarFooter
      className={cn(
        "flex flex-col items-center justify-between px-4 py-3",
        !menuOpen && "p-3",
      )}
    >
      <div className={"flex w-full items-center justify-between"}>
        {(isMobile || menuOpen) && (
          <div className={"flex items-center gap-2"}>
            <Globe2 size={16} />
            <span className={"text-sm"}>{t("Language")}</span>
          </div>
        )}
        <LanguageSelector />
      </div>
      <div className={"flex w-full items-center justify-between"}>
        {(isMobile || menuOpen) && (
          <div className={"flex items-center gap-2"}>
            <MoonStar size={16} />
            <span className={"text-sm"}>{t("Theme switch")}</span>
          </div>
        )}
        <ThemeToggle className={cn(!menuOpen && "size-8 p-2")} />
      </div>
      <div
        className={cn(
          "flex w-full items-center justify-between border-t border-gray-300/30 pt-2",
          !(isMobile || menuOpen) && "flex-col-reverse gap-2",
        )}
      >
        <div className={"flex items-center gap-2"}>
          <MyTooltip
            show={!(isMobile || menuOpen)}
            side={"right"}
            align={"end"}
            content={
              <>
                <h5 className={"text-base font-semibold"}>{me?.first_name}</h5>
                <h6 className={"text-xs font-medium"}>{me?.role.name}</h6>
              </>
            }
          >
            <Avatar className={cn("rounded-lg border", !menuOpen && "h-7 w-7")}>
              <AvatarFallback>{me?.first_name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </MyTooltip>
          {(isMobile || menuOpen) && (
            <div>
              <h5 className={"text-sm font-semibold md:text-base"}>
                {me?.first_name}
              </h5>
              <h6 className={"text-xs font-medium"}>{me?.role.name}</h6>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-2",
            !(isMobile || menuOpen) && "flex-col gap-2",
          )}
        >
          <MyTooltip side={"right"} align={"end"} content={t("Logout")}>
            <Button
              asChild
              variant={"tertiary"}
              size={"icon"}
              className={cn("px-3", !menuOpen && "size-8 p-2")}
              onClick={() => logout()}
            >
              <LogOut size={18} />
            </Button>
          </MyTooltip>
        </div>
      </div>
    </SidebarFooter>
  );
};
export default MySidebarFooter;
