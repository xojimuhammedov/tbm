import { RefAttributes } from "react";
import { RemixiconComponentType } from "@remixicon/react";

export interface MenuItemInterface {
  title: string;
  url: string;
  icon?: RemixiconComponentType & RefAttributes<SVGSVGElement>;
  isActive?: boolean;
  access?: string[];
  children?: MenuItemInterface[];
}
