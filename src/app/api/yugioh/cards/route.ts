import { type NextRequest, NextResponse } from "next/server"
import { searchCards } from "@/features/yugioh/queries/cards"

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? ""

  if (!q.trim()) {
    return NextResponse.json([])
  }

  const cards = await searchCards(q)
  return NextResponse.json(cards)
}
