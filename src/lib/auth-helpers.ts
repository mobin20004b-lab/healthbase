
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function requireRole(role: string) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  if ((session.user as any).role !== role) {
    redirect("/unauthorized") // Or throw error
  }
  return session
}

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  return session
}
