import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Layers, Swords, HelpCircle, ArrowRight } from "lucide-react"

const apps = [
  {
    title: "Yu-Gi-Oh Deck Builder",
    description: "Search cards, build decks, and manage your collection.",
    href: "/apps/yugioh",
    icon: Swords,
    status: "available" as const,
  },
  {
    title: "Quiz App",
    description: "Create and play quizzes on any topic.",
    href: "/apps/quiz",
    icon: HelpCircle,
    status: "coming-soon" as const,
  },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <Layers className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Poemmi</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A modular platform for web apps. Log in to get started.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <Link href="/login" className={cn(buttonVariants())}>Log in</Link>
          <Link href="/signup" className={cn(buttonVariants({ variant: "outline" }))}>Sign up</Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {apps.map(({ title, description, href, icon: Icon, status }) => (
          <div
            key={href}
            className="rounded-xl border bg-card p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">{title}</h2>
                {status === "coming-soon" && (
                  <span className="text-xs text-muted-foreground">Coming soon</span>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex-1">{description}</p>
            {status === "available" && (
              <Link
                href={href}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-start flex items-center gap-2")}
              >
                Open <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
