export type YgoCardImage = {
  id: number
  image_url: string
  image_url_small: string
}

export type YgoCardPrice = {
  cardmarket_price: string
  tcgplayer_price: string
  ebay_price: string
  amazon_price: string
}

export type YgoCard = {
  id: number
  name: string
  type: string
  desc: string
  race: string
  atk?: number
  def?: number
  level?: number
  attribute?: string
  card_images: YgoCardImage[]
  card_prices: YgoCardPrice[]
}

export type YgoApiResponse = {
  data: YgoCard[]
}

export type DeckCard = {
  cardId: number
  quantity: number
  card?: YgoCard
}

export type Deck = {
  id: string
  name: string
  created_at: string
  cards?: DeckCard[]
}
