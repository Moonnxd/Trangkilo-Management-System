import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";
import { updateAppointment, deleteAppointment } from "@/api/appointmentApi";
import { Label } from "@/components/ui/label"
import { DialogDemo } from "./DialogDemo"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

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
  if (!details?.appointment_id) {
    toast.error("No appointment selected");
    return;
  }

  try {
    setSaving(true);

    await deleteAppointment(details.appointment_id);

    toast.success("Deleted");
    await refreshData();
    setOpen(false);
  } catch (err) {
    console.error(err);
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
              ? `${details.client_first_name} ${details.client_last_name}`
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

          <Field className='flex flex-row'>
            <div className='w-40'>
              <FieldLabel>First Name</FieldLabel>
            <Input
              value={details?.client_first_name || ""}
              onChange={(e) => handleChange("client_first_name", e.target.value)}
              disabled={!isEditable}
            />
            </div>

            <div className="w-40">
              <FieldLabel>Last Name</FieldLabel>
            <Input
            value={details?.client_last_name || ""}
            onChange={(e) => handleChange("client_last_name", e.target.value)}
            disabled={!isEditable}></Input>
            </div>

            <div className="w-20">
              <FieldLabel>M.I</FieldLabel>
            <Input disabled={!isEditable}></Input>
            </div>
          </Field>

          <Field className='mt-10'>
            <FieldSeparator>Information</FieldSeparator>
          </Field>

          <div className="flex gap-2">
            <Field>
            <FieldLabel>Treatment</FieldLabel>
            <Input
              value={details?.service || ""}
              onChange={(e) => handleChange("service", e.target.value)}
              disabled={!isEditable}/>
              </Field>

              <Field>
                <FieldLabel>Pax</FieldLabel>
                <Input
                value={details?.pax}
                onChange={(e) => handleChange("pax", e.target.value)}/>
              </Field>
          </div>

          <div className='flex gap-2'>
          <Field>
            <FieldLabel>Therapist Type</FieldLabel>
                        
          <Select
            value={details?.therapist_type ?? "Any"}
            onValueChange={(value) => handleChange("therapist_type", value)}
          >
            <SelectTrigger disabled={!isEditable}>
              <SelectValue placeholder="" />
            </SelectTrigger>
                        
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </Field>
          

          <Field>
            <FieldLabel>Therapist</FieldLabel>

            <Select
              value={details?.therapist ?? "none"}
              onValueChange={(value) =>
                handleChange("therapist", value === "none" ? null : value)
              }>
              <SelectTrigger disabled={!isEditable}>
                <SelectValue placeholder="Select therapist" />
              </SelectTrigger>
            
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">No therapist</SelectItem>
            
                  {details?.therapist && (
                    <SelectItem value={details.therapist}>
                      {details.therapist}
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          </div>


          <div className="flex gap-2">
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
          </div>

          <div className="flex gap-2">
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
          </div>

        <Field>
          <FieldLabel>Status</FieldLabel>
                        
          <Select
            value={details?.status ?? "Pending"}
            onValueChange={(value) => handleChange("status", value)}
          >
            <SelectTrigger disabled={!isEditable}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
                        
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className='mt-10'>
          <FieldSeparator></FieldSeparator>
          </Field>

        <Field>
  <FieldLabel>Service Type</FieldLabel>
  <Select
    value={details?.service_type_name ?? "Branch Visit"}
    onValueChange={(value) => handleChange("service_type_name", value)}
  >
    <SelectTrigger disabled={!isEditable}>
      <SelectValue placeholder="Select service type" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectItem value="Branch Visit">Branch Visit</SelectItem>
        <SelectItem value="Home Service">Home Service</SelectItem>
        <SelectItem value="Hotel Service">Hotel Service</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>

  <div className='flex justify-end'>
    {(details?.service_type_name === "Hotel Service" || details?.service_type_name === "Home Service") && (
  <DialogDemo appointment={details}/>
)}
  </div>
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