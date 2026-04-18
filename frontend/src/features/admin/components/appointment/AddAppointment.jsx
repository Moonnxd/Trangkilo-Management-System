// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { useState, useEffect } from "react"
// import { getTherapist } from "@/api/staffApi"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup
// } from "@/components/ui/select"

// import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { IconPlus } from "@tabler/icons-react";
// import axios from "axios"

// import {
//   Combobox,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxList,
// } from "@/components/ui/combobox"

// export function AddAppointment() {
//   const [serviceType, setServiceType] = useState("Branch Visit")

//   const isHome = serviceType === "Home Service"
// const isHotel = serviceType === "Hotel Service"
// const isBranch = serviceType === "Branch Visit"

//     const [therapists, setTherapists] = useState([])
//   const [details, setDetails] = useState({
//     therapist_type: "Any",
//     therapist: "none",
//     treatment: "",
//     duration: "",
//   })

//   const [services, setServices] = useState([])

// useEffect(() => {
//   axios.get("/services")
//     .then((res) => {
//       console.log("Services:", res.data) 
//       setServices(res.data)
//     })
//     .catch((err) => console.error("Failed to fetch services", err))
// }, [])

//   const handleChange = (field, value) => {
//     setDetails((prev) => ({ ...prev, [field]: value }))
//   }

//   useEffect(() => {
//     getTherapist()
//       .then((res) => setTherapists(res.data))
//       .catch((err) => console.error("Failed to fetch therapists", err))
//   }, [])

//   // Filter therapists by selected type
//   const filteredTherapists = therapists.filter((t) => {
//   if (details.therapist_type === "Any") return true
//   return t.gender === details.therapist_type
// })

// const numericOnly = (value) => value.replace(/\D/g, "")


//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button>
//             <IconPlus/> Add Appointment
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Add Appointment</DialogTitle>
//           </DialogHeader>

//             <FieldSeparator>Customer's Information</FieldSeparator>

//           <FieldGroup>
//             <Field className='grid grid-cols-4 gap-4'>
//                 <div className='col-span-4
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>First Name</Label>
//                     <Input></Input>
//                 </div>

//                 <div className='col-span-4
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Middle Name</Label>
//                     <Input></Input>
//                 </div>

//                 <div className='col-span-4
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Last Name</Label>
//                     <Input></Input>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Gender</Label>
//                     <Select>
//                         <SelectTrigger className='min-w-full'>
//                             <SelectValue placeholder="Select gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectItem value="Male">Male</SelectItem>
//                                 <SelectItem value="Female">Female</SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Contact Number</Label>
//                     <Input></Input>
//                 </div>

//                 <div className='col-span-4
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Email</Label>
//                     <Input></Input>
//                 </div>
//             </Field>

//             <FieldSeparator>Appointment Information</FieldSeparator>

//             <Field className='grid grid-cols-6 gap-4'>
//                 <div className='col-span-3
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-2'>
//                     <Label>Treatment</Label>
//                     <Combobox
//                       items={services.map(s => s.service_name)}
//                       onValueChange={(value) => {
//                       const selected = services.find(s => s.service_name === value)
//                       if (selected) {
//                         handleChange("treatment", String(selected.services_id))
//                         handleChange("duration", selected.duration_minutes)  // this is missing
//                       }
//                     }}
//                     >
//                       <ComboboxInput
//                         className="min-w-full"
//                         placeholder="Search / Select"
//                       />

//                       <ComboboxContent>
//                         <ComboboxEmpty>No treatment found.</ComboboxEmpty>
                  
//                         <ComboboxList>
//                           {(item) => {
//                             const service = services.find(s => s.service_name === item)
                        
//                             return (
//                               <ComboboxItem className='!pointer-events-auto' key={item} value={item}>
//                                 <div className="flex flex-col">
//                                   <span>{item}</span>
//                                   <span className="text-xs text-muted-foreground">
//                                     {service?.service_category}
//                                   </span>
//                                 </div>
//                               </ComboboxItem>
//                             )
//                           }}
//                         </ComboboxList>
//                       </ComboboxContent>
//                     </Combobox>
//                 </div>

//                 <div className='col-span-1
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Duration</Label>
//                     <Input value={details.duration} readOnly ></Input>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Date</Label>
//                     <Input type='date'></Input>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-1'>
//                     <Label>Time</Label>
//                     <Input type='time'></Input>
//                 </div>

