import { useState } from 'react'
import AppRoutes from "./routes.jsx"
import '@/assets/styles/index.css'
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider delayDuration={200}>
        <AppRoutes />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App