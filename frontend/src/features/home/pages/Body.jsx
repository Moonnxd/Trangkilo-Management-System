import background from "@/assets/background.png"
import { Button } from "@/components/ui/button"
import PopUp from "../components/ui/popUp.jsx"
import { useState } from "react"

export default function Body() {
  const [bookChoice, showChoices] = useState(false)

  return (
    <div
      className="flex h-screen items-center justify-end bg-[position:20%_center] 2xl:bg-cover 2xl:bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mr-7 h-[60%] w-[90%] text-[#f5f7fa] md:h-[50%] md:w-[50%] xl:h-[50%]">
        <span className="text-5xl font-bold sm:text-4xl md:text-7xl xl:text-7xl 2xl:text-8xl">
          Relax.
        </span>

        <br className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden" />

        <span className="text-5xl font-bold sm:text-4xl md:ml-2 md:text-7xl lg:ml-3 xl:ml-5 xl:text-7xl 2xl:ml-5 2xl:text-8xl">
          Refresh.
        </span>
        <br />

        <span className="text-5xl font-bold text-[#68ab49] sm:text-4xl md:text-7xl xl:text-7xl 2xl:text-8xl">
          Rejuvenate.
        </span>
        <p className="md:text-md mt-5 sm:text-xs md:mt-5 lg:mt-8 lg:text-lg xl:mt-10 xl:text-lg">
          Book professional massage services anytime, anywhere with ease.
        </p>

        <Button
          onClick={() => showChoices(true)}
          className="md:text-md ms:mt-5 text-md mt-5 px-9 py-6 sm:text-sm md:mt-5 lg:mt-8 lg:text-lg xl:mt-10 xl:px-12 2xl:py-8 2xl:text-xl"
        >
          Book Nows
        </Button>

        {bookChoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <PopUp close={() => showChoices(false)} />
          </div>
        )}
      </div>
    </div>
  )
}
