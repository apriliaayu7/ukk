import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { billId, name, price, splits } = await req.json()

    if (!billId || !name || !price || !Array.isArray(splits)) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      )
    }

    const item = await prisma.billItem.create({
      data: {
        name,
        quantity: 1,
        price,
        subtotal: price,
        billId,
      },
    })

    const participants = await prisma.participant.findMany({
      where: { billId },
      select: {
        id: true,
        userId: true,
        name: true,
      },
    })

    const perPerson = splits.length > 0 ? Math.floor(price / splits.length) : 0

    for (const userId of splits as number[]) {
      const participant = participants.find(
        (p) => p.userId !== null && p.userId === userId
      )

      if (!participant) continue

      await prisma.itemSplit.create({
        data: {
          billItemId: item.id,
          participantId: participant.id,
          quantity: 1,
          subtotal: perPerson,
        },
      })

      await prisma.participant.update({
        where: { id: participant.id },
        data: {
          totalShare: {
            increment: perPerson,
          },
        },
      })
    }

    await prisma.bill.update({
      where: { id: billId },
      data: {
        total: {
          increment: price,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("BILL ITEM ERROR:", error)

    return NextResponse.json(
      { error: "Gagal tambah item" },
      { status: 500 }
    )
  }
}