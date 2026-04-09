import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="flex h-18 w-full items-center justify-between bg-[#f5f7fa] px-5
    sm:px-5 sm:h-10
    md:px-10 md:h-10
    lg:px-15 lg:h-18
    xl:px-18 xl:h-18
    2xl:px-19 2xl:h-18">
      <div className="h-17
      sm:h-10
      md:h-10
      lg:h-17
      xl:h-17
      2xl:h-17">
        <img src={logo} alt="" className="h-full w-auto object-contain"></img>
      </div>

      <div className="hidden text-black
      sm:flex sm:space-x-5 sm:text-xs
      md:flex md:space-x-6 md:text-[9px]
      lg:flex lg:space-x-10 lg:text-base
      xl:flex xl:space-x-15 xl:text-base
      2xl:flex 2xl:space-x-15 2xl:text-base">
        <a className="cursor-pointer">Home</a>
        <a className="cursor-pointer">Services</a>
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Contact Us</a>
      </div>

      <div className="space-x-3 flex items-center justify-center
      md:space-x-5
      lg:space-x-8
      xl:space-x-10">
        <button onClick={() => navigate("/clientlogin")}
        className="text-[#68ab49]
        sm:text-xs
        md:text-[9px]
        lg:text-base
        xl:text-base
        2xl:text-base">Login</button>

        <Button className="px-6 py-5
        sm:px-5 sm:py-2 sm:text-xs
        md:px-4 md:py-1 md:text-[9px]
        lg:px-8 lg:py-5 lg:text-base
        xl:px-8 xl:py-5 xl:text-base
        2xl:px-8 2xl:py-5 2xl:text-base">Sign Up</Button>
      </div>
    </header>
  )
}
