"use client"

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
  CardDescription,
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export function AdminLoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      },
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
      </CardHeader>

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="userid"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    User id
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="user id"
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
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
                    
                    {/* Left: Remember Me */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="remember">Remember Me</Label>
                    </div>

                    {/* Right: Forgot Password */}
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot Password?
                    </a>

                  </div>
                </Field>
              )}
            />

            <Field orientation="horizontal">
              <Button type="submit" form="form-rhf-demo">
                Login
              </Button>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <FieldDescription class="text-center">
        <span className="text-primary">Don’t have an account?</span><br /> Contact us at ph.dev.trangkilo@gmail.com,
        and we will take care of everything.
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}