import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Trash2, Eye } from "lucide-react"
import { deleteDeck } from "@/features/yugioh/actions/decks"
import type { Deck } from "@/features/yugioh/types"

type Props = {
  decks: Deck[]
}

export function DeckList({ decks }: Props) {
  if (decks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        You have no decks yet.{" "}
        <Link href="/apps/yugioh/builder" className="underline">Create one</Link>.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
        >
          <div>
            <p className="font-medium">{deck.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(deck.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/apps/yugioh/decks/${deck.id}`}
              className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
            >
              <Eye className="h-4 w-4" />
            </Link>
            <form
              action={async () => {
                "use server"
                await deleteDeck(deck.id)
              }}
            >
              <Button size="icon" variant="ghost" type="submit">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
