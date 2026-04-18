import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "../components/AdminSideBar"
import { ChartAreaInteractive } from "../components/ChartAreaInteractive"
import { BranchDataTable } from "../components/branches/BranchDataTable"
import { SectionCards } from "../components/SectionCards"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "../components/SiteHeader"
import { IconPlus } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { TableCellViewer } from "../components/branches/BranchTableCellViewer";
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

//axios
import { useEffect, useState } from "react";
import { getBranches } from "@/api/branchApi";

function AdminBranchesPage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("view");
    const [selectedBranchId, setSelectedBranchId] = useState(null)

    useEffect(() => {
      fetchBranches();
    }, []);
  
    const fetchBranches = async () => {
      try {
        const res = await getBranches();
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };


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
                    <Input type="search" placeholder="Search by Branch Name" />
                    <Button>Search</Button>
                    <Button 
                      onClick={() => {
                        setMode("create")
                        setSelectedBranchId(null)
                        setOpen(true)
                      }}>
                        <IconPlus />Add New Branch
                    </Button>
                    </Field>
                </Card>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <BranchDataTable 
                              data={data}
                              onNameClick = {(item) => {
                                setMode("view")
                                setSelectedBranchId(item.branch_id)
                                setOpen(true)
                              }}  
                            />
                            <TableCellViewer
                              open={open}
                              setOpen={setOpen}
                              mode={mode}
                              setMode={setMode}
                              branchId={selectedBranchId}
                              refreshData={fetchBranches}
                            />
                        </div>
                    </div>
                </div> 
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AdminBranchesPage