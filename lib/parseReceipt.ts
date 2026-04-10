export type ParsedItem = {
  name: string
  qty: number
  price: number
}

export type ParsedReceipt = {
  merchant: string | null
  date: string | null
  time: string | null
  subtotal: number | null
  tax: number | null
  grandTotal: number | null
  items: ParsedItem[]
  rawText: string
}

function toNumber(value: string): number {
  return Number(value.replace(/[^\d]/g, ""))
}

function cleanLine(line: string): string {
  return line.replace(/\s+/g, " ").trim()
}

function isMetaLine(line: string): boolean {
  const lower = line.toLowerCase()

  const blocked = [
    "date",
    "time in",
    "info",
    "purpose",
    "cashier",
    "subtotal",
    "grand total",
    "qris",
    "qris pos",
    "pb1",
    "pbi",
    "items",
    "terima kasih",
    "pelanggan",
    "nomor",
  ]

  return blocked.some((word) => lower.includes(word))
}

function parseItemLine(line: string): ParsedItem | null {
  const cleaned = cleanLine(line)
  if (!cleaned) return null
  if (isMetaLine(cleaned)) return null

  const match = cleaned.match(/^(\d+)\s+(.+?)\s+(\d[\d.]*)$/)
  if (!match) return null

  const qty = Number(match[1])
  const name = match[2].trim()
  const price = toNumber(match[3])

  if (!qty || !name || !price) return null

  return { qty, name, price }
}

export function parseReceipt(text: string): ParsedReceipt {
  const lines = text.split("\n").map(cleanLine).filter(Boolean)

  let merchant: string | null = null
  let date: string | null = null
  let time: string | null = null
  let subtotal: number | null = null
  let tax: number | null = null
  let grandTotal: number | null = null
  const items: ParsedItem[] = []

  for (const line of lines) {
    const lower = line.toLowerCase()

    if (!merchant && lower.includes("dikichi")) {
      merchant = line
    }

    if (!date) {
      const dateMatch = line.match(/(\d{2}-\d{2}-\d{4})/)
      if (dateMatch) date = dateMatch[1]
    }

    if (!time) {
      const timeMatch = line.match(/(\d{2}:\d{2})/)
      if (timeMatch) time = timeMatch[1]
    }

    if (lower.includes("subtotal")) {
      const match = line.match(/subtotal\s*:?\s*(\d[\d.]*)/i)
      if (match) subtotal = toNumber(match[1])
      continue
    }

    if (lower.includes("pbi") || lower.includes("pb1")) {
      const match = line.match(/(pbi|pb1)\s*:?\s*(\d[\d.]*)/i)
      if (match) tax = toNumber(match[2])
      continue
    }

    if (lower.includes("grand total")) {
      const match = line.match(/grand total\s*:?\s*(\d[\d.]*)/i)
      if (match) grandTotal = toNumber(match[1])
      continue
    }

    const parsedItem = parseItemLine(line)
    if (parsedItem) {
      items.push(parsedItem)
    }
  }

  return {
    merchant,
    date,
    time,
    subtotal,
    tax,
    grandTotal,
    items,
    rawText: text,
  }
}