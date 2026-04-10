import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const billId = Number(id)

    if (Number.isNaN(billId)) {
      return NextResponse.json(
        { error: "Bill ID tidak valid" },
        { status: 400 }
      )
    }

    const bill = await prisma.bill.findUnique({
      where: { id: billId },
      include: {
        items: true,
        participants: true,
      },
    })

    if (!bill) {
      return NextResponse.json(
        { error: "Bill tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(bill)
  } catch (error) {
    console.error("GET BILL ERROR:", error)
    return NextResponse.json(
      { error: "Gagal mengambil bill" },
      { status: 500 }
    )
  }
}