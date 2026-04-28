export type Profile = {
  id: string
  email: string
  created_at: string
}

export type YgoDeck = {
  id: string
  user_id: string
  name: string
  created_at: string
}

export type YgoDeckCard = {
  id: string
  deck_id: string
  card_id: number
  quantity: number
}

export type YgoFavorite = {
  id: string
  user_id: string
  card_id: number
}
