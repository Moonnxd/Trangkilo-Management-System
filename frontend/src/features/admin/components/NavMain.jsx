import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom"

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        {/* Top Actions */}
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 active:bg-primary/90"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>

            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu> */}

        {/* Navigation Items */}
        {/* <SidebarMenu>
          {items.map((item) => {
            const IconComponent = item.icon;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
                  {IconComponent && <IconComponent />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu> */}

        <SidebarMenu>
          {items.map((item) => {
            const IconComponent = item.icon
            const location = useLocation()
            const navigate = useNavigate()

            const isActive = location.pathname === item.url

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => navigate(item.url)}
                  className={
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:bg-primary text-foreground"
                  }
                >
                  {IconComponent && <IconComponent />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  );
}