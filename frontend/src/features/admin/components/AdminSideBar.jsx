"use client"

import * as React from "react"
import imgLogo from "@/assets/images/landingLogo.png";

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconChartPie,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLayoutDashboard,
  IconUserStar,
  IconCalendarClock,
  IconLogout
} from "@tabler/icons-react"

import { NavDocuments } from "./NavDocuments"
import { NavMain } from "./NavMain"
import { NavSecondary } from "./NavSecondary"
import { NavUser } from "./NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Jan Michael",
    role: "admin",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/admin/overview",
      icon: IconChartPie,
    },
    {
      title: "Appointments",
      url: "/admin/appointments",
      icon: IconCalendarClock,
    },
    {
      title: "Sales Report",
      url: "/admin/sales",
      icon: IconChartBar,
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: IconListDetails,
    },
    {
      title: "Customers",
      url: "/admin/customers",
      icon: IconUserStar,
    },
    {
      title: "Staffs",
      url: "/admin/staffs",
      icon: IconUsers,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconDatabase,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Logout",
      url: "#",
      icon: IconLogout,
    },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
  ],
}

export function AdminSideBar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center justify-center text-center gap-2">
            <img
              src={imgLogo}
              alt="Logo"
              className="w-24"
            />
            <span className="text-base font-semibold">Management System</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
