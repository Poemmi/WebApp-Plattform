import Link from "next/link"
import { getDecksForUser } from "@/features/yugioh/queries/decks"
import { DeckList } from "@/features/yugioh/components/DeckList"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

export default async function DecksPage() {
  const decks = await getDecksForUser()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Decks</h1>
        <Link href="/apps/yugioh/builder" className={cn(buttonVariants({ size: "sm" }), "flex items-center gap-2")}>
          <Plus className="h-4 w-4" /> New Deck
        </Link>
      </div>
      <DeckList decks={decks} />
    </div>
  )
}
