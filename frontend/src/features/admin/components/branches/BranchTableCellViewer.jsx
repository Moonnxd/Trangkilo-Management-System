import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/features/admin/components/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import { validateBranch } from "./BranchValidation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
  } from "@/components/ui/drawer";
import React from "react";
import { useEffect, useState } from "react";

//import Api
import { getBranch, updateBranch, addBranch, deleteBranch } from "@/api/branchApi";

export function TableCellViewer({ 
  open,
  setOpen,
  mode,
  setMode,
  branchId,
  refreshData,
  }){
  const isMobile = useIsMobile()

  //open drawer then view details based on branchId
  const [details, setDetails] = React.useState(null);
  const [errors, setErrors] = useState({});
  const isEditable = mode === "edit" || mode === "create";
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setErrors({});
    }
  }, [open]);

  const handleChange = (field, value) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });

  };

  React.useEffect(() => {
    if (!open) return

    const fetchData = async () => {
      // add new branch
      if (mode === "create") {
        setDetails({
          branch_name: "",
          zone: "",
          barangay: "",
          city: "",
          province: "Camarines Sur",
          landmark: "",
          contact_number: "",
          email: "",
          opening_time: "",
          closing_time: "",
          status: "Active",
        })
        return
      }

      // view, edit, or delete branch
      if (branchId) {
        try {
          const res = await getBranch(branchId)
          setDetails(res.data)
          console.log("your are here", res.data)
        } catch (err) {
          console.error(err)
        }
      }
    }

    fetchData()
  }, [open, mode, branchId])

  //fetch branches data 
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchMeta();
  }, []);

  const fetchMeta = async () => {
    try {
      const [branchRes] = await Promise.all([
        getBranch(),
      ]);

      setBranches(branchRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // update branch details 
  const handleSave = async () => {
    if (!details) return;
  
    const validationErrors = validateBranch(details);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
  
      // show all errors in toast
      const errorMessages = Object.values(validationErrors);
  
      toast.error(
        <div>
          <strong>Please fix the following:</strong>
          <ul className="mt-2 list-disc pl-4 text-white-200">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>, {
          duration: 10000,
        }
        
      );
  
      return;
    }

    try {
      setSaving(true);
  
      if (mode === "create") {
        // ADD NEW BRANCH
        await addBranch(details);
        toast.success("Branch created successfully")
      } else {
        // UPDATE BRANCH
        await updateBranch(branchId, details);
        toast.success("Branch updated successfully")
      }
  
      await refreshData();
  
      setOpen(false);
      setMode("view");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add branch")
    } finally {
      setSaving(false);
    }
  };

  //Delete branch
  const handleDelete = async () => {
    if (!branchId) return;
  
    try {
      setSaving(true);
  
      await deleteBranch(branchId);
  
      toast.success("Branch deleted successfully");
  
      await refreshData();
  
      setOpen(false);
      setMode("view");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete branch");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
      <DrawerContent onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DrawerHeader>
          <DrawerTitle> 
            {mode === "create"
            ? "Add New Branch"
            : details
            ? `${details.branch_name}`
            : "Loading..."
            }
          </DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Fill in the details to add a new branch."
              : mode === "edit"
              ? "Update the branch information below."
              : "View Branch details."}
          </DrawerDescription>

          {mode !== "create" && (
            <div className={isMobile ? "flex justify-center" : "flex"}>
              <div>
                <Button variant="link" className="ml-0 mr-5" onClick={() => setMode("edit")}>
                  <IconPencil /> Edit Details
                </Button>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="text-destructive">
                      <IconTrash className="m-0" /> Delete
                    </Button>
                  </AlertDialogTrigger> 
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Branch?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this branch record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction disabled={saving} onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent> 
                </AlertDialog>
                
              </div>
            </div>
          )}
          
          <Separator orientation="horizontal" className="mt-2 mb-2" />
        </DrawerHeader>

        <div className="px-4 text-sm space-y-4">

          <div className="flex">
            <div className='w-40 mr-2 flex-auto'>
              <Field data-invalid={!!errors.branch_name}>
                <FieldLabel >Branch Name</FieldLabel>
                <Input  value={details?.branch_name || ""} onChange={(e) => handleChange("branch_name", e.target.value)} placeholder='Branch Name'  disabled={!isEditable} />
              </Field>
            </div>
          </div>

          <div className="flex">
            <div className='w-40 mr-2 flex-auto'>
              <Field data-invalid={!!errors.zone}>
                <FieldLabel >Zone</FieldLabel>
                <Input  value={details?.zone || ""} onChange={(e) => handleChange("zone", e.target.value)} placeholder='Zone'  disabled={!isEditable} />
              </Field>
            </div>
            <div className='w-40 mr-2 flex-auto'>
              <Field data-invalid={!!errors.barangay}>
                <FieldLabel >Barangay</FieldLabel>
                <Input  value={details?.barangay || ""} onChange={(e) => handleChange("barangay", e.target.value)} placeholder='Barangay'  disabled={!isEditable} />
              </Field>
            </div>
          </div>
         
          <div className="flex">
            <div className='w-40 mr-2 flex-auto'>
              <Field data-invalid={!!errors.city}>
                <FieldLabel >City</FieldLabel>
                <Input  value={details?.city || ""} onChange={(e) => handleChange("city", e.target.value)} placeholder='City'  disabled={!isEditable} />
              </Field>
            </div>
            <div className='w-40 mr-2 flex-auto'>
              <Field data-invalid={!!errors.province}>
                <FieldLabel >Province</FieldLabel>
                <Input  value={details?.province || "Camarines Sur"} onChange={(e) => handleChange("province", e.target.value)} placeholder='Province'  disabled={!isEditable} />
              </Field>
            </div>
          </div>

          <div className="flex">
            <div className='mr-2 flex-auto'>
              <Field>
                <FieldLabel >Landmark</FieldLabel>
                <Textarea value={details?.landmark || ""} placeholder='Landmark' onChange={(e) => handleChange("landmark", e.target.value)} disabled={!isEditable} />
              </Field>
            </div>
          </div>

          <div className="flex">
            <div className='w-50 mr-2 flex-auto'>
              <Field data-invalid={!!errors.contact_number}>
                <FieldLabel data-invalid={!!errors.contact_number}>Contact Number</FieldLabel>
                <Input value={details?.contact_number || ""} placeholder='Contact Number' onChange={(e) => handleChange("contact_number", e.target.value)} disabled={!isEditable} />
              </Field>
            </div>
            <div className='w-50 mr-2 flex-auto'>
              <Field data-invalid={!!errors?.email}>
                <FieldLabel >Email</FieldLabel>
                <Input type="email" value={details?.email || ""} placeholder='Email' onChange={(e) => handleChange("email", e.target.value)} disabled={!isEditable}/>
              </Field>
            </div>
          </div>

          <div className="flex">
            <div className='w-40 mr-2 flex-auto'>
                <Field data-invalid={!!errors.opening_time}>
                  <FieldLabel  >Opening Time</FieldLabel>
                  <Input type="time" value={details?.opening_time || "12:00:00"} onChange={(e) => handleChange("opening_time", e.target.value)} placeholder='Opening Time'  disabled={!isEditable} />
                </Field>
              </div>
              <div className='w-40 mr-2 flex-auto'>
                <Field data-invalid={!!errors.closing_time}>
                  <FieldLabel >Closing Time</FieldLabel>
                  <Input type="time" value={details?.closing_time || "00:00:00"} onChange={(e) => handleChange("closing_time", e.target.value)} placeholder='Closing Time'  disabled={!isEditable} />
                </Field>
              </div>
          </div>
          
          <div className="flex">
            <div className='w-50 mr-2 flex-auto'>
              <Field>
                <FieldLabel >Status</FieldLabel>
                <Select
                  value={details?.status || ""}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger disabled={!isEditable}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={!isEditable || saving}>{saving ?   "Saving.." : "Save"}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{ mode === "create" ? "Add new branch?" : "Save Changes?"}</AlertDialogTitle>
          
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSave}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => {
              setOpen(false);
              setMode("view");
            }} > Close
            </Button>
          </DrawerClose>
        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  )
}