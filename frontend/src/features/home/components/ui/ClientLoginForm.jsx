"use client"

import { IconUser, IconLock } from "@tabler/icons-react"
import axios from "axios"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useNavigate } from "react-router-dom"

// VALIDATION
const formSchema = z.object({
  userid: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
})

export function AdminLoginForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      password: "",
      remember: false,
    },
  })

  // LOGIN FUNCTION
  async function onSubmit(data) {
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: data.userid,
        password: data.password,
      })

      toast.success(res.data.message)

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user))

      // REDIRECT
      navigate("/booking")

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="userid"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">
                    <IconUser className="text-primary"/>
                    Email / Mobile Number
                  </FieldLabel>

                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    <IconLock className="text-primary"/>
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    id="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="remember"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between max-w-sm">
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="remember">Remember Me</Label>
                    </div>

                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot Password?
                    </a>

                  </div>
                </Field>
              )}
            />

            <Field className="flex items-center justify-center">
              <Button
                disabled={loading}
                className="px-9 py-5"
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <FieldDescription className="text-center">
          <Label>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-primary">Sign Up</span>
          </Label>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}