import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        green:
          "bg-green-100 text-green-800 border-green-300 focus-visible:ring-green-300/40 dark:bg-green-900 dark:text-green-100 dark:border-green-700 [a]:hover:bg-green-200 dark:[a]:hover:bg-green-800",
        orange:
          "bg-orange-400 text-orange-100 border-orange-300 focus-visible:ring-orange-300/40 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700 [a]:hover:bg-orange-200 dark:[a]:hover:bg-orange-800",
        blue:
          "bg-blue-100 text-blue-800 border-blue-300 focus-visible:ring-blue-300/40 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700 [a]:hover:bg-blue-200 dark:[a]:hover:bg-blue-800",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
