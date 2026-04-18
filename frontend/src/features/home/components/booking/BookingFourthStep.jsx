import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

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

import check from "@/assets/images/home/Checl.png";

export default function BookingFourthStep() {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardContent className="flex flex-col justify-center items-center
        gap-4
        sm:gap-7
        md:gap-8
        lg:gap-8
        xl:gap-9
        2xl:gap-9">
          <CardTitle className="text-3xl 2xl:text-5xl">SUCCESS</CardTitle>

          <CardDescription className="text-center
          2xl:text-xl 2xl:w-130">
            Your booking reference number is <span className="font-bold">ABCD1234</span>. You'll
            recieve an email confirming your appointment. Thank you for choosing
            us!
          </CardDescription>

          <img className='w-30
          sm:w-40
          md:w-45
          lg:w-45
          xl:w-45
          2xl:w-50' src={check}/>
        </CardContent>

        <Separator/>

        <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardDescription className="text-center
          2xl:text-xl 2xl:w-130">Save your details for faster booking next time?</CardDescription>
            <div className="flex items-center justify-center gap-2">
                <Button>Create an Account</Button>
                <Button onClick={() => navigate("/")} variant='outline'>Back to Home</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
