import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getDeckWithCards } from "@/features/yugioh/queries/decks"
import { getCardById } from "@/features/yugioh/queries/cards"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

export default async function DeckViewPage({ params }: Props) {
  const { id } = await params
  const deck = await getDeckWithCards(id)
  if (!deck) notFound()

  const cardDetails = await Promise.all(
    (deck.cards ?? []).map(async (c) => ({
      ...c,
      card: await getCardById(c.cardId),
    }))
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/apps/yugioh/decks" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6 gap-2 flex items-center w-fit")}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-2">{deck.name}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {cardDetails.reduce((sum, c) => sum + c.quantity, 0)} cards ·{" "}
        {new Date(deck.created_at).toLocaleDateString()}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {cardDetails.map(({ cardId, quantity, card }) =>
          card ? (
            Array.from({ length: quantity }).map((_, i) => (
              <div key={`${cardId}-${i}`} className="flex flex-col gap-1">
                <div className="relative aspect-[421/614] w-full rounded overflow-hidden border">
                  <Image
                    src={card.card_images[0].image_url_small}
                    alt={card.name}
                    fill
                    sizes="(max-width: 640px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs line-clamp-1">{card.name}</p>
              </div>
            ))
          ) : null
        )}
      </div>
    </div>
  )
}
