import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const userId = Number(cookieStore.get("userId")?.value)

  const users = await prisma.user.findMany({
    where: {
      id: { not: userId }
    },
    select: {
      id: true,
      name: true,
    }
  })

  return Response.json(users)
}