import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "../components/AdminSideBar"
import { ChartAreaInteractive } from "../components/ChartAreaInteractive"
import { SalesDataTable } from "../components/salesReport/SalesDataTable"
import { SalesSectionCards } from "../components/salesReport/SalesSectionCards"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "../components/SiteHeader"
import { IconDownload } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { SalesTableCellViewer } from "../components/salesReport/SalesTableCellViewer";
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from '@/features/admin/components/salesReport/DatePicker'
import { NativeSelectDemo } from "../components/salesReport/NativeSelectDemo"
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
import { getBranchSalesSummary} from "@/api/branchApi";

function AdminSalesReportPage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("view");
    const [selectedBranchId, setSelectedBranchId] = useState(null)

    useEffect(() => {
      fetchBranches();
    }, []);
  
    const fetchBranches = async () => {
      try {
        const res = await getBranchSalesSummary();
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
                  <span className="text-base font-semibold">Sales Management</span>
                  <FieldDescription>
                    Manage sales transactions, update payment statuses, and track overall performance across all branches.
                  </FieldDescription>
              </CardHeader>
          </Card>
          <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
                      {/* <SalesSectionCards /> */}
                      <Card className="ml-4 mr-4 p-2 mb-0 ">
                        <CardHeader>
                            <span className="text-base font-semibold">Detailed Sales Data</span>                            
                        </CardHeader>
                        <Field orientation="horizontal" className="sm:w-fit">
                          <NativeSelectDemo />
                          <DatePicker />
                          <Button 
                            onClick={() => {
                              setMode("create")
                              setSelectedBranchId(null)
                              setOpen(true)
                            }}>
                              <IconDownload />Download Reports
                          </Button>
                        </Field>
                        <SalesDataTable 
                          data={data}
                          onNameClick = {(item) => {
                          setMode("view")
                          setSelectedBranchId(item.branch_id)
                          setOpen(true)
                        }}  
                      />
                      <SalesTableCellViewer
                        open={open}
                        setOpen={setOpen}
                        mode={mode}
                        setMode={setMode}
                        branchId={selectedBranchId}
                        refreshData={fetchBranches}
                      />
                    </Card>                      
                  </div>
              </div>
          </div> 
        </SidebarInset>
      </SidebarProvider>
    )
}

export default AdminSalesReportPage