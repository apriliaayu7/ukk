import { NextResponse } from "next/server"
import Tesseract from "tesseract.js"
import { parseReceipt } from "@/lib/parseReceipt"

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    const result = await Tesseract.recognize(image, "eng")

    const text = result.data.text

    const items = parseReceipt(text)

    return NextResponse.json({ items })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ items: [] })
  }
}