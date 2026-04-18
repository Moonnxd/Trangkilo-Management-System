<<<<<<< HEAD
=======
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import NumberInput from "@/components/ui/NumberInput"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import location from "@/assets/location.png"
// import date from "@/assets/date.png"

// import { MobileDrawer } from "../ui/MobileDrawer"

// import { Card, CardContent, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { useEffect, useState } from "react"
// import axios from "axios"

// export default function BookingSecondStep({ formData, setFormData }) {
//   const [services, setServices] = useState([])
//   const [selectedServices, setSelectedServices] = useState([])

//   useEffect(() => {
//     axios.get("/services")
//       .then((res) => {
//         setServices(res.data)
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }, [])

 
//   const handleAddService = (service) => {
//     const exists = selectedServices.find(
//       (s) => s.id === service.services_id
//     )
//     if (exists) return

//     const normalizedService = {
//       id: service.services_id,
//       name: service.service_name,
//       price: service.price,
//       duration: service.duration_minutes,
//       pax: service.number_of_pax
//     }

//     const updated = [...selectedServices, normalizedService]

//     setSelectedServices(updated)
//     setFormData((prev) => ({
//       ...prev,
//       services: updated
//     }))
//   }


//   const handleRemoveService = (id) => {
//     const updated = selectedServices.filter((s) => s.id !== id)

//     setSelectedServices(updated)
//     setFormData((prev) => ({
//       ...prev,
//       services: updated
//     }))
//   }

 
//   const handlePaxChange = (id, value) => {
//     const updated = selectedServices.map((s) =>
//       s.id === id ? { ...s, pax: value } : s
//     )

//     setSelectedServices(updated)
//     setFormData((prev) => ({
//       ...prev,
//       services: updated
//     }))
//   }

//   return (
//     <div className="flex w-[100%] justify-center p-2">
//       <Card className="2xl:mind-h-120 min-h-120 w-full xl:grid xl:min-h-100 xl:grid-cols-2 2xl:grid 2xl:grid-cols-2">

   
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="flex gap-2">
//                 <Label>Search</Label>
//                 <Input className="2xl:w-[50%]" placeholder="Treatment" />
//               </div>

//               <Separator />

//               <Tabs className="w-[90%] 2xl:w-full" defaultValue="All">
//                 <TabsList className="w-full" variant="line">
//                   <TabsTrigger value="All">All Services</TabsTrigger>
//                   <TabsTrigger value="Premium">Premium</TabsTrigger>
//                   <TabsTrigger value="Traditional">Traditional</TabsTrigger>
//                   <TabsTrigger value="Specialty">Specialty</TabsTrigger>
//                 </TabsList>

           
//                 <TabsContent className="flex flex-col gap-3" value="All">
//                   {services.map((service) => (
//                     <Card key={service.services_id}>
//                       <CardContent className="grid grid-cols-[70%_30%]">
//                         <div className="flex flex-col gap-4">
//                           <Label>{service.service_name}</Label>
//                           <Label>{service.price}</Label>
//                         </div>

//                         <div className="flex items-center justify-center">
//                           <Button
//                             type="button"
//                             onClick={() => handleAddService(service)}
//                           >
//                             + Add
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </TabsContent>

//                 <TabsContent className="flex flex-col gap-3"  value="Premium">
//                   {services
//                     .filter((s) => s.service_category === "Premium")
//                     .map((service) => (
//                       <Card key={service.services_id}>
//                         <CardContent className="grid grid-cols-[70%_30%]">
//                           <div className="flex flex-col gap-4">
//                             <Label>{service.service_name}</Label>
//                             <Label>{service.price}</Label>
//                           </div>

//                           <div className="flex items-center justify-center">
//                           <Button
//                           type="button"
//                           onClick={() => handleAddService(service)}>
//                             + Add
//                           </Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                 </TabsContent>

           
//                 <TabsContent value="Traditional">
//                   {services
//                     .filter((s) => s.service_category === "Traditional")
//                     .map((service) => (
//                       <Card key={service.services_id}>
//                         <CardContent className="grid grid-cols-[70%_30%]">
//                           <div>
//                             <Label>{service.service_name}</Label>
//                             <Label>{service.price}</Label>
//                           </div>

//                           <Button onClick={() => handleAddService(service)}>
//                             + Add
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                 </TabsContent>

             
//                 <TabsContent value="Specialty">
//                   {services
//                     .filter((s) => s.service_category === "Specialty")
//                     .map((service) => (
//                       <Card key={service.services_id}>
//                         <CardContent className="grid grid-cols-[70%_30%]">
//                           <div>
//                             <Label>{service.service_name}</Label>
//                             <Label>{service.price}</Label>
//                           </div>

//                           <Button onClick={() => handleAddService(service)}>
//                             + Add
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </form>

//           <div className="flex justify-center pt-5 pb-3">
//             <MobileDrawer
//               selectedServices={selectedServices}
//               formData={formData}
//               onRemove={handleRemoveService}
//               onPaxChange={handlePaxChange}
//               onSubmit={() => console.log("submit", formData)} // replace with your actual submit
//             />
//           </div>
//         </CardContent>

