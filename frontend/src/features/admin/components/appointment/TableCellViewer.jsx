import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { updateAppointment } from "@/api/appointmentApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import React, { useEffect, useState } from "react";

export function TableCellViewer({
  open,
  setOpen,
  mode,
  setMode,
  appointment,
  refreshData,
}) {
  const isMobile = useIsMobile();

  const [details, setDetails] = useState(null);
  const isEditable = mode === "edit" || mode === "create";
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!open) return;

    if (mode === "create") {
      setDetails({
        client_name: "",
        service: "",
        therapist: "",
        date: "",
        start_time: "",
        duration: "",
        price: "",
        status: "Pending",
      });
      return;
    }

    if (appointment) {
      setDetails(appointment);
    }
  }, [open, appointment, mode]);

  const handleSave = async () => {
    if (!details) return;

    try {
      setSaving(true);

      if (mode === "create") {
        await createAppointment(details);
        toast.success("Appointment created");
      } else {
        await updateAppointment(details.appointment_id, details);
        toast.success("Appointment updated");
      }

      await refreshData();
      setOpen(false);
      setMode("view");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await deleteAppointment(details.appointment_id);
      toast.success("Deleted");
      await refreshData();
      setOpen(false);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {mode === "create"
              ? "Add Appointment"
              : details
              ? details.client_name
              : "Loading..."}
          </DrawerTitle>

          <DrawerDescription>
            {mode === "create"
              ? "Create a new appointment"
              : mode === "edit"
              ? "Edit appointment"
              : "View appointment"}
          </DrawerDescription>

          {mode !== "create" && (
            <div className="flex">
              <Button variant="link" onClick={() => setMode("edit")}>
                <IconPencil /> Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="link" className="text-destructive">
                    <IconTrash /> Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          <Separator />
        </DrawerHeader>

        <div className="px-4 space-y-3">

          <Field>
            <FieldLabel>Client</FieldLabel>
            <Input
              value={details?.client_name || ""}
              onChange={(e) => handleChange("client_name", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Service</FieldLabel>
            <Input
              value={details?.service || ""}
              onChange={(e) => handleChange("service", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Therapist</FieldLabel>
            <Input
              value={details?.therapist || ""}
              onChange={(e) => handleChange("therapist", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={details?.date ? details.date.split("T")[0] : ""}
              onChange={(e) => handleChange("date", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Time</FieldLabel>
            <Input
              type="time"
              value={details?.start_time || ""}
              onChange={(e) => handleChange("start_time", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Duration</FieldLabel>
            <Input
              value={details?.duration || ""}
              onChange={(e) => handleChange("duration", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Price</FieldLabel>
            <Input
              value={details?.price || ""}
              onChange={(e) => handleChange("price", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <Input
              value={details?.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
              disabled={!isEditable}
            />
          </Field>

        </div>

        <DrawerFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={!isEditable || saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {mode === "create" ? "Add appointment?" : "Save changes?"}
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSave}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}