import { Separator } from "@/components/ui/separator"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function BookingFirstStep({ formData, setFormData }) {
  const [date, setDate] = React.useState(new Date())

  const [therapist, setTherapist] = React.useState([])
  const [filter, setFilter] = React.useState("any")

  const [branches, setBranches] = React.useState([])
  const [selectedBranch, setSelectedBranch] = React.useState(null)

  const [errors, setErrors] = React.useState({});

  function formatLocalDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}` // e.g. "2026-04-18"
  }

  React.useEffect(() => {
  setFormData(prev => ({
    ...prev,
    date: formatLocalDate(new Date())
  }))
}, [])

  React.useEffect(() => {
    axios.get("/staffs/therapist")
      .then(res => {
        let data = res.data

        if (filter !== "any") {
          data = data.filter(item => item.gender.toLowerCase() === filter)
        }

        
        setTherapist(data)
      })
      .catch(err => console.log(err))
  }, [filter])

  React.useEffect(() => {
    axios.get("/branches")
      .then(res => {
        setBranches(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex w-[100%] justify-center p-2">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-5">
          <form>
            <div className="flex flex-col gap-6">

              <div className="flex gap-2">
                <Label className="font-bold">Select Branch:</Label>

                <Combobox
                  items={branches.map(b => b.branch_name)}
                  required
                  onValueChange={(value) => {
                    const found = branches.find(b => b.branch_name === value)

                    setSelectedBranch(found)

                    setFormData(prev => ({
                      ...prev,
                      branch: found 
                    }))
                  }}
                >
                  <ComboboxInput
                    className="w-[60%] xl:w-[20%] 2xl:w-[20%]"
                    placeholder="Search / Select"
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              {/* ADDRESS */}
              <div className="flex gap-2">
                <Label className="font-bold">Branch Address:</Label>

                <p>
                  {selectedBranch
                    ? `${selectedBranch.barangay}, ${selectedBranch.city}, ${selectedBranch.province}`
                    : "Select a Branch"}
                </p>
              </div>

              {/* THERAPIST */}
              <div className="flex flex-col gap-3">
                <div className="grid 2xl:flex gap-5">
                  <Label className="font-bold">Choose Therapist:</Label>

                  <div className="flex gap-1">
                    <input
                      id="any"
                      type="radio"
                      name="therapist-type"
                      defaultChecked
                      onChange={() => {
                        setFilter("any")
                        setFormData(prev => ({
                          ...prev,
                          therapist_type: "Any"
                        }))
                      }}
                    />
                    <Label htmlFor="any">Any</Label>
                  </div>

                  <div className="flex gap-1">
                    <input
                      id="male"
                      type="radio"
                      name="therapist-type"
                      onChange={() => {
                        setFilter("male")
                        setFormData(prev => ({
                          ...prev,
                          therapist_type: "Male"
                        }))
                      }}
                    />
                    <Label htmlFor="male">Male</Label>
                  </div>

                  <div className="flex gap-1">
                    <input
                      id="female"
                      type="radio"
                      name="therapist-type"
                      onChange={() => {
                        setFilter("female")
                        setFormData(prev => ({
                          ...prev,
                          therapist_type: "Female"
                        }))
                      }}
                    />
                    <Label htmlFor="female">Female</Label>
                  </div>

                  <div className="flex gap-1">
                    <input type="radio" disabled />
                    <Label>Senior</Label>
                  </div>
                </div>

                {/* <Combobox
                  items={therapist.map(t => t.first_name)}
                  onValueChange={(value) =>
                    setFormData(prev => ({
                      ...prev,
                      therapist: value
                    }))
                  }
                >
                  <ComboboxInput
                    className="w-[60%] xl:w-[20%] 2xl:w-[20%]"
                    placeholder="Search / Select"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox> */}



                <Combobox
                items={therapist.map(t => t.first_name)}
                onValueChange={(value) => {
                  const selected = therapist.find(t => t.first_name === value)
                  
                  
                  // console.log("Selected therapist:", selected)
                  setFormData(prev => ({
                    ...prev,
                    therapist_id: selected.staff_id
                  }))
                }}
              >
                <ComboboxInput
                  className="w-[60%] xl:w-[20%] 2xl:w-[20%]"
                  placeholder="Search / Select"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              </div>

            </div>
          </form>

          <Separator />

          <div className="flex flex-col gap-9 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2">

            {/* date */}
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Select Date</Label>
              <Calendar
                mode="single"
                required
                selected={date}
                onSelect={(value) => {
  setDate(value)
  setFormData(prev => ({
    ...prev,
    date: value ? formatLocalDate(value) : ""
  }))
}}
                className="w-[80%] rounded-lg border"
                captionLayout="dropdown"
              />
            </div>

            <Separator className="xl:hidden 2xl:hidden" />

            {/* TIME */}
            <div className="flex flex-col gap-2">
              <Label className="font-bold">Select Time</Label>

              <div className="grid grid-cols-3 grid-rows-8 gap-4 xl:grid-cols-4 xl:grid-rows-6">
                {[
                  "12:00 NN","12:30 PM","1:00 PM","1:30 PM",
                  "2:00 PM","2:30 PM","3:00 PM","3:30 PM",
                  "4:00 PM","4:30 PM","5:00 PM","5:30 PM",
                  "6:00 PM","6:30 PM","7:00 PM","7:30 PM",
                  "8:00 PM","8:30 PM","9:00 PM","9:30 PM",
                  "10:00 PM","10:30 PM","11:00 PM","11:30 PM"
                ].map(time => (
                  <Button
                    type="button"
                    key={time}
                    variant={formData.time === time ? "default" : "outline"} 
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        time: time
                      }))
                    }
                  >
                    {time}
                  </Button>
                ))}
              </div>

            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}