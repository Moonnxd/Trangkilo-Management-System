import { Button } from "@/components/ui/button"
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
import { useState, useEffect } from "react"
import { getTherapist } from "@/api/staffApi"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react";
import axios from "axios"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

export function AddAppointment() {
    const [therapists, setTherapists] = useState([])
  const [details, setDetails] = useState({
    therapist_type: "Any",
    therapist: "none",
    treatment: "",
  })

  const [services, setServices] = useState([])

useEffect(() => {
  axios.get("/services")
    .then((res) => {
      console.log("Services:", res.data) 
      setServices(res.data)
    })
    .catch((err) => console.error("Failed to fetch services", err))
}, [])

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    getTherapist()
      .then((res) => setTherapists(res.data))
      .catch((err) => console.error("Failed to fetch therapists", err))
  }, [])

  // Filter therapists by selected type
  const filteredTherapists = therapists.filter((t) => {
  if (details.therapist_type === "Any") return true
  return t.gender === details.therapist_type
})


  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <IconPlus/> Add Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add Appointment</DialogTitle>
          </DialogHeader>

            <FieldSeparator>Customer's Information</FieldSeparator>

          <FieldGroup>
            <Field className='grid grid-cols-4 gap-4'>
                <div className='col-span-4
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>First Name</Label>
                    <Input></Input>
                </div>

                <div className='col-span-4
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Middle Name</Label>
                    <Input></Input>
                </div>

                <div className='col-span-4
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Last Name</Label>
                    <Input></Input>
                </div>

                <div className='col-span-2
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Gender</Label>
                    <Input></Input>
                </div>

                <div className='col-span-2
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Contact Number</Label>
                    <Input></Input>
                </div>

                <div className='col-span-4
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Email</Label>
                    <Input></Input>
                </div>
            </Field>

            <FieldSeparator>Appointment Information</FieldSeparator>

            <Field className='grid grid-cols-4 gap-4'>
                <div className='col-span-3 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1'>
                    <Label>Treatment</Label>
                    <Combobox
                      items={services.map(s => s.service_name)}
                      onValueChange={(value) => {
                        const selected = services.find(s => s.service_name === value)
                        if (selected) handleChange("treatment", String(selected.services_id))
                      }}
                    >
                      <ComboboxInput
                        className="min-w-full"
                        placeholder="Search / Select"
                      />

                      <ComboboxContent>
                        <ComboboxEmpty>No treatment found.</ComboboxEmpty>
                  
                        <ComboboxList>
                          {(item) => {
                            const service = services.find(s => s.service_name === item)
                        
                            return (
                              <ComboboxItem className='!pointer-events-auto' key={item} value={item}>
                                <div className="flex flex-col">
                                  <span>{item}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {service?.service_category}
                                  </span>
                                </div>
                              </ComboboxItem>
                            )
                          }}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
</div>

                <div className='col-span-1
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Duration</Label>
                    <Input></Input>
                </div>

                <div className='col-span-2
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Time</Label>
                    <Input></Input>
                </div>

                <div>
                    <Label>Pax</Label>
                    <Input></Input>
                </div>

                <div className='col-span-2
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Therapist Type</Label>
                    <Select
                        value={details?.therapist_type ?? "Any"}
                        onValueChange={(value) => handleChange("therapist_type", value)}
                    >
                        <SelectTrigger className='min-w-full'>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                                    
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Any">Line Up</SelectItem>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='col-span-2
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1
                2xl:col-span-1'>
                    <Label>Therapist Name</Label>
                    <Select
                    value={details?.therapist}
                    onValueChange={(value) =>
                     handleChange("therapist", value === "none" ? null : value)}
                        >
                      <SelectTrigger className='min-w-full'>
                        <SelectValue placeholder="Select therapist" />
                      </SelectTrigger>
                    
                      <SelectContent>
                        <SelectGroup>
                          {/* <SelectItem value="none">No therapist</SelectItem> */}
                    
                        {filteredTherapists.map((t) => (
                          <SelectItem key={t.staff_id} value={String(t.staff_id)}>
                            {t.first_name} {t.last_name}
                          </SelectItem>
                        ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                </div>
            </Field>

            <Field  className='col-span-4
                sm:col-span-4
                md:col-span-1
                lg:col-span-1
                xl:col-span-1 xl:w-1/5
                2xl:col-span-1 2xl:w-1/5'>
                <Label>Service Type</Label>
                <Select defaultValue="Branch Visit">
                    <SelectTrigger>
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
            </Field>

            <Field>
                <Label>Total: 0.00</Label>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
