import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { YgoCard } from "@/features/yugioh/types"

type Props = {
  card: YgoCard
  onAdd?: () => void
  quantity?: number
  onRemove?: () => void
}

export function CardItem({ card, onAdd, quantity, onRemove }: Props) {
  const image = card.card_images[0]

  return (
    <div className="rounded-lg border bg-card overflow-hidden flex flex-col">
      {image && (
        <div className="relative aspect-[421/614] w-full">
          <Image
            src={image.image_url_small}
            alt={card.name}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-2 flex items-center justify-between gap-1">
        <span className="text-xs font-medium line-clamp-2 flex-1">{card.name}</span>
        {onAdd && (
          <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" onClick={onAdd}>
            <Plus className="h-3 w-3" />
          </Button>
        )}
        {quantity !== undefined && onRemove && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">×{quantity}</span>
            <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" onClick={onRemove}>
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
