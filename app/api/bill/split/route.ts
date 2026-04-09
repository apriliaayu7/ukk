import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { billId, assignments } = await req.json()

    // assignments:
    // [{ itemId, participantIds: [] }]

    for (const item of assignments) {
      const dbItem = await prisma.billItem.findUnique({
        where: { id: item.itemId }
      })

      if (!dbItem) continue

      const splitPrice = Math.floor(dbItem.price / item.participantIds.length)

      for (const pid of item.participantIds) {
        await prisma.itemSplit.upsert({
          where: {
            billItemId_participantId: {
              billItemId: item.itemId,
              participantId: pid
            }
          },
          update: {},
          create: {
            billItemId: item.itemId,
            participantId: pid,
            quantity: 1,
            subtotal: splitPrice
          }
        })

        // update total participant
        await prisma.participant.update({
          where: { id: pid },
          data: {
            totalShare: {
              increment: splitPrice
            }
          }
        })
      }
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Split gagal" }, { status: 500 })
  }
}