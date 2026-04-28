import type { YgoApiResponse, YgoCard } from "@/features/yugioh/types"

const BASE_URL = "https://db.ygoprodeck.com/api/v7"

export async function searchCards(query: string): Promise<YgoCard[]> {
  if (!query.trim()) return []

  const url = `${BASE_URL}/cardinfo.php?fname=${encodeURIComponent(query)}&num=20&offset=0`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) return []

  const json: YgoApiResponse = await res.json()
  return json.data ?? []
}

export async function getCardById(id: number): Promise<YgoCard | null> {
  const url = `${BASE_URL}/cardinfo.php?id=${id}`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) return null

  const json: YgoApiResponse = await res.json()
  return json.data?.[0] ?? null
}
