import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Body = {
  title: string
  friends: string[]
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()

    if (!body.title) {
      return NextResponse.json({ error: "Title required" }, { status: 400 })
    }

    const bill = await prisma.bill.create({
      data: {
        title: body.title,
        total: 0,
        status: "BELUM",
        createdById: 1, // sementara
      }
    })

    // 🔥 simpan participants
    if (body.friends?.length > 0) {
      await prisma.participant.createMany({
        data: body.friends.map(name => ({
          name,
          billId: bill.id,
          userId: 1
        }))
      })
    }

    return NextResponse.json(bill)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "FAILED" }, { status: 500 })
  }
}