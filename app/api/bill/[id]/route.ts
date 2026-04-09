import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const billId = Number(params.id)

    if (!billId) {
      return NextResponse.json(
        { error: "Invalid billId" },
        { status: 400 }
      )
    }

    const bill = await prisma.bill.findUnique({
      where: {
        id: billId
      },
      include: {
        items: true,
        participants: true
      }
    })

    if (!bill) {
      return NextResponse.json(
        { error: "Bill not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(bill)

  } catch (error) {
    console.error("GET BILL ERROR:", error)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}