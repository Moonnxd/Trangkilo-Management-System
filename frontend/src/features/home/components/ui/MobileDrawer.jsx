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

import  location  from '@/assets/location.png'
import date from '@/assets/date.png';

export function MobileDrawer() {
  return (
    <div className=''>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="
          md:hidden
          lg:hidden
          xl:hidden
          2xl:hidden" variant="outline">
            View Appointment
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Appointment Summary</DrawerTitle>
          </DrawerHeader>

          {/* CONTENT AREA */}
          <Card>
            <CardContent className="flex flex-col gap-6">
              <div className="">
              </div>


              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  <img
                    src={location}
                    className="h-5 w-5 sm:h-5 sm:w-5 md:h-5 md:w-5 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6"
                  ></img>
                  <Label className="text-xs 2xl:text-base">
                    Orange Dormitel, Barangay Tinago, Naga City
                  </Label>
                </div>

                <div className="flex gap-2">
                  <img
                    src={date}
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 xl:h-5 xl:w-5 2xl:h-5 2xl:w-5"
                  ></img>
                  <Label className="text-xs 2xl:text-base">
                    Friday, March 31, 2026
                  </Label>
                  <Label className="text-xs 2xl:text-base">4:30 PM</Label>
                </div>
              </div>

              <Card>
                <CardContent className="grid grid-cols-2 grid-rows-2 gap-1">
                  <div>
                    <Label className="text-xs 2xl:text-base">
                      Volcanic Hot Stone Massage
                    </Label>
                    <Label className="text-xs 2xl:text-base">
                      + Body Scrub
                    </Label>
                    <Label className="text-xs 2xl:text-base">
                      + 15 mins Foot Massage
                    </Label>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <Label className="text-xs 2xl:text-base">No. Of Pax</Label>
                    <NumberInput />
                  </div>

                  <div className="col-span-2 flex items-center justify-end">
                    <Button variant="destructive">Remove</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
