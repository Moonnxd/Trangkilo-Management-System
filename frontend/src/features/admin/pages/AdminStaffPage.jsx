import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "../components/AdminSideBar"
import { ChartAreaInteractive } from "../components/ChartAreaInteractive"
import { DataTable } from "../components/staffs/StaffDataTable"
import { RolesDataTable } from "../components/staffs/RolesDataTable"
import { SectionCards } from "../components/SectionCards"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "../components/SiteHeader"
import { IconPlus } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { StaffTableCellViewer } from "../components/staffs/StaffTableCellViewer";
import { RolesTableCellViewer } from "../components/staffs/RolesTableCellViewer";
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { getStaffs } from "@/api/staffApi";
import { getRoles } from "@/api/roleApi";

function AdminStaffPage() {
    const [staffData, setStaffData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("view");
    const [selectedStaffId, setSelectedStaffId] = useState(null)
    const [selectedRoleId, setSelectedRoleId] = useState(null)

    useEffect(() => {
      fetchStaffs();
      fetchRoles();
    }, []);
  
    const fetchStaffs = async () => {
      try {
        const res = await getStaffs();
        setStaffData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoleData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <SidebarProvider style={styleObject}>
        <AdminSideBar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <Tabs defaultValue="staffsMember">
            <TabsList variant="line" className="flex justify-center sm:max-w-lg ml-4 mr-4 mt-4">
              <TabsTrigger value="staffsMember" className="px-6 py-2 text-base data-[state=active]:!text-primary">Staffs Management</TabsTrigger>
              <TabsTrigger value="rolesManagement" className="px-6 py-2 text-base data-[state=active]:!text-primary">Roles Management</TabsTrigger>
            </TabsList>

            {/* staffs management tab */}
            <TabsContent value="staffsMember">
              <Card className="ml-4 mr-4 mt-4 p-2 ">
                <CardHeader>
                    <span className="text-base font-semibold">Staffs</span>
                    <FieldDescription>
                        Manage your massage therapy Team.
                    </FieldDescription>
                </CardHeader>
                <Field orientation="horizontal" className="sm:max-w-lg ml-4">
                  <Input type="search" placeholder="Search by staff name, branch or role..." />
                  <Button>Search</Button>
                  <Button 
                    onClick={() => {
                      setMode("create")
                      setSelectedStaffId(null)
                      setOpen(true)
                    }}>
                      <IconPlus />Add Staff Member
                  </Button>
                </Field>
              </Card>
              <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                          <DataTable 
                            data={staffData}
                            onNameClick = {(item) => {
                              setMode("view")
                              setSelectedStaffId(item.staff_id)
                              setOpen(true)
                            }}  
                          />
                          <StaffTableCellViewer
                            open={open}
                            setOpen={setOpen}
                            mode={mode}
                            setMode={setMode}
                            staffId={selectedStaffId}
                            refreshData={fetchStaffs}
                          />
                      </div>
                  </div>
              </div>
            </TabsContent>

            {/* roles management tab */}
            <TabsContent value="rolesManagement">
              <Card className="ml-4 mr-4 mt-4 p-2 ">
                <CardHeader>
                  <span className="text-base font-semibold">Roles</span>
                  <FieldDescription>
                    Manage and organize system roles.
                  </FieldDescription>
                </CardHeader>
                <Field orientation="horizontal" className="sm:max-w-lg ml-4">
                  <Button 
                    onClick={() => {
                      setMode("create")
                      setSelectedRoleId(null)
                      setOpen(true)
                    }}>
                      <IconPlus />Add Roles
                  </Button>
                </Field>
              </Card>
              <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                          <RolesDataTable 
                            data={roleData}
                            onNameClick = {(item) => {
                              setMode("view")
                              setSelectedRoleId(item.role_id)
                              setOpen(true)
                            }}  
                          />
                          <RolesTableCellViewer
                            open={open}
                            setOpen={setOpen}
                            mode={mode}
                            setMode={setMode}
                            roleId={selectedRoleId}
                            refreshData={fetchRoles}
                          />
                      </div>
                  </div>
              </div>
            </TabsContent>
          </Tabs>
        </SidebarInset>
      </SidebarProvider>
    )
}

export default AdminStaffPage