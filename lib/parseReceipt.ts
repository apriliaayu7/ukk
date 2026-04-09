type Item = {
  name: string
  price: number
  quantity: number
}

export function parseReceipt(text: string): Item[] {
  const lines = text.split("\n")

  const items: Item[] = []

  for (const line of lines) {
    const clean = line.trim()

    // ❌ skip header & metadata
    if (
      clean.toLowerCase().includes("date") ||
      clean.toLowerCase().includes("time") ||
      clean.toLowerCase().includes("total") ||
      clean.toLowerCase().includes("subtotal") ||
      clean.toLowerCase().includes("pb1") ||
      clean.toLowerCase().includes("qris") ||
      clean.toLowerCase().includes("cashier") ||
      clean.length < 5
    ) continue

    // 🔥 MATCH: qty + name + price
    const match = clean.match(/^(\d+)\s+(.*?)\s+([\d.,]+)$/)

    if (match) {
      const qty = Number(match[1])
      const name = match[2]

      // 🔥 convert 33.636 → 33636
      const price = Number(match[3].replace(/\./g, "").replace(/,/g, ""))

      if (!isNaN(price) && price > 500) {
        items.push({
          name,
          price,
          quantity: qty
        })
      }
    }
  }

  return items
}