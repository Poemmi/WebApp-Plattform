import { createClient } from "@/lib/supabase/server"
import type { Deck } from "@/features/yugioh/types"

export async function getDecksForUser(): Promise<Deck[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("ygo_decks")
    .select("id, name, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) return []
  return data as Deck[]
}

export async function getDeckWithCards(deckId: string): Promise<Deck | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: deck, error: deckError } = await supabase
    .from("ygo_decks")
    .select("id, name, created_at")
    .eq("id", deckId)
    .eq("user_id", user.id)
    .single()

  if (deckError || !deck) return null

  const { data: cards } = await supabase
    .from("ygo_deck_cards")
    .select("card_id, quantity")
    .eq("deck_id", deckId)

  return {
    ...deck,
    cards: (cards ?? []).map((c) => ({ cardId: c.card_id, quantity: c.quantity })),
  } as Deck
}
