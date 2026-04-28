"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { saveDeck } from "@/features/yugioh/actions/decks"
import { CardSearch } from "./CardSearch"
import { CardItem } from "./CardItem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import type { YgoCard, DeckCard } from "@/features/yugioh/types"

export function DeckBuilder() {
  const [deckName, setDeckName] = useState("")
  const [cards, setCards] = useState<(DeckCard & { card: YgoCard })[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const totalCards = cards.reduce((sum, c) => sum + c.quantity, 0)

  function addCard(card: YgoCard) {
    setCards((prev) => {
      const existing = prev.find((c) => c.cardId === card.id)
      if (existing) {
        if (existing.quantity >= 3) {
          toast.error("Maximum 3 copies per card")
          return prev
        }
        return prev.map((c) =>
          c.cardId === card.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, { cardId: card.id, quantity: 1, card }]
    })
  }

  function removeCard(cardId: number) {
    setCards((prev) => {
      const existing = prev.find((c) => c.cardId === cardId)
      if (!existing) return prev
      if (existing.quantity > 1) {
        return prev.map((c) =>
          c.cardId === cardId ? { ...c, quantity: c.quantity - 1 } : c
        )
      }
      return prev.filter((c) => c.cardId !== cardId)
    })
  }

  function handleSave() {
    if (!deckName.trim()) {
      toast.error("Please enter a deck name")
      return
    }
    if (cards.length === 0) {
      toast.error("Add at least one card")
      return
    }

    startTransition(async () => {
      const result = await saveDeck({
        name: deckName,
        cards: cards.map(({ cardId, quantity }) => ({ cardId, quantity })),
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Deck saved!")
        router.push("/apps/yugioh/decks")
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: card search */}
      <div>
        <h2 className="font-semibold mb-4">Search Cards</h2>
        <CardSearch onAddCard={addCard} />
      </div>

      <Separator className="lg:hidden" />

      {/* Right: current deck */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Current Deck ({totalCards} cards)</h2>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Deck name…"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
          <Button onClick={handleSave} disabled={isPending} className="shrink-0 gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>

        {cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Search for cards and add them to your deck.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {cards.map(({ cardId, quantity, card }) => (
              <CardItem
                key={cardId}
                card={card}
                quantity={quantity}
                onRemove={() => removeCard(cardId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
