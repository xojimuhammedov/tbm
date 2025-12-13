import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/layouts/base/components/sidebar.tsx";
import MySidebarHeader from "@/layouts/base/components/MySidebarHeader.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "dgz-ui/collapsible";
import useMySidebar from "@/layouts/base/hooks/useMySidebar.ts";
import { Link } from "react-router-dom";
import MySidebarFooter from "@/layouts/base/components/MySidebarFooter.tsx";
import useMenuStore from "@/shared/store/useMenuStore.ts";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { useIsMobile } from "@/shared/hooks/useMobile.ts";
import { ChevronRightIcon, FolderIcon } from "lucide-react";

const MySidebar = () => {
  const { groups } = useMySidebar();
  const { menuOpen } = useMenuStore();
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon">
      <MySidebarHeader />
      <SidebarContent>
        {groups.map(({ title, items }, index) => (
          <SidebarGroup key={index} className={"px-0"}>
            <SidebarGroupContent className={"space-y-2"}>
              {title
                ? menuOpen && (
                    <SidebarGroupLabel className={"text-secondary uppercase"}>
                      {title}
                    </SidebarGroupLabel>
                  )
                : Boolean(index) && (
                    <SidebarSeparator className={"bg-item-tertiary mx-0 h-1"} />
                  )}
              <SidebarMenu className={"px-2"}>
                {items.map((item, index) => (
                  <Collapsible
                    key={index}
                    asChild
                    defaultOpen={Boolean(item.isActive)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      {item.children ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              isActive={item.isActive}
                            >
                              {(item.icon && <item.icon />) ||
                                (!(menuOpen || isMobile) && <FolderIcon />)}
                              <span>{item.title}</span>
                              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children?.map((subItem, idx) => (
                                <SidebarMenuSubItem key={idx}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={subItem.isActive}
                                  >
                                    <div className={"flex items-center py-1"}>
                                      {subItem.icon && <subItem.icon />}
                                      <Link
                                        to={[item.url, subItem.url].join("/")}
                                      >
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </div>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : (
                        <MyTooltip
                          show={!(menuOpen || isMobile)}
                          side={"right"}
                          align={"end"}
                          content={<span>{item.title}</span>}
                        >
                          <SidebarMenuButton
                            className={"h-10"}
                            asChild
                            isActive={item.isActive}
                          >
                            <Link to={item.url}>
                              {(item.icon && <item.icon />) ||
                                (!(menuOpen || isMobile) && <FolderIcon />)}
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </MyTooltip>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <MySidebarFooter />
    </Sidebar>
  );
};
export default MySidebar;
