import { ChevronsUpDown, Globe2 } from "lucide-react";

import { Button } from "dgz-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "dgz-ui/dropdown";
import { useTranslation } from "react-i18next";
import { Language } from "@/shared/enums/Language.ts";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { cn } from "@/shared/utils/utils.ts";

function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const { menuOpen } = useMenuStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={menuOpen ? "ghost" : "tertiary"}
          size={menuOpen ? "default" : "icon"}
          className={cn("p-0", !menuOpen && "size-8")}
        >
          {menuOpen ? (
            <>
              {i18n.language === Language.UZ && t("Uzbek")}
              {i18n.language === Language.EN && t("English")}
              {i18n.language === Language.RU && t("Russian")}
              <ChevronsUpDown className="ml-auto" />
            </>
          ) : (
            <Globe2 />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side={"right"} sideOffset={0}>
        <DropdownMenuItem onClick={() => i18n.changeLanguage(Language.UZ)}>
          {t("Uzbek")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage(Language.EN)}>
          {t("English")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage(Language.RU)}>
          {t("Russian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
