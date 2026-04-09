import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import { Card, CardContent, CardTitle } from "@/components/ui/card"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox"


export default function SelectService({ close, setServiceType }) {
  const navigate = useNavigate()
  const [value, setValue] = useState("")

  const [serviceTypes, setServiceTypes] = useState([])

  const handleConfirm = () => {
  if (!value) {
    alert("Please select a service type first")
    return
  }

  close()
}

useEffect(() => {
  axios.get("http://localhost:5000/serviceType")
    .then(res => {
      // convert objects to array of names
      const names = res.data.map(item => item.service_type_name)
      setServiceTypes(names)
    })
    .catch(err => console.error(err))
}, [])

  const handleSelect = (item) => {
    setValue(item) 
    setServiceType(item)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-9 border bg-[#f5f7fa]">
      <Card className="p-40">
        <CardContent className="flex flex-col items-center gap-5">
          <CardTitle className="text-xl">Select Service Type</CardTitle>

          <Combobox
            items={serviceTypes}
            onValueChange={(item) => {
              setValue(item)
              setServiceType(item)
            }}
          >
            <ComboboxInput
              className="h-10 w-full text-2xl"
              placeholder="Search / Select"
            />

            <ComboboxContent className="text-2xl">
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

          <div className="flex gap-5">
            <Button onClick={() => navigate("/")} variant="outline">
              Back to Home
            </Button>

            <Button  onClick={handleConfirm} disabled={!value}>Confirm</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
