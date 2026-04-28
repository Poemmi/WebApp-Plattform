"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { saveDeckSchema } from "@/features/yugioh/schemas"

export async function saveDeck(input: unknown) {
  const parsed = saveDeckSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { name, cards } = parsed.data

  const { data: deck, error: deckError } = await supabase
    .from("ygo_decks")
    .insert({ name, user_id: user.id })
    .select("id")
    .single()

  if (deckError || !deck) return { error: "Failed to create deck" }

  const cardRows = cards.map((c) => ({
    deck_id: deck.id,
    card_id: c.cardId,
    quantity: c.quantity,
  }))

  const { error: cardsError } = await supabase
    .from("ygo_deck_cards")
    .insert(cardRows)

  if (cardsError) return { error: "Failed to save cards" }

  revalidatePath("/apps/yugioh/decks")
  return { success: true, deckId: deck.id }
}

export async function deleteDeck(deckId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("ygo_decks")
    .delete()
    .eq("id", deckId)
    .eq("user_id", user.id)

  if (error) return { error: "Failed to delete deck" }

  revalidatePath("/apps/yugioh/decks")
  return { success: true }
}
