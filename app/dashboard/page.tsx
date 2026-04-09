import { prisma } from "@/lib/prisma"
import Dashboard from "@/components/Dashboard"

import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
export default async function DashboardPage() {
  const user = await prisma.user.findFirst({
    include: {
      participants: {
        include: {
          bill: {
            include: { participants: true }
          },
          summary: true
        }
      }
    }
  })

  if (!user) {
    return <div>Tidak ada data</div>
  }

  // 🔥 ambil bill aktif
  const activeParticipant = user.participants.find(
    p => p.bill.status === "BELUM"
  )

  const activeBill = activeParticipant?.bill || null
  const activeSummary = activeParticipant?.summary || null

  // 🔥 riwayat
  const recentBills = user.participants.map(p => ({
    id: p.bill.id,
    title: p.bill.title,
    total: p.bill.total,
    date: p.bill.date,
    status: p.bill.status,
    participantsCount: p.bill.participants.length,
  }))

  return (
  <div>
    
    {/* ✅ Sidebar (fixed kiri) */}
    <Sidebar />

    {/* ✅ TopBar (di atas, geser ke kanan biar gak ketimpa sidebar) */}
    <div className="ml-64">
      <TopBar />
    </div>

    {/* ✅ Main content */}
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