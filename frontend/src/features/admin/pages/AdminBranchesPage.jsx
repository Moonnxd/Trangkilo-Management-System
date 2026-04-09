import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "../components/AdminSideBar"
import { ChartAreaInteractive } from "../components/ChartAreaInteractive"
import { DataTable } from "../components/staffs/StaffDataTable"
import { SectionCards } from "../components/SectionCards"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "../components/SiteHeader"
import { IconPlus } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { TableCellViewer } from "../components/staffs/TableCellViewer";
import { Textarea } from "@/components/ui/textarea"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import data from "../testdata/data.json"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  const styleObject = {
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
  }

function AdminBranchesPage() {
    return (

      <SidebarProvider style={styleObject}>
      <AdminSideBar variant="inset" />
      <SidebarInset>
          <SiteHeader />
          <Card className="ml-4 mr-4 mt-4 p-2 ">
              <CardHeader>
                  <span className="text-base font-semibold">Branches</span>
                  <FieldDescription>
                      Manage your branches details.
                  </FieldDescription>
              </CardHeader>
              <Field orientation="horizontal" className="sm:max-w-lg">
              <Input type="search" placeholder="Search..." />
              <Button>Search</Button>
              <Button >
                  <IconPlus />Add New Branch
              </Button>
              </Field>
          </Card>
          <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <DataTable data={data} />
                  <TableCellViewer />
                  </div>
              </div>
          </div> 
      </SidebarInset>
  </SidebarProvider>
    )
}

export default AdminBranchesPage