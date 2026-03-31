import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "./AdminSideBar"
import { ChartAreaInteractive } from "./ChartAreaInteractive"
import { DataTable } from "./DataTable"
import { SectionCards } from "./SectionCards"
import { SiteHeader } from "./SiteHeader"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import data from "../testdata/data.json"

const styleObject = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 12)",
}



export default function AdminLayout({ children }) {
  return (
    <SidebarProvider style={styleObject}>
      <AdminSideBar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}