//         {/* RIGHT SIDE */}
//         <CardContent className="hidden md:flex flex-col gap-6">
//           <CardTitle>Appointment Summary</CardTitle>

//           <Separator />

//           <div className="flex flex-col gap-3">
//             <div className="flex gap-1">
//               <img src={location} className="h-5 w-5" />
//               <Label>Selected Location</Label>
//             </div>

//             <div className="flex gap-2">
//               <img src={date} className="h-4 w-4" />
//               <Label>Date & Time</Label>
//             </div>
//           </div>

//           {selectedServices.map((service) => (
//             <Card key={service.id}>
//               <CardContent className="grid grid-cols-2 gap-2">
//                 <div>
//                   <Label>{service.name}</Label>
//                   <Label>Price: {service.price}</Label>
//                 </div>

//                 <div className="flex flex-col items-center">
//                   <Label>No. Of Pax</Label>
//                   <NumberInput
//                     value={service.number_of_pax}
//                     onChange={(val) =>
//                       handlePaxChange(service.id, val)
//                     }
//                   />
//                 </div>

//                 <div className="col-span-2 flex justify-end">
//                   <Button
//                     variant="destructive"
//                     onClick={() => handleRemoveService(service.id)}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </CardContent>

//       </Card>
//     </div>
//   )
// }

>>>>>>> moonxd/main
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import NumberInput from "@/components/ui/NumberInput"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import location from "@/assets/location.png"
import date from "@/assets/date.png"

import { MobileDrawer } from "../ui/MobileDrawer"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"
import axios from "axios"

