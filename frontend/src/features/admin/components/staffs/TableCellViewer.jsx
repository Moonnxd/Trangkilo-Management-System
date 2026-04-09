import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/features/admin/components/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"

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
import { getStaff, createStaff, updateStaff, deleteStaff } from "@/api/staffApi"
import { getRole } from "@/api/roleApi"
import { getBranch } from "@/api/branchApi";

export function TableCellViewer({ 
  open,
  setOpen,
  mode,
  setMode,
  staffId,
  refreshData,
  }){
    const isMobile = useIsMobile()

    //open drawer then view details based on staffId
    const [details, setDetails] = React.useState(null);
    const isEditable = mode === "edit" || mode === "create";
    const [saving, setSaving] = useState(false);

    const handleChange = (field, value) => {
      setDetails((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    React.useEffect(() => {
      if (!open) return
  
      const fetchData = async () => {
        // add new staff
        if (mode === "create") {
          setDetails({
            first_name: "",
            last_name: "",
            middle_initial: "",
            branch_id: "",
            role_id: "",
            contact_number: "",
            email: "",
            gender: "",
            date_hired: "",
            specialization: "",
            status: "Active",
            remarks: "",
          })
          return
        }
  
        // view, edit, or delete staff
        if (staffId) {
          try {
            const res = await getStaff(staffId)
            setDetails(res.data)
          } catch (err) {
            console.error(err)
          }
        }
      }
  
      fetchData()
    }, [open, mode, staffId])

    //fetch branches and roles data 
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
      fetchMeta();
    }, []);

    const fetchMeta = async () => {
      try {
        const [roleRes, branchRes] = await Promise.all([
          getRole(),
          getBranch(),
        ]);

        setRoles(roleRes.data);
        setBranches(branchRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    // update staff details 
    const handleSave = async () => {
      if (!details) return;
    
      try {
        setSaving(true);
    
        const formattedDetails = {
          ...details,
          date_hired: details.date_hired
            ? new Date(details.date_hired).toISOString().split("T")[0]
            : null,
        };
    
        if (mode === "create") {
          // CREATE NEW STAFF
          await createStaff(formattedDetails);
          toast.success("Staff created successfully")
        } else {
          // UPDATE STAFF
          await updateStaff(staffId, formattedDetails);
          toast.success("Staff updated successfully")
        }
    
        await refreshData();
    
        setOpen(false);
        setMode("view");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add staff")
      } finally {
        setSaving(false);
      }
    };

    //Delete Staff
    const handleDelete = async () => {
      if (!staffId) return;
    
      try {
        setSaving(true);
    
        await deleteStaff(staffId);
    
        toast.success("Staff deleted successfully");
    
        await refreshData();
    
        setOpen(false);
        setMode("view");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete staff");
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
              ? "Add New Staff"
              : details
              ? `${details.first_name} ${details.last_name}`
              : "Loading..."
              }
            </DrawerTitle>
            <DrawerDescription>
              {mode === "create"
                ? "Fill in the details to add a new staff member."
                : mode === "edit"
                ? "Update the staff information below."
                : "View staff details."}
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
                        <AlertDialogTitle>Delete Staff?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this staff record.
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
                <Field>
                  <FieldLabel >First Name</FieldLabel>
                  <Input value={details?.first_name || ""} onChange={(e) => handleChange("first_name", e.target.value)} placeholder='First Name'  disabled={!isEditable} />
                </Field>
              </div>
              <div className='w-40 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Last Name</FieldLabel>
                  <Input value={details?.last_name || ""} onChange={(e) => handleChange("last_name", e.target.value)} placeholder='Last Name'  disabled={!isEditable} />
                </Field>
              </div>
              <div className='w-25 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >M.I</FieldLabel>
                  <Input value={details?.middle_initial || ""} placeholder='M.I' onChange={(e) => handleChange("middle_initial", e.target.value)} disabled={!isEditable} />
                </Field>
              </div>
            </div>
  
            <div className="flex">
              <div className='w-50 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Branch Name</FieldLabel>
                  <Select value={details?.branch_id?.toString() || ""}
                    onValueChange={(value) =>
                      handleChange("branch_id", Number(value))
                    }>
                    <SelectTrigger disabled={!isEditable}>
                      <SelectValue placeholder={details?.branch_name || "Select branch"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {branches.map((b) => (
                          <SelectItem
                            key={b.branch_id}
                            value={b.branch_id.toString()}
                          >
                          {b.branch_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className='w-50 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Role</FieldLabel>
                  <Select
                    value={details?.role_id?.toString() || ""}
                    onValueChange={(value) =>
                      handleChange("role_id", Number(value))
                    }
                  >
                    <SelectTrigger disabled={!isEditable}>
                      <SelectValue placeholder={details?.role_name || "Select Role"} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {roles.map((r) => (
                          <SelectItem
                            key={r.role_id}
                            value={r.role_id.toString()}
                          >
                            {r.role_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
  
            <div className="flex">
              <div className='w-50 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Contact Number</FieldLabel>
                  <Input value={details?.contact_number || ""} placeholder='Contact Number' onChange={(e) => handleChange("contact_number", e.target.value)} disabled={!isEditable} />
                </Field>
              </div>
              <div className='w-50 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Email</FieldLabel>
                  <Input value={details?.email || ""} placeholder='Email' onChange={(e) => handleChange("email", e.target.value)} disabled={!isEditable}/>
                </Field>
              </div>
            </div>
  
            <div className="flex">
              <div className='w-50 mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Gender</FieldLabel>
                  <Select
                    value={details?.gender || ""}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger disabled={!isEditable}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className={!isEditable ? "pointer-events-none opacity-50" : ""}>
                <DatePicker value={details?.date_hired || ""} onChange={(value) => handleChange("date_hired", value)} />
              </div>
            </div>
  
            <div className="flex">
              <div className='mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Specialization</FieldLabel>
                  <Textarea value={details?.specialization || ""} placeholder='Specialization' onChange={(e) => handleChange("specialization", e.target.value)} disabled={!isEditable} />
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

            <div className="flex">
              <div className='mr-2 flex-auto'>
                <Field>
                  <FieldLabel >Remarks</FieldLabel>
                  <Textarea value={details?.remarks || ""} placeholder='Remarks' onChange={(e) => handleChange("remarks", e.target.value)} disabled={!isEditable} />
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
                  <AlertDialogTitle>{ mode === "create" ? "Add new staff?" : "Save Changes?"}</AlertDialogTitle>
            
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