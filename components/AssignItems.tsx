"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Check, ArrowRight } from "lucide-react"

type Item = {
  id: number
  name: string
  price: number
  assignedTo: number[]
}

type Participant = {
  id: number
  name: string
}

export function AssignItems() {
  const params = useSearchParams()
  const router = useRouter()

  const billId = params.get("billId")

  const [items, setItems] = useState<Item[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])

  // ✅ FETCH DATA (NO SETSTATE LOOP)
  useEffect(() => {
    if (!billId) return

    const fetchData = async () => {
      const res = await fetch(`/api/bill/${billId}`)
      const data = await res.json()

      setItems(
        data.items.map((i: { id: number; name: string; price: number }) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          assignedTo: []
        }))
      )

      setParticipants(data.participants)
    }

    fetchData()
  }, [billId])

  // ✅ TOGGLE ASSIGN
  const toggleAssign = (itemId: number, participantId: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const exists = item.assignedTo.includes(participantId)
          return {
            ...item,
            assignedTo: exists
              ? item.assignedTo.filter(id => id !== participantId)
              : [...item.assignedTo, participantId]
          }
        }
        return item
      })
    )
  }

  const subtotal = items.reduce((sum, i) => sum + i.price, 0)
  const tax = subtotal * 0.15
  const total = subtotal + tax

  // ✅ SAVE SPLIT
  const handleNext = async () => {
    await fetch(`/api/bill/${billId}/split`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })
    })

    router.push(`/dashboard/bill/${billId}`)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Assign Items</h2>

      <div className="grid grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded-xl">
            <h3 className="font-bold">{item.name}</h3>
            <p>Rp {item.price.toLocaleString()}</p>

            <div className="flex gap-2 mt-4">
              {participants.map(p => {
                const active = item.assignedTo.includes(p.id)

                return (
                  <button
                    key={p.id}
                    onClick={() => toggleAssign(item.id, p.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      active ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {p.name}
                    {active && <Check size={12} />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <p>Subtotal: Rp {subtotal.toLocaleString()}</p>
        <p>Tax: Rp {tax.toLocaleString()}</p>
        <h3 className="font-bold text-xl">
          Total: Rp {total.toLocaleString()}
        </h3>

        <button
          onClick={handleNext}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2"
        >
          Next <ArrowRight />
        </button>
      </div>
    </div>
  )
}