export default function BookingSecondStep({ formData, setFormData }) {
  const [services, setServices] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
<<<<<<< HEAD
    axios
      .get("http://localhost:5000/services")
=======
    axios.get("/services")
>>>>>>> moonxd/main
      .then((res) => {
        setServices(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

 
  const handleAddService = (service) => {
    const exists = selectedServices.find(
      (s) => s.id === service.services_id
    )
    if (exists) return

    const normalizedService = {
      id: service.services_id,
      name: service.service_name,
      price: service.price,
      duration: service.duration_minutes,
<<<<<<< HEAD
      pax: 1
=======
      pax: service.number_of_pax
>>>>>>> moonxd/main
    }

    const updated = [...selectedServices, normalizedService]

    setSelectedServices(updated)
    setFormData((prev) => ({
      ...prev,
      services: updated
    }))
  }


  const handleRemoveService = (id) => {
    const updated = selectedServices.filter((s) => s.id !== id)

    setSelectedServices(updated)
    setFormData((prev) => ({
      ...prev,
      services: updated
    }))
  }

 
  const handlePaxChange = (id, value) => {
    const updated = selectedServices.map((s) =>
      s.id === id ? { ...s, pax: value } : s
    )

    setSelectedServices(updated)
    setFormData((prev) => ({
      ...prev,
      services: updated
    }))
  }

  return (
    <div className="flex w-[100%] justify-center p-2">
      <Card className="2xl:mind-h-120 min-h-120 w-full xl:grid xl:min-h-100 xl:grid-cols-2 2xl:grid 2xl:grid-cols-2">

   
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <Label>Search</Label>
                <Input className="2xl:w-[50%]" placeholder="Treatment" />
              </div>

              <Separator />

              <Tabs className="w-[90%] 2xl:w-full" defaultValue="All">
                <TabsList className="w-full" variant="line">
                  <TabsTrigger value="All">All Services</TabsTrigger>
                  <TabsTrigger value="Premium">Premium</TabsTrigger>
                  <TabsTrigger value="Traditional">Traditional</TabsTrigger>
                  <TabsTrigger value="Specialty">Specialty</TabsTrigger>
                </TabsList>

<<<<<<< HEAD
           
                <TabsContent className="flex flex-col gap-3" value="All">
                  {services.map((service) => (
                    <Card key={service.services_id}>
                      <CardContent className="grid grid-cols-[70%_30%]">
                        <div className="flex flex-col gap-4">
                          <Label>{service.service_name}</Label>
                          <Label>{service.price}</Label>
                        </div>

                        <div className="flex items-center justify-center">
                          <Button
                            type="button"
                            onClick={() => handleAddService(service)}
                          >
                            + Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

         
                <TabsContent value="Premium">
                  {services
                    .filter((s) => s.service_category === "Premium")
                    .map((service) => (
                      <Card key={service.services_id}>
                        <CardContent className="grid grid-cols-[70%_30%]">
                          <div>
=======
                <div className="h-[500px] overflow-y-auto pr-2 mt-2">
                  <TabsContent className="flex flex-col gap-3" value="All">
                    {services.map((service) => (
                      <Card key={service.services_id}>
                        <CardContent className="grid grid-cols-[70%_30%]">
                          <div className="flex flex-col gap-4">
>>>>>>> moonxd/main
                            <Label>{service.service_name}</Label>
                            <Label>{service.price}</Label>
                          </div>

<<<<<<< HEAD
                          <Button onClick={() => handleAddService(service)}>
                            + Add
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

           
                <TabsContent value="Traditional">
                  {services
                    .filter((s) => s.service_category === "Traditional")
                    .map((service) => (
                      <Card key={service.services_id}>
                        <CardContent className="grid grid-cols-[70%_30%]">
                          <div>
                            <Label>{service.service_name}</Label>
                            <Label>{service.price}</Label>
                          </div>

                          <Button onClick={() => handleAddService(service)}>
                            + Add
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

             
                <TabsContent value="Specialty">
                  {services
                    .filter((s) => s.service_category === "Specialty")
                    .map((service) => (
                      <Card key={service.services_id}>
                        <CardContent className="grid grid-cols-[70%_30%]">
                          <div>
                            <Label>{service.service_name}</Label>
                            <Label>{service.price}</Label>
                          </div>

                          <Button onClick={() => handleAddService(service)}>
                            + Add
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
=======
                          <div className="flex items-center justify-center">
                            <Button
                              type="button"
                              onClick={() => handleAddService(service)}
                            >
                              + Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent className="flex flex-col gap-3" value="Premium">
                    {services
                      .filter((s) => s.service_category === "Premium")
                      .map((service) => (
                        <Card key={service.services_id}>
                          <CardContent className="grid grid-cols-[70%_30%]">
                            <div className="flex flex-col gap-4">
                              <Label>{service.service_name}</Label>
                              <Label>{service.price}</Label>
                            </div>

                            <div className="flex items-center justify-center">
                              <Button
                                type="button"
                                onClick={() => handleAddService(service)}
                              >
                                + Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent className="flex flex-col gap-3" value="Traditional">
                    {services
                      .filter((s) => s.service_category === "Traditional")
                      .map((service) => (
                        <Card key={service.services_id}>
                          <CardContent className="grid grid-cols-[70%_30%]">
                            <div className="flex flex-col gap-4">
                              <Label>{service.service_name}</Label>
                              <Label>{service.price}</Label>
                            </div>

                            <div className="flex items-center justify-center">
                              <Button
                                type="button"
                                onClick={() => handleAddService(service)}
                              >
                                + Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent className="flex flex-col gap-3" value="Specialty">
                    {services
                      .filter((s) => s.service_category === "Specialty")
                      .map((service) => (
                        <Card key={service.services_id}>
                          <CardContent className="grid grid-cols-[70%_30%]">
                            <div className="flex flex-col gap-4">
                              <Label>{service.service_name}</Label>
                              <Label>{service.price}</Label>
                            </div>

                            <div className="flex items-center justify-center">
                              <Button
                                type="button"
                                onClick={() => handleAddService(service)}
                              >
                                + Add
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </div>

>>>>>>> moonxd/main
              </Tabs>
            </div>
          </form>

          <div className="flex justify-center pt-5 pb-3">
<<<<<<< HEAD
            <MobileDrawer />
=======
            <MobileDrawer
              selectedServices={selectedServices}
              formData={formData}
              onRemove={handleRemoveService}
              onPaxChange={handlePaxChange}
              onSubmit={() => console.log("submit", formData)}
            />
>>>>>>> moonxd/main
          </div>
        </CardContent>

        {/* RIGHT SIDE */}
        <CardContent className="hidden md:flex flex-col gap-6">
          <CardTitle>Appointment Summary</CardTitle>

          <Separator />

<<<<<<< HEAD
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <img src={location} className="h-5 w-5" />
              <Label>Selected Location</Label>
            </div>

            <div className="flex gap-2">
              <img src={date} className="h-4 w-4" />
              <Label>Date & Time</Label>
            </div>
=======
          <div className="flex gap-1">
            <img src={location} className="h-5 w-5" />
            <Label>
              {formData.branch
                ? formData.branch.branch_name + ", " + formData.branch.barangay + ", " + formData.branch.city
                : "No branch selected"}
            </Label>
          </div>
              
          <div className="flex gap-2">
            <img src={date} className="h-4 w-4" />
            <Label>
              {formData.date && formData.time
                ? `${formData.date} at ${formData.time}`
                : "No date & time selected"}
            </Label>
>>>>>>> moonxd/main
          </div>

          {selectedServices.map((service) => (
            <Card key={service.id}>
              <CardContent className="grid grid-cols-2 gap-2">
<<<<<<< HEAD
                <div>
=======
                <div className='flex flex-col justify-between'>
>>>>>>> moonxd/main
                  <Label>{service.name}</Label>
                  <Label>Price: {service.price}</Label>
                </div>

                <div className="flex flex-col items-center">
                  <Label>No. Of Pax</Label>
                  <NumberInput
                    value={service.pax}
                    onChange={(val) =>
                      handlePaxChange(service.id, val)
                    }
                  />
                </div>

                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveService(service.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>

      </Card>
    </div>
  )
}