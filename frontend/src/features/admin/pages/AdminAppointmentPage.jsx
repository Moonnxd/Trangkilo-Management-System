import { useEffect, useState, useRef, useCallback } from "react";
import { AdminSideBar } from "../components/AdminSideBar";
import { DataTable } from "@/features/admin/components/appointment/DataTable";
import { TableCellViewer } from "@/features/admin/components/appointment/TableCellViewer";
import { SiteHeader } from "../components/SiteHeader";
import { IconPlus } from "@tabler/icons-react";
import { AddAppointment } from "../components/appointment/AddAppointment";

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
  const intervalRef = useRef(null); 

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await getAppointments();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const startPolling = useCallback(() => {
    fetchAppointments();
    intervalRef.current = setInterval(fetchAppointments, 5000);
  }, [fetchAppointments]);

  const stopPolling = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      document.visibilityState === "hidden"
        ? stopPolling()
        : startPolling();
    };

    startPolling(); 
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startPolling, stopPolling]);

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
            <Button variant='outline'>Search</Button>
            <AddAppointment>
              <IconPlus /> Add Appointment
            </AddAppointment>
          </Field>
        </Card>

        <div className="flex flex-col gap-4 py-4">
          <DataTable
            data={data.slice().reverse()}
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

// Needs a fix on appointment list actions
// Conflicts on duplicates client name when action is done

export default AdminAppointmentPage;