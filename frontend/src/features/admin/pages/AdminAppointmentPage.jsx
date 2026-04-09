import { useEffect, useState } from "react";
import { AdminSideBar } from "../components/AdminSideBar";
import { DataTable } from "@/features/admin/components/appointment/DataTable";
import { TableCellViewer } from "@/features/admin/components/appointment/TableCellViewer";
import { SiteHeader } from "../components/SiteHeader";
import { IconPlus } from "@tabler/icons-react";

import {
  Field,
} from "@/components/ui/field";

import {
  Card,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { getAppointments } from "@/api/appointmentApi";

const styleObject = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 12)",
};

function AdminAppointmentPage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("view");

  
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarProvider style={styleObject}>
      <AdminSideBar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <Card className="ml-4 mr-4 mt-4 p-2 ">
          <CardHeader>
            <span className="text-base font-semibold">Appointment</span>
          </CardHeader>

          <Field orientation="horizontal" className="sm:max-w-lg">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
            <Button>
              <IconPlus /> Add Appointment
            </Button>
          </Field>
        </Card>

        <div className="flex flex-col gap-4 py-4">
          <DataTable
            data={data}
            onNameClick={(row) => {
              setOpen(true);
              setMode("view");
              setSelectedAppointment(row);
            }}
          />
        </div>

        <TableCellViewer
          open={open}
          setOpen={setOpen}
          mode={mode}
          setMode={setMode}
          appointment={selectedAppointment}
          refreshData={fetchAppointments}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminAppointmentPage;