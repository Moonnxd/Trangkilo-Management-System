import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import NumberInput from "@/components/ui/NumberInput.jsx"
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import location from '@/assets/location.png'
import date from '@/assets/date.png'

export function MobileDrawer({ selectedServices = [], formData = {}, onRemove, onPaxChange, onSubmit }) {
  return (
    <div className=''>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="
          md:hidden
          lg:hidden
          xl:hidden
          2xl:hidden" variant="outline">
            View Appointment {selectedServices.length > 0 && `(${selectedServices.length})`}
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Appointment Summary</DrawerTitle>
          </DrawerHeader>

          {/* CONTENT AREA */}
          <Card>
            <CardContent className="flex flex-col gap-6 overflow-y-auto">
              <div className="">
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  <img
                    src={location}
                    className="h-5 w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6"
                  />
                  <Label className="text-xs 2xl:text-base">
                    {formData?.location
                      ? [
                          formData.location.hotelName,
                          formData.location.barangay,
                          formData.location.city,
                          formData.location.province,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "No location selected"}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <img
                    src={date}
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 xl:h-5 xl:w-5 2xl:h-5 2xl:w-5"
                  />
                  <Label className="text-xs 2xl:text-base">
                    {formData?.date || "No date selected"}
                  </Label>
                  <Label className="text-xs 2xl:text-base">
                    {formData?.time || ""}
                  </Label>
                </div>
              </div>

              {/* Services List */}
              {selectedServices.length === 0 ? (
                <Label className="text-xs text-muted-foreground">No services added yet.</Label>
              ) : (
                selectedServices.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="grid grid-cols-2 grid-rows-2 gap-1">
                      <div>
                        <Label className="text-xs 2xl:text-base">
                          {service.name}
                        </Label>
                        <Label className="text-xs 2xl:text-base">
                          Price: {service.price}
                        </Label>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <Label className="text-xs 2xl:text-base">No. Of Pax</Label>
                        <NumberInput
                          value={service.pax}
                          onChange={(val) => onPaxChange(service.id, val)}
                        />
                      </div>

                      <div className="col-span-2 flex items-center justify-end">
                        <Button
                          variant="destructive"
                          onClick={() => onRemove(service.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

            </CardContent>
          </Card>

          <DrawerFooter>
            <Button onClick={onSubmit}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}