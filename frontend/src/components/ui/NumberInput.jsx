"use client"

import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<<<<<<< HEAD
const NumberInput = () => {
  const [value, setValue] = useState(1)
=======
const NumberInput = ({ value = 1, onChange }) => {
  const clamp = (val) => Math.min(5, Math.max(1, val))
>>>>>>> moonxd/main

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex gap-2 justify-center">
        <Button
<<<<<<< HEAD
          onClick={() => setValue(Math.max(1, value - 1))}
=======
          onClick={() => onChange(clamp(value - 1))}
>>>>>>> moonxd/main
          size="icon"
          type="button"
          variant="outline"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
<<<<<<< HEAD
          className="w-[20%] bg-background text-center"
          id="quantity"
          min="1"
          onChange={(e) => setValue(Number(e.target.value))}
=======
          className="w-[35%] bg-background text-center"
          id="quantity"
          min="1"
          max="5"
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
>>>>>>> moonxd/main
          type="number"
          value={value}
        />
        <Button
<<<<<<< HEAD
          onClick={() => setValue(value + 1)}
=======
          onClick={() => onChange(clamp(value + 1))}
>>>>>>> moonxd/main
          size="icon"
          type="button"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default NumberInput
