import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { billId, name, price, splits } = await req.json()

  const item = await prisma.billItem.create({
    data: {
      name,
      quantity: 1,
      price,
      subtotal: price,
      billId,
    }
  })

  const participants = await prisma.participant.findMany({
    where: { billId }
  })

  const perPerson = Math.floor(price / splits.length)

  for (const userId of splits) {
    const participant = participants.find(p => p.userId === userId)
    if (!participant) continue

    await prisma.itemSplit.create({
      data: {
        billItemId: item.id,
        participantId: participant.id,
        quantity: 1,
        subtotal: perPerson,
      }
    })

    await prisma.participant.update({
      where: { id: participant.id },
      data: {
        totalShare: {
          increment: perPerson
        }
      }
    })
  }

  await prisma.bill.update({
    where: { id: billId },
    data: {
      total: {
        increment: price
      }
    }
  })

  return Response.json({ success: true })
}