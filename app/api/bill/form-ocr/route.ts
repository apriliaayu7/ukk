import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { parseReceipt } from "@/lib/parseReceipt"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = body?.text

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        {
          error: "Text required",
          detail: "Body request harus punya field text",
        },
        { status: 400 }
      )
    }

    const parsed = parseReceipt(text)
    console.log("PARSED RECEIPT:", parsed)

    const cookieStore = await cookies()
    const userIdValue = cookieStore.get("userId")?.value

    if (!userIdValue) {
      return NextResponse.json(
        {
          error: "User belum login",
          detail: "Cookie userId tidak ada",
        },
        { status: 401 }
      )
    }

    const userId = Number(userIdValue)

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        {
          error: "userId cookie tidak valid",
          detail: `Nilai userId cookie: ${userIdValue}`,
        },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          error: "User tidak ditemukan",
          detail: `Tidak ada user dengan id ${userId}`,
        },
        { status: 404 }
      )
    }

    const bill = await prisma.bill.create({
      data: {
        title: parsed.merchant || "Scan Bill",
        total: parsed.grandTotal || 0,
        status: "BELUM",
        rawText: parsed.rawText,
        createdById: userId,
      },
    })

    await prisma.participant.create({
      data: {
        userId,
        name: user.name,
        billId: bill.id,
      },
    })

    if (parsed.items.length > 0) {
      await prisma.billItem.createMany({
        data: parsed.items.map((item) => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
          subtotal: item.price,
          billId: bill.id,
        })),
      })
    }

    return NextResponse.json({
      success: true,
      billId: bill.id,
      parsed,
    })
  } catch (err) {
    console.error("FROM OCR ERROR:", err)

    return NextResponse.json(
      {
        error: "Gagal proses OCR di server",
        detail: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}