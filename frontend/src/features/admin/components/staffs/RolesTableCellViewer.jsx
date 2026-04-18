import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/features/admin/components/DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import { validateRole } from "./RoleValidation";

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
import { getRoles, getRole, addRole, updateRole, deleteRole } from "@/api/roleApi"

export function RolesTableCellViewer({ 
  open,
  setOpen,
  mode,
  setMode,
  roleId,
  refreshData,
  }){
    const isMobile = useIsMobile()

    //open drawer then view details based on roleId
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
        // add new role
        if (mode === "create") {
          setDetails({
            role_name: "",
            description: "",
          })
          return
        }
  
        // view, edit, or delete role
        if (roleId) {
          try {
            const res = await getRole(roleId)
            setDetails(res.data)
          } catch (err) {
            console.error(err)
          }
        }
      }
  
      fetchData()
      
    }, [open, mode, roleId])

    //fetch roles data 
    const [roles, setRoles] = useState([]);

    useEffect(() => {
      fetchMeta();
    }, []);

    const fetchMeta = async () => {
      try {
        const [roleRes] = await Promise.all([
          getRoles(),
          getBranches(),
        ]);

        setRoles(roleRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    // update role details 
    const handleSave = async () => {
      if (!details) return;
    
      const validationErrors = validateRole(details);
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
          // CREATE NEW role
          await addRole(details);
          toast.success("role created successfully")
        } else {
          // UPDATE role
          await updateRole(roleId, details);
          toast.success("role updated successfully")
        }
    
        await refreshData();
    
        setOpen(false);
        setMode("view");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add role")
      } finally {
        setSaving(false);
      }
    };

    //Delete role
    const handleDelete = async () => {
      if (!roleId) return;
    
      try {
        setSaving(true);
    
        await deleteRole(roleId);
    
        toast.success("role deleted successfully");
    
        await refreshData();
    
        setOpen(false);
        setMode("view");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete role");
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
              ? "Add New role"
              : details
              ? `${details.role_name}`
              : "Loading..."
              }
            </DrawerTitle>
            <DrawerDescription>
              {mode === "create"
                ? "Fill in the details to add a new role."
                : mode === "edit"
                ? "Update the role information below."
                : "View role details."}
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
                        <AlertDialogTitle>Delete role?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this role record.
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
                <Field data-invalid={!!errors.role_name}>
                  <FieldLabel >Role Name</FieldLabel>
                  <Input  value={details?.role_name || ""} onChange={(e) => handleChange("role_name", e.target.value)} placeholder='Role Name'  disabled={!isEditable} />
                </Field>
              </div>
            </div>

            <div className="flex">
              <div className='mr-2 flex-auto'>
                <Field data-invalid={!!errors.description}>
                  <FieldLabel >Description</FieldLabel>
                  <Textarea value={details?.description || ""} placeholder='Description' onChange={(e) => handleChange("description", e.target.value)} disabled={!isEditable} />
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
                  <AlertDialogTitle>{ mode === "create" ? "Add new role?" : "Save Changes?"}</AlertDialogTitle>
            
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