import { NextResponse } from "next/server"
import { parseReceipt } from "@/lib/parseReceipt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = body?.text

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const parsed = parseReceipt(text)

    return NextResponse.json({
      success: true,
      data: parsed,
    })
  } catch (error) {
    console.error("OCR ERROR:", error)

    return NextResponse.json(
      { success: false, error: "Failed to process OCR" },
      { status: 500 }
    )
  }
}