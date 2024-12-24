'use client'

import { SessionProvider } from "next-auth/react"
import { UserProvider } from "./UserProvider"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  )
}
