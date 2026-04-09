import { prisma } from "@/lib/prisma"
import BillDetail from "@/components/BillDetail"

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const bill = await prisma.bill.findUnique({
    where: { id: Number(params.id) },
    include: {
      participants: {
        include: {
          user: true
        }
      },
      items: true,
      summaries: true
    }
  })

  if (!bill) return <div>Tidak ditemukan</div>

  return <BillDetail bill={bill} />
}