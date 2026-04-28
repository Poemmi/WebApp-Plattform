"use client"

import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { YgoCard } from "@/features/yugioh/types"
import { CardItem } from "./CardItem"

type Props = {
  onAddCard: (card: YgoCard) => void
}

export function CardSearch({ onAddCard }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<YgoCard[]>([])
  const [isPending, startTransition] = useTransition()

  function handleSearch() {
    if (!query.trim()) return
    startTransition(async () => {
      const res = await fetch(`/api/yugioh/cards?q=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search cards…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isPending} size="icon" variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isPending && <p className="text-sm text-muted-foreground">Searching…</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
        {results.map((card) => (
          <CardItem key={card.id} card={card} onAdd={() => onAddCard(card)} />
        ))}
      </div>
    </div>
  )
}
