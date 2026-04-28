import { z } from "zod"

export const saveDeckSchema = z.object({
  name: z.string().min(1, "Deck name is required").max(100),
  cards: z
    .array(
      z.object({
        cardId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(3),
      })
    )
    .min(1, "Deck must have at least one card")
    .max(60, "Deck cannot exceed 60 cards"),
})

export type SaveDeckInput = z.infer<typeof saveDeckSchema>
