"use client"

import { useState } from "react"
import Link from "next/link"
import { signup } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const result = await signup(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-8 text-center">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required minLength={8} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Sign up"}
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
