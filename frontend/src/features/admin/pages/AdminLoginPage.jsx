import { ModeToggle } from "@/components/ui/mode-toggle";
import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";
import imgLogo from "@/assets/images/landingLogo.png";

function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-warning text-warning-foreground relative flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <img
        src={imgLogo}
        alt="Logo"
        className="absolute left-1/2 top-[calc(28%-160px)] w-50 h-50 -translate-x-1/2 "
      />
        <AdminLoginForm />
    </div>
  );
}

export default AdminLoginPage;  