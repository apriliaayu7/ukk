import { prisma } from "@/lib/prisma"
import Dashboard from "@/components/Dashboard"
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { cookies } from "next/headers"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const userIdValue = cookieStore.get("userId")?.value

  if (!userIdValue) {
    return <div>Belum login</div>
  }

  const userId = Number(userIdValue)

  if (Number.isNaN(userId)) {
    return <div>User tidak valid</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      participants: {
        include: {
          bill: {
            include: { participants: true },
          },
          summary: true,
        },
      },
    },
  })

  if (!user) {
    return <div>Tidak ada data</div>
  }

  const activeParticipant = user.participants.find(
    (p) => p.bill.status === "BELUM"
  )

  const activeBill = activeParticipant?.bill || null
  const activeSummary = activeParticipant?.summary || null

  const recentBills = user.participants.map((p) => ({
    id: p.bill.id,
    title: p.bill.title,
    total: p.bill.total,
    date: p.bill.date,
    status: p.bill.status,
    participantsCount: p.bill.participants.length,
  }))

  return (
    <div>
      <Sidebar />

      <div className="ml-64">
        <TopBar />
      </div>

      <main className="ml-64 pt-20 p-6">
        <Dashboard
          user={user}
          activeBill={activeBill}
          activeSummary={activeSummary}
          recentBills={recentBills}
        />
      </main>
    </div>
  )
}