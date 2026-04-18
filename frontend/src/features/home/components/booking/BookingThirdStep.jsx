import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import NumberInput from "../ui/NumberInput"
import location from "@/assets/location.png"
import date from "@/assets/date.png"
import { PhoneInput } from "../ui/PhoneInput"

import { MobileDrawer } from "../ui/MobileDrawer"
import { SelectDemo } from "../ui/GenderSelect"

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BookingThirdStep({ formData, setFormData }) {
  return (
    <div className="flex w-[100%] justify-center p-2">
      <Card className="w-full min-h-120
      xl:grid xl:grid-cols-2 xl:min-h-100
      2xl:grid 2xl:grid-cols-2 2xl:mind-h-120">

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 mt-4">
                <CardTitle>Customer Information</CardTitle>
              </div>

              <Separator />

              <div className='w-full flex flex-col gap-6
              2xl:grid 2xl:grid-cols-2'>
                
                <div className='space-y-1 w-full'>
                  <Label>First Name:</Label>
                  <Input
                    value={formData.customer.firstName}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          firstName: e.target.value
                        }
                      }))
                    }
                  />
                </div>

                <div className='space-y-1 w-full'>
                  <Label>Last Name:</Label>
                  <Input
                    value={formData.customer.lastName}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          lastName: e.target.value
                        }
                      }))
                    }
                  />
                </div>

                <div className='space-y-1 w-full'>
                  <Label>Mobile Number:</Label>
                  <PhoneInput
                    value={formData.customer.mobile}
                    onChange={(value) =>
                      setFormData(prev => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          mobile: value
                        }
                      }))
                    }
                  />
                </div>

                <div className='space-y-1 w-full'>
                  <Label>Email:</Label>
                  <Input
                    value={formData.customer.email}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          email: e.target.value
                        }
                      }))
                    }
                  />
                </div>

                <div className='space-y-1 w-full'>
                  <Label>Gender:</Label>
                  <SelectDemo
                    value={formData.customer.gender}
                    onValueChange={(value) =>
                      setFormData(prev => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          gender: value
                        }
                      }))
                    }
                  />
                </div>

              </div>
            </div>
          </form>

          <div className='pt-5 pb-3 flex justify-center'>
            <MobileDrawer />
          </div>
        </CardContent>

        <CardContent className="hidden flex-col gap-6
        md:flex lg:flex xl:flex 2xl:flex">

          <CardTitle className="2xl:mt-4">
            Appointment Summary
          </CardTitle>

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <img src={location} className="h-5 w-5 2xl:h-6 2xl:w-6" />
              <Label className="text-xs 2xl:text-base">
                Orange Dormitel, Barangay Tinago, Naga City
              </Label>
            </div>

            <div className="flex gap-2">
              <img src={date} className="h-4 w-4 2xl:h-5 2xl:w-5" />
              <Label className="text-xs 2xl:text-base">
                Friday, March 31, 2026
              </Label>
              <Label className="text-xs 2xl:text-base">
                4:30 PM
              </Label>
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
                <Label className="text-xs 2xl:text-base">
                  No. Of Pax
                </Label>
                <NumberInput />
              </div>

              <div className="col-span-2 flex items-center justify-end">
                <Button variant="destructive">Remove</Button>
              </div>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  )
}