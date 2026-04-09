import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { billId } = await req.json()

  const participants = await prisma.participant.findMany({
    where: { billId }
  })

  for (const p of participants) {
    await prisma.userBillSummary.upsert({
      where: { participantId: p.id },
      update: {
        totalAmount: p.totalShare
      },
      create: {
        billId,
        participantId: p.id,
        totalAmount: p.totalShare
      }
    })
  }

  return NextResponse.json({ success: true })
}