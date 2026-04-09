import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { IconCircleX } from "@tabler/icons-react"

export default function PopUp({ close }) {
  const navigate = useNavigate()

  return (
    <div className="flex w-[95%] flex-col gap-9 rounded-lg border bg-[#f5f7fa] pt-2 pb-20 xl:w-[60%]">
      <div className="flex justify-end pr-4 text-black">
        <IconCircleX onClick={close}/>
      </div>

      <div className="mx-5 flex flex-col gap-9 xl:mx-20 xl:flex-row 2xl:mx-20 2xl:flex-row">
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 shadow-xl 2xl:gap-5 2xl:p-10">
          <div>
            <label className="font-bold text-black 2xl:text-xl">
              Book as a Guest
            </label>
          </div>
++
          <div>
            <p className="text-center text-black">
              Quick and easy booking without creating an account
            </p>
          </div>

          <div>
            <Button
              onClick={() => navigate("/booking")}
              className="px-6 py-5 2xl:px-8 2xl:py-5"
            >
              Continue as a Guest
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-white p-8 text-center shadow-xl xl:gap-5 xl:p-10">
          <div>
            <label className="text-center font-bold text-black 2xl:text-xl">
              Already have an Account?
            </label>
          </div>

          <div>
            <p className="text-center text-black">
              Sign in to view your booking history and saved preferences
            </p>
          </div>

          <div>
            <Button
              onClick={() => navigate("/clientlogin")}
              className="px-6 py-5 2xl:px-8 2xl:py-5"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
