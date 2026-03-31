import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Header() {
    return (
      <Card className="p-4 flex m-4">
        <div className="flex">
          <Field orientation="horizontal" className="">
            <Input type="search" placeholder="Search..." />
            <Button>Search</Button>
          </Field>  
          <ModeToggle/>
          <div className="flex items-center gap-3 ml-4">
            <span>Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </div>
      </Card>
    );
  }