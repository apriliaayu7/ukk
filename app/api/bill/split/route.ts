import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { billId, assignments } = await req.json()

    if (!billId || !Array.isArray(assignments)) {
      return NextResponse.json(
        { error: "billId dan assignments wajib diisi" },
        { status: 400 }
      )
    }

    for (const item of assignments) {
      const dbItem = await prisma.billItem.findUnique({
        where: { id: item.itemId },
      })

      if (!dbItem) continue
      if (!item.participantIds || item.participantIds.length === 0) continue

      const splitPrice = Math.floor(dbItem.price / item.participantIds.length)

      for (const pid of item.participantIds) {
        await prisma.itemSplit.upsert({
          where: {
            billItemId_participantId: {
              billItemId: item.itemId,
              participantId: pid,
            },
          },
          update: {
            quantity: 1,
            subtotal: splitPrice,
          },
          create: {
            billItemId: item.itemId,
            participantId: pid,
            quantity: 1,
            subtotal: splitPrice,
          },
        })

        await prisma.participant.update({
          where: { id: pid },
          data: {
            totalShare: {
              increment: splitPrice,
            },
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("SPLIT ERROR:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Split gagal" },
      { status: 500 }
    )
  }
}