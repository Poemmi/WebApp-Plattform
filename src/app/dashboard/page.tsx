import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { logout } from "@/lib/auth/actions"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Swords, HelpCircle, ArrowRight } from "lucide-react"

const apps = [
  {
    title: "Yu-Gi-Oh Deck Builder",
    description: "Build and manage your Yu-Gi-Oh decks.",
    href: "/apps/yugioh",
    icon: Swords,
    available: true,
  },
  {
    title: "Quiz App",
    description: "Create and take quizzes.",
    href: "/apps/quiz",
    icon: HelpCircle,
    available: false,
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>
        <form action={logout}>
          <Button variant="outline" size="sm" type="submit">Log out</Button>
        </form>
      </div>

      <h2 className="text-lg font-semibold mb-4">Your Apps</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {apps.map(({ title, description, href, icon: Icon, available }) => (
          <div key={href} className="rounded-xl border bg-card p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground flex-1">{description}</p>
            {available ? (
              <Link
                href={href}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start flex items-center gap-2")}
              >
                Open <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="text-xs text-muted-foreground">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
