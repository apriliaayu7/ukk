interface Participant {
  id: number
  name: string
  totalShare: number
}

interface Bill {
  title: string
  total: number
  participants: Participant[]
}

export default function BillDetail({ bill }: { bill: Bill }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{bill.title}</h1>

      <p className="mb-6 text-lg">
        Total: Rp {bill.total}
      </p>

      <div className="space-y-3">
        {bill.participants.map(p => (
          <div key={p.id} className="flex justify-between border p-3 rounded-xl">
            <span>{p.name}</span>
            <span>Rp {p.totalShare}</span>
          </div>
        ))}
      </div>
    </div>
  )
}