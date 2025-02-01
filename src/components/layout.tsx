import type React from "react"
import { Header } from "./header"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}

