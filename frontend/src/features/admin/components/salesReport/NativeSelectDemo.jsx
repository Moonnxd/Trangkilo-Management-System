import {
    NativeSelect,
    NativeSelectOption,
  } from "@/components/ui/native-select"
  
  export function NativeSelectDemo() {
    return (
      <NativeSelect className="w-3xs ml-4">
        <NativeSelectOption value="">All Branches</NativeSelectOption>
        <NativeSelectOption value="todo">Trangkilo Magsaysay</NativeSelectOption>
        <NativeSelectOption value="in-progress">Trangkilo Concepcion</NativeSelectOption>
        <NativeSelectOption value="done">Trangkilo CBD</NativeSelectOption>
        <NativeSelectOption value="cancelled">Trangkilo Orange Dorm</NativeSelectOption>
      </NativeSelect>
    )
  }
  