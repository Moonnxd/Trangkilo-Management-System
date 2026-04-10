import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"

export function SignupForm({ className, ...props }) {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    contact_number: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.gender) {
      setError("Please select a gender");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setError("");
        console.log("Success:", data);
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Field>
          <FieldLabel>First Name</FieldLabel>
          <Input
            id="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="John"
            required
            className="bg-card"
          />
        </Field>

        <Field>
          <FieldLabel>Last Name</FieldLabel>
          <Input
            id="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Doe"
            required
            className="bg-card"
          />
        </Field>

        <Field className="flex flex-row gap-4">
          <div className="flex-1">
            <FieldLabel>Gender</FieldLabel>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, gender: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <FieldLabel>Mobile Number</FieldLabel>
            <Input
              id="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              required
            />
          </div>
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="m@example.com"
            required
            className="bg-card"
          />
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-card"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="bg-card"
          />
          <FieldDescription>
            Please confirm your password.
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button className="bg-card" variant="outline" type="button">
            Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>

      </FieldGroup>
    </form>
  );
} 