//                 <div>
//                     <Label>Pax</Label>
//                     <Input></Input>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-2'>
//                     <Label>Therapist Type</Label>
//                     <Select
//                         value={details?.therapist_type ?? "Any"}
//                         onValueChange={(value) => handleChange("therapist_type", value)}
//                     >
//                         <SelectTrigger className='min-w-full'>
//                           <SelectValue placeholder="" />
//                         </SelectTrigger>
                                    
//                         <SelectContent>
//                           <SelectGroup>
//                             <SelectItem value="Any">Line Up</SelectItem>
//                             <SelectItem value="Male">Male</SelectItem>
//                             <SelectItem value="Female">Female</SelectItem>
//                             <SelectItem value="Senior">Senior</SelectItem>
//                           </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div className='col-span-2
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1
//                 2xl:col-span-2'>
//                     <Label>Therapist Name</Label>
//                     <Select
//                     value={details?.therapist}
//                     onValueChange={(value) =>
//                      handleChange("therapist", value === "none" ? null : value)}
//                         >
//                       <SelectTrigger className='min-w-full'>
//                         <SelectValue placeholder="Select therapist" />
//                       </SelectTrigger>
                    
//                       <SelectContent>
//                         <SelectGroup>
//                           {/* <SelectItem value="none">No therapist</SelectItem> */}
                    
//                         {filteredTherapists.map((t) => (
//                           <SelectItem key={t.staff_id} value={String(t.staff_id)}>
//                             {t.first_name} {t.last_name}
//                           </SelectItem>
//                         ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                 </div>
//             </Field>

//             <Field  className='col-span-4
//                 sm:col-span-4
//                 md:col-span-1
//                 lg:col-span-1
//                 xl:col-span-1 xl:w-1/5
//                 2xl:col-span-1 2xl:w-1/5'>
//                 <Label>Service Type</Label>
//                 <Select defaultValue="Branch Visit"
//                 onValueChange={(value) => setServiceType(value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select service type" />
//                     </SelectTrigger>
                
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="Branch Visit">Branch Visit</SelectItem>
//                         <SelectItem value="Home Service">Home Service</SelectItem>
//                         <SelectItem value="Hotel Service">Hotel Service</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//             </Field>

//             {!isBranch && (
//             <Field className='grid grid-cols-4 gap-4'>
//               <div>
//                   <Label>Province</Label>
//                   <Input></Input>
//               </div>

//                 <div>
//                   <Label>City / Municipality</Label>
//                   <Input></Input>
//               </div>

//               <div>
//                   <Label>Barangay</Label>
//                   <Input disabled={isHotel}></Input>
//               </div>

//               <div>
//                   <Label>House Number</Label>
//                   <Input disabled={isHotel}></Input>
//               </div>

//               <div>
//                   <Label>Zone</Label>
//                   <Input disabled={isHotel}></Input>
//               </div>

//               <div>
//                   <Label>Street</Label>
//                   <Input disabled={isHotel}></Input>
//               </div>

//               <div>
//                   <Label>Hotel Name</Label>
//                   <Input disabled={isHome}></Input>
//               </div>

//               <div>
//                   <Label>Room Number</Label>
//                   <Input disabled={isHome}></Input>
//               </div>
//             </Field>
//             )}

//             <Field>
//                 <Label>Total: 0.00</Label>
//             </Field>
//           </FieldGroup>

//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  SelectGroup,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import axios from "axios"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

// ── helper: "14:30" → "2:30 PM" / "12:00 NN" ──────────────────────────────
function to12Hour(timeStr) {
  if (!timeStr) return ""
  const [hStr, mStr] = timeStr.split(":")
  let h = parseInt(hStr, 10)
  const m = mStr
  if (h === 12) return `12:${m} NN`
  if (h === 0)  return `12:${m} AM`
  const mod = h >= 12 ? "PM" : "AM"
  if (h > 12) h -= 12
  return `${h}:${m} ${mod}`
}

// ── initial state factories ─────────────────────────────────────────────────
const initCustomer  = () => ({ firstName: "", middleName: "", lastName: "", gender: "", mobile: "", email: "" })
const initLocation  = () => ({ province: "", city: "", barangay: "", houseNumber: "", zone: "", street: "", hotelName: "", roomNumber: "", landmark: "", note: "" })
const initAppt      = () => ({ date: new Date().toISOString().split("T")[0], time: "", pax: "1", therapist_type: "Any", therapist: "none", branch_id: "" })
const initTreatment = () => ({ id: "", name: "", duration: "", price: 0 })

