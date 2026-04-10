import { GalleryVerticalEnd } from "lucide-react"
import logo from "@/assets/images/logo.png"
import { SignupForm } from "@/components/signup-form"
import signUpLogo from "@/assets/images/signUpLogo.jpg"

export default function SignUp() {
  return (
    <div className="grid bg-card min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-white text-primary-foreground">
              <img src={logo}/>
            </div>
            Trangkilo Massage Hut
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={signUpLogo}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
