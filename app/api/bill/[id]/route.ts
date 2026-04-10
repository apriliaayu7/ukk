import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const billId = Number(params.id)

  const bill = await prisma.bill.findUnique({
    where: { id: billId },
    include: {
      items: true,
      participants: true,
    }
  })

  return NextResponse.json(bill)
}