export function AddAppointment() {
 
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")


  const [serviceType, setServiceType] = useState("Branch Visit")
  const isHome   = serviceType === "Home Service"
  const isHotel  = serviceType === "Hotel Service"
  const isBranch = serviceType === "Branch Visit"


  const [customer,  setCustomer]  = useState(initCustomer())
  const [location,  setLocation]  = useState(initLocation())
  const [appt,      setAppt]      = useState(initAppt())
  const [treatment, setTreatment] = useState(initTreatment())


  const [services,   setServices]   = useState([])
  const [therapists, setTherapists] = useState([])
  const [branches,   setBranches]   = useState([])

  useEffect(() => {
    axios.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to fetch services", err))

    getTherapist()
      .then((res) => setTherapists(res.data))
      .catch((err) => console.error("Failed to fetch therapists", err))

    axios.get("/api/branches")
      .then((res) => setBranches(res.data))
      .catch((err) => console.error("Failed to fetch branches", err))
  }, [])

  const filteredTherapists = therapists.filter((t) =>
    appt.therapist_type === "Any" ? true : t.gender === appt.therapist_type
  )

  const total = Number(treatment.price || 0) * Number(appt.pax || 1)

  // field helpers
  const setC = (field, val) => setCustomer((p) => ({ ...p, [field]: val }))
  const setL = (field, val) => setLocation((p) => ({ ...p, [field]: val }))
  const setA = (field, val) => setAppt((p)     => ({ ...p, [field]: val }))

  // treatment select 
  const handleTreatmentSelect = (name) => {
    const svc = services.find((s) => s.service_name === name)
    if (!svc) return
    setTreatment({
      id:       svc.services_id,
      name:     svc.service_name,
      duration: svc.duration_minutes ?? "",
      price:    svc.price ?? 0,
    })
  }

  const reset = () => {
    setCustomer(initCustomer())
    setLocation(initLocation())
    setAppt(initAppt())
    setTreatment(initTreatment())
    setServiceType("Branch Visit")
    setError("")
  }

  const handleSubmit = async () => {
    setError("")

    if (!customer.firstName || !customer.lastName) {
      setError("First name and last name are required."); return
    }
    if (!appt.date || !appt.time) {
      setError("Date and time are required."); return
    }
    if (!appt.branch_id) {
      setError("Please select a branch."); return
    }
    if (!treatment.id) {
      setError("Please select a treatment."); return
    }

    const branch = branches.find((b) => String(b.branch_id) === appt.branch_id)
      ?? { branch_id: appt.branch_id }

    const payload = {
      customer: {
        firstName: customer.firstName,
        lastName:  customer.lastName,
        gender:    customer.gender,
        mobile:    customer.mobile,
        email:     customer.email,
      },
      location: {
        zone:        location.zone,
        barangay:    location.barangay,
        city:        location.city,
        province:    location.province,
        houseNumber: location.houseNumber,
        hotelName:   location.hotelName,
        roomNumber:  location.roomNumber,
        landmark:    location.landmark,
        note:        location.note,
      },
      serviceType,
      date:           appt.date,
      time:           to12Hour(appt.time),
      therapist_id:   appt.therapist !== "none" ? appt.therapist : null,
      therapist_type: appt.therapist_type,
      branch,
      services: [
        {
          id:       treatment.id,
          price:    Number(treatment.price),
          duration: Number(treatment.duration),
          pax:      Number(appt.pax) || 1,
        },
      ],
    }

    try {
      setLoading(true)
      await axios.post("/booking", payload)
      setOpen(false)
      reset()
    } catch (err) {
      setError(err.response?.data?.details ?? "Booking failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset() }}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus /> Add Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
        </DialogHeader>

        <FieldSeparator>Customer's Information</FieldSeparator>

        <FieldGroup>
          <Field className="grid grid-cols-4 gap-4">
            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>First Name</Label>
              <Input value={customer.firstName} onChange={(e) => setC("firstName", e.target.value)} />
            </div>

            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Middle Name</Label>
              <Input value={customer.middleName} onChange={(e) => setC("middleName", e.target.value)} />
            </div>

            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Last Name</Label>
              <Input value={customer.lastName} onChange={(e) => setC("lastName", e.target.value)} />
            </div>

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Gender</Label>
              <Select value={customer.gender} onValueChange={(v) => setC("gender", v)}>
                <SelectTrigger className="min-w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Contact Number</Label>
              <Input
                value={customer.mobile}
                onChange={(e) => setC("mobile", e.target.value.replace(/\D/g, ""))}
                maxLength={11}
              />
            </div>

            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={customer.email}
                onChange={(e) => setC("email", e.target.value)}
              />
            </div>
          </Field>

          <FieldSeparator>Appointment Information</FieldSeparator>

          <Field className="grid grid-cols-6 gap-4">
            <div className="col-span-3 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-2">
              <Label>Treatment</Label>
              <Combobox
                items={services.map((s) => s.service_name)}
                onValueChange={handleTreatmentSelect}
              >
                <ComboboxInput className="min-w-full" placeholder="Search / Select" />
                <ComboboxContent>
                  <ComboboxEmpty>No treatment found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => {
                      const svc = services.find((s) => s.service_name === item)
                      return (
                        <ComboboxItem className="!pointer-events-auto" key={item} value={item}>
                          <div className="flex flex-col">
                            <span>{item}</span>
                            <span className="text-xs text-muted-foreground">
                              {svc?.service_category}
                            </span>
                          </div>
                        </ComboboxItem>
                      )
                    }}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="col-span-1 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Duration</Label>
              <Input value={treatment.duration} readOnly />
            </div>

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Date</Label>
              <Input type="date" value={appt.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => setA("date", e.target.value)} />
            </div>

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Time</Label>
              <Input type="time" value={appt.time} onChange={(e) => setA("time", e.target.value)} />
            </div>

            <div>
              <Label>Pax</Label>
              <Input
                value={appt.pax}
                onChange={(e) => setA("pax", e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-2">
              <Label>Therapist Type</Label>
              <Select
                value={appt.therapist_type}
                onValueChange={(v) => {
                  setA("therapist_type", v)
                  setA("therapist", "none")
                }}
              >
                <SelectTrigger className="min-w-full">
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

            <div className="col-span-2 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-2">
              <Label>Therapist Name</Label>
              <Select
                value={appt.therapist}
                onValueChange={(v) => setA("therapist", v)}
              >
                <SelectTrigger className="min-w-full">
                  <SelectValue placeholder="Select therapist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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

          <Field className="grid grid-cols-4 gap-4">
            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Service Type</Label>
              <Select defaultValue="Branch Visit" onValueChange={(v) => setServiceType(v)}>
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
            </div>

            {/* temp, remove branch selection when receptionist per branch logic is added */}
            <div className="col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <Label>Branch</Label>
              <Select value={appt.branch_id} onValueChange={(v) => setA("branch_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {branches.map((b) => (
                      <SelectItem key={b.branch_id} value={String(b.branch_id)}>
                        {b.branch_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Field>

          {!isBranch && (
            <Field className="grid grid-cols-4 gap-4">
              <div>
                <Label>Province</Label>
                <Input value={location.province} onChange={(e) => setL("province", e.target.value)} />
              </div>

              <div>
                <Label>City / Municipality</Label>
                <Input value={location.city} onChange={(e) => setL("city", e.target.value)} />
              </div>

              <div>
                <Label>Barangay</Label>
                <Input
                  disabled={isHotel}
                  value={location.barangay}
                  onChange={(e) => setL("barangay", e.target.value)}
                />
              </div>

              <div>
                <Label>House Number</Label>
                <Input
                  disabled={isHotel}
                  value={location.houseNumber}
                  onChange={(e) => setL("houseNumber", e.target.value)}
                />
              </div>

              <div>
                <Label>Zone</Label>
                <Input
                  disabled={isHotel}
                  value={location.zone}
                  onChange={(e) => setL("zone", e.target.value)}
                />
              </div>

              <div>
                <Label>Street</Label>
                <Input
                  disabled={isHotel}
                  value={location.street}
                  onChange={(e) => setL("street", e.target.value)}
                />
              </div>

              <div>
                <Label>Hotel Name</Label>
                <Input
                  disabled={isHome}
                  value={location.hotelName}
                  onChange={(e) => setL("hotelName", e.target.value)}
                />
              </div>

              <div>
                <Label>Room Number</Label>
                <Input
                  disabled={isHome}
                  value={location.roomNumber}
                  onChange={(e) => setL("roomNumber", e.target.value)}
                />
              </div>
            </Field>
          )}

          <Field>
            <Label>
              Total: ₱{total.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Label>
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={reset}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}