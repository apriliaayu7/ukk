import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { parseReceipt } from "@/lib/parseReceipt"
import { cookies } from "next/headers"

export async function GET() {
  return NextResponse.json({ message: "form-ocr API ready" })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = body?.text

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text required" },
        { status: 400 }
      )
    }

    const parsed = parseReceipt(text)
    console.log("PARSED RECEIPT:", parsed)

    const cookieStore = await cookies()
    const userIdValue = cookieStore.get("userId")?.value

    if (!userIdValue) {
      return NextResponse.json(
        { error: "User belum login" },
        { status: 401 }
      )
    }

    const loginUserId = Number(userIdValue)

    if (Number.isNaN(loginUserId)) {
      return NextResponse.json(
        { error: "userId cookie tidak valid" },
        { status: 400 }
      )
    }

    const loginUser = await prisma.user.findUnique({
      where: { id: loginUserId },
    })

    if (!loginUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      )
    }

    // ambil bill terakhir user login
    const lastBill = await prisma.bill.findFirst({
      where: {
        createdById: loginUserId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        participants: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    })

    // buat bill baru
    const bill = await prisma.bill.create({
      data: {
        title: parsed.merchant || "Scan Bill",
        total: parsed.grandTotal || 0,
        status: "BELUM",
        rawText: parsed.rawText,
        createdById: loginUserId,
      },
    })

    // participant yang akan dicopy
    const participantList: { userId: number; name: string }[] = [
      {
        userId: loginUser.id,
        name: loginUser.name,
      },
    ]

    // copy participant dari bill terakhir
    if (lastBill) {
      for (const p of lastBill.participants) {
        if (typeof p.userId !== "number") continue

        const exists = participantList.some(
          (x) =>
            x.userId === p.userId &&
            x.name.trim().toLowerCase() === p.name.trim().toLowerCase()
        )

        if (!exists) {
          participantList.push({
            userId: p.userId,
            name: p.name,
          })
        }
      }
    }

    // simpan participant ke bill baru
    if (participantList.length > 0) {
      await prisma.participant.createMany({
        data: participantList.map((p) => ({
          userId: p.userId,
          name: p.name,
          billId: bill.id,
        })),
        skipDuplicates: true,
      })
    }

    // simpan item struk
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
      participants: participantList,
      parsed,
    })
  } catch (err) {
    console.error("FORM OCR ERROR:", err)

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Gagal proses OCR di server",
      },
      { status: 500 }
    )
  }
}