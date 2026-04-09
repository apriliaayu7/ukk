"use client"
import { motion } from "framer-motion"

/* =======================
   TYPES (SESUAI PRISMA)
======================= */

type ParticipantType = {
  id: number
  userId: number
  billId: number
  totalShare: number
  isPaid: boolean
}

type ActiveBillType = {
  id: number
  title: string
  participants: ParticipantType[]
} | null

type ActiveSummaryType = {
  totalAmount: number
  isPaid: boolean
} | null

type RecentBillType = {
  id: number
  title: string
  total: number
  date: Date
  status: string
  participantsCount: number
}

type UserType = {
  name: string
  balance: number
}

type DashboardProps = {
  user: UserType
  activeBill: ActiveBillType
  activeSummary: ActiveSummaryType
  recentBills: RecentBillType[]
}

/* =======================
   COMPONENT
======================= */

export default function Dashboard({
  user,
  activeBill,
  activeSummary,
  recentBills,
}: DashboardProps) {
  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2">
            Halo, {user.name}!
          </h2>
          <p className="text-gray-500 text-lg">
            Waktunya melunasi tagihan bareng teman-teman.
          </p>
        </div>
      </section>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* ACTIVE BILL */}
        {activeBill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 lg:col-span-8 bg-linear-to-br from-primary to-primary-dim rounded-xl p-8 text-white shadow-xl"
          >
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                Tagihan Aktif
              </span>

              <h3 className="text-3xl font-black mt-4">
                {activeBill.title}
              </h3>

              <p className="text-white/80 mt-1">
                Bersama {activeBill.participants.length} orang
              </p>
            </div>

            <div className="flex justify-between items-end mt-10">
              <div>
                <span className="text-sm opacity-80">
                  Total Tagihan Kamu
                </span>
                <h2 className="text-5xl font-black">
                  Rp{" "}
                  {activeSummary?.totalAmount.toLocaleString() ?? 0}
                </h2>
              </div>

              <button className="bg-white text-black px-6 py-3 rounded-full font-bold">
                Bayar Sekarang
              </button>
            </div>
          </motion.div>
        )}

        {/* SALDO */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-highest rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Saldo Kamu</p>
          <h3 className="text-2xl font-black mt-2">
            Rp {user.balance.toLocaleString()}
          </h3>
        </div>

      </div>

      {/* RIWAYAT */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">
            Riwayat Patungan
          </h3>
        </div>

        <div className="bg-surface-container-low rounded-xl p-2 space-y-2">

          {recentBills.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-12 gap-4 items-center bg-white px-6 py-4 rounded-lg"
            >
              {/* TITLE */}
              <div className="col-span-5">
                <h4 className="font-bold">
                  {bill.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Split dengan {bill.participantsCount} orang
                </p>
              </div>

              {/* DATE */}
              <div className="col-span-3 text-center text-sm">
                {new Date(bill.date).toLocaleDateString()}
              </div>

              {/* TOTAL */}
              <div className="col-span-2 text-right font-bold">
                Rp {bill.total.toLocaleString()}
              </div>

              {/* STATUS */}
              <div className="col-span-2 text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    bill.status === "LUNAS"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
            </motion.div>
          ))}

        </div>
      </section>

    </div>
  )
}