import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  
  export function NavSecondary({ items, ...props }) {
    return (
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              const IconComponent = item.icon;
  
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {IconComponent && <IconComponent />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }