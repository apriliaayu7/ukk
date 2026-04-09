import { NextResponse } from "next/server"
import { parseReceipt } from "@/lib/parseReceipt"

export async function POST(req: Request) {
  const body = await req.json()

  const { text } = body

  const items = parseReceipt(text)

  return NextResponse.json({
    success: true,
    items
  })
}