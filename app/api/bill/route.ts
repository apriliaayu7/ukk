import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

type Body = {
  title: string
  friends?: string[]
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()
    const { title, friends = [] } = body

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title required" },
        { status: 400 }
      )
    }

    // ambil user login dari cookie
    const cookieStore = await cookies()
    const userIdCookie = cookieStore.get("userId")?.value

    // TEMP: Untuk testing, gunakan user pertama jika tidak ada cookie
    let currentUserId: number

    if (userIdCookie) {
      currentUserId = Number(userIdCookie)
      if (Number.isNaN(currentUserId)) {
        return NextResponse.json(
          { error: "userId cookie tidak valid" },
          { status: 400 }
        )
      }
    } else {
      // TEMP: Ambil user pertama untuk testing
      const firstUser = await prisma.user.findFirst()
      if (!firstUser) {
        return NextResponse.json(
          { error: "Tidak ada user di database. Silakan register dulu." },
          { status: 404 }
        )
      }
      currentUserId = firstUser.id
    }

    // pastikan user pembuat bill ada
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId }
    })

    if (!currentUser) {
      return NextResponse.json(
        { error: "User pembuat bill tidak ditemukan" },
        { status: 404 }
      )
    }

    // rapikan daftar nama teman
    const cleanFriends = Array.from(
      new Set(
        friends
          .map((name) => name.trim())
          .filter((name) => name.length > 0)
      )
    )

    const result = await prisma.$transaction(async (tx) => {
      // 1. buat bill
      const bill = await tx.bill.create({
        data: {
          title: title.trim(),
          total: 0,
          status: "BELUM",
          createdById: currentUser.id,
        }
      })

      // 2. participant creator sendiri
      await tx.participant.create({
        data: {
          userId: currentUser.id,
          name: currentUser.name,
          billId: bill.id,
        }
      })

      let addedParticipants: { id: number; name: string }[] = []
      let skippedFriends: string[] = []

      if (cleanFriends.length > 0) {
        // cari user yang namanya cocok
        const foundUsers = await tx.user.findMany({
          where: {
            name: {
              in: cleanFriends
            }
          },
          select: {
            id: true,
            name: true
          }
        })

        // buang user creator sendiri kalau namanya ikut masuk
        const validUsers = foundUsers.filter(
          (user) => user.id !== currentUser.id
        )

        // deduplicate by user id
        const uniqueUsersMap = new Map<number, { id: number; name: string }>()
        for (const user of validUsers) {
          if (!uniqueUsersMap.has(user.id)) {
            uniqueUsersMap.set(user.id, user)
          }
        }

        const uniqueUsers = Array.from(uniqueUsersMap.values())

        // Create participants for existing users
        if (uniqueUsers.length > 0) {
          await tx.participant.createMany({
            data: uniqueUsers.map((user) => ({
              userId: user.id,
              name: user.name,
              billId: bill.id,
            })),
            skipDuplicates: true,
          })
        }

        // Create participants for friends that don't exist as users yet
        const foundNames = new Set(uniqueUsers.map((u) => u.name))
        const newFriends = cleanFriends.filter((name) => !foundNames.has(name))

        if (newFriends.length > 0) {
          await tx.participant.createMany({
            data: newFriends.map((name) => ({
              userId: null,
              name: name,
              billId: bill.id,
            })),
          })
        }

        addedParticipants = [...uniqueUsers, ...newFriends.map(name => ({ id: 0, name }))] // id will be set by database
        skippedFriends = []
      }

      return {
        bill,
        addedParticipants,
        skippedFriends,
      }
    })

    return NextResponse.json({
      id: result.bill.id,
      title: result.bill.title,
      total: result.bill.total,
      status: result.bill.status,
      participantsAdded: result.addedParticipants,
      skippedFriends: result.skippedFriends,
      success: true,
    })
  } catch (err) {
    console.error("CREATE BILL ERROR:", err)

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "FAILED",
      },
      { status: 500 }
    )
  }
}