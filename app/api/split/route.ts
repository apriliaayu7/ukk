import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { billId, items } = body

  // 🔥 ambil semua participant
  const participants = await prisma.participant.findMany({
    where: { billId }
  })

  let billTotal = 0

  // 🔥 reset dulu (biar ga dobel kalau re-run)
  await prisma.itemSplit.deleteMany({
    where: {
      billItem: { billId }
    }
  })

  await prisma.billItem.deleteMany({
    where: { billId }
  })

  await prisma.userBillSummary.deleteMany({
    where: { billId }
  })

  await prisma.participant.updateMany({
    where: { billId },
    data: { totalShare: 0 }
  })

  // 🔥 LOOP ITEMS
  for (const item of items) {

    const subtotal = item.price * item.quantity

    const billItem = await prisma.billItem.create({
      data: {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal,
        billId
      }
    })

    billTotal += subtotal

    const assignedCount = item.assignedTo.length || 1
    const splitAmount = Math.floor(subtotal / assignedCount)

    // 🔥 SPLIT KE PARTICIPANT
    for (const participantId of item.assignedTo) {
      await prisma.itemSplit.create({
        data: {
          billItemId: billItem.id,
          participantId,
          quantity: 1,
          subtotal: splitAmount
        }
      })

      await prisma.participant.update({
        where: { id: participantId },
        data: {
          totalShare: {
            increment: splitAmount
          }
        }
      })
    }
  }

  // 🔥 SUMMARY
  const updatedParticipants = await prisma.participant.findMany({
    where: { billId }
  })

  for (const p of updatedParticipants) {
    await prisma.userBillSummary.create({
      data: {
        billId,
        participantId: p.id,
        totalAmount: p.totalShare
      }
    })
  }

  // 🔥 UPDATE TOTAL BILL
  await prisma.bill.update({
    where: { id: billId },
    data: {
      total: billTotal
    }
  })

  return NextResponse.json({ success: true })
}