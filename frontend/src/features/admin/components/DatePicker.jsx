"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ value, onChange, disabled }) {
  const [open, setOpen] = React.useState(false)

  // ✅ Convert string (YYYY-MM-DD) → Date object
  const parsedDate = value ? new Date(value) : undefined

  return (
    <Field className="w-44">
      <FieldLabel htmlFor="date">Date Hired</FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            disabled={disabled}
            className="justify-start font-normal"
          >
            {parsedDate
              ? parsedDate.toLocaleDateString()
              : "Select date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={parsedDate}
            defaultMonth={parsedDate}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (!selectedDate) return

              // ✅ Convert Date → YYYY-MM-DD (SAFE local)
              const year = selectedDate.getFullYear()
              const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
              const day = String(selectedDate.getDate()).padStart(2, "0")

              const formatted = `${year}-${month}-${day}`

              onChange(formatted) // ✅ send to parent
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}