import Toggle from "@/components/ui/mode-toggle.jsx"
import { AdminLoginForm } from "@/components/ui/ClientLoginForm"
import imgLogo from "@/assets/LoginLogo.png"

function AdminLoginPage() {
  return (
    <div className="bg-warning text-warning-foreground relative flex min-h-screen items-center justify-center">
      <div className="absolute top-4 right-4">
        <Toggle />
      </div>
      <img
        src={imgLogo}
        alt="Logo"
        className="absolute top-[calc(28%-160px)] left-1/2 -translate-x-1/2 w-40 h-40
        2xl:w-50 2xl:h-50"
      />
      <AdminLoginForm />
    </div>
  )
}

export default AdminLoginPage
