import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react";



export function DialogDemo({ appointment }) {

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost">See more details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{appointment?.service_type_name || ""}</DialogTitle>
            
          </DialogHeader>

          <FieldSeparator/>


          {appointment?.service_type_name === "Hotel Service" && (
            <FieldGroup>
            <Field className='flex gap-4'>
              <Field className='flex flex-row'>
                <Field>
                  <Label htmlFor="name-1">Hotel Name</Label>
                  <Input id="name-1" name="name"  value={appointment?.hotel_name || ""}/>
                </Field>

                <Field>
                  <Label>Room Number</Label>
                  <Input value={appointment?.room_number || ""}/>
                </Field>
              </Field>

            <Field>
              <Label>Landmark:</Label>
              <Textarea value={appointment?.landmark || ""}/>
            </Field>
          </Field>

          </FieldGroup>
          )}


        


          {appointment?.service_type_name === "Home Service" && (
            <FieldGroup>
            <Field>
              <div className='flex gap-4'>
                <div>
                  <Label>House No.</Label>
                  <Input value={appointment?.house_number || ""}/>
                </div>

                <div>
                  <Label>Zone</Label>
                  <Input value={appointment?.zone || ""}/>
                </div>
              </div>
              

              <Label>Barangay</Label>
              <Input/>

              <div className='flex gap-4'>
                <div>
                  <Label>City / Municipality</Label>
                  <Input/>
                </div>

                <div>
                  <Label>Provice</Label>
                  <Input type="text" value="Camarines Sur"/>
                </div>
              </div>
            </Field>
          </FieldGroup>
          )}
          

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
