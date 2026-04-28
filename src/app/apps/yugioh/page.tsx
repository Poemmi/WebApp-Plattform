import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Swords, Plus, List } from "lucide-react"

export default function YugiohPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Swords className="h-7 w-7" />
        <h1 className="text-2xl font-bold">Yu-Gi-Oh Deck Builder</h1>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4">
          <Plus className="h-6 w-6 text-primary" />
          <h2 className="font-semibold">New Deck</h2>
          <p className="text-sm text-muted-foreground flex-1">
            Search cards and build a new deck from scratch.
          </p>
          <Link href="/apps/yugioh/builder" className={cn(buttonVariants({ size: "sm" }))}>Start Building</Link>
        </div>

        <div className="rounded-xl border bg-card p-6 flex flex-col gap-4">
          <List className="h-6 w-6 text-primary" />
          <h2 className="font-semibold">My Decks</h2>
          <p className="text-sm text-muted-foreground flex-1">
            View, edit, or delete your saved decks.
          </p>
          <Link href="/apps/yugioh/decks" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>View Decks</Link>
        </div>
      </div>
    </div>
  )
}
