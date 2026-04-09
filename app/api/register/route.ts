import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const body = await req.json()

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  })

  if (existingUser) {
    return Response.json({ error: "Email sudah digunakan" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  })

  // 🔥 FIX DI SINI
  const cookieStore = await cookies()

  cookieStore.set("userId", String(user.id), {
    httpOnly: true,
    path: "/",
  })

  return Response.json(user)
}