import { CardDescription } from "dgz-ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "dgz-ui/dropdown";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Actions } from "@/shared/enums/Actions.ts";
import { EllipsisIcon } from "lucide-react";

type ItemCardDropdownProps = {
  id: string;
  onItemClick?: (id: string, type: string) => void;
};

const ItemCardDropdown = ({ onItemClick, id }: ItemCardDropdownProps) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"cursor-pointer"}>
        <CardDescription>
          <EllipsisIcon />
        </CardDescription>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"} side={"bottom"}>
        <DropdownMenuItem onClick={() => onItemClick?.(id, Actions.UPDATE)}>
          {t("Edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onItemClick?.(id, Actions.DELETE)}>
          {t("Delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(ItemCardDropdown);
