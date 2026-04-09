import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import App from './App'
import { Toaster } from "sonner"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster 
      richColors
      position="top-center"
      toastOptions={{
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  </StrictMode>,
)
