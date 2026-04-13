import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      id: 5,
      name: "sabub",
      email: "sabub@gmail.com",
      password: "123456",
      balance: 2450000,
    },
  })
}

main()