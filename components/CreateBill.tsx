"use client"

import React, { useState } from "react"
import {
  Calendar,
  Minus,
  Plus,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Loader2,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"
import { useRouter } from "next/navigation"

type Friend = {
  id: string
  name: string
}

type CreateBillResponse = {
  id?: number
  success?: boolean
  error?: string
  message?: string
}

export function CreateBill() {
  const [tax, setTax] = useState(10)
  const [title, setTitle] = useState("Nongkrong Starbak")

  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

  const [inputName, setInputName] = useState("")
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const router = useRouter()

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const addFriend = () => {
    if (!inputName.trim()) return

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: inputName.trim(),
    }

    setFriends((prev) => [...prev, newFriend])
    setInputName("")
  }

  const selectedData = friends.filter((f) => selectedFriends.includes(f.id))

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)

    try {
      const res = await fetch("/api/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          tax,
          friends: selectedData.map((f) => f.name),
        }),
      })

      const text = await res.text()
      console.log("SAVE DRAFT STATUS:", res.status)
      console.log("SAVE DRAFT RAW RESPONSE:", text)

      let data: CreateBillResponse = {}

      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        throw new Error("Response bukan JSON")
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || "Gagal simpan draft")
      }

      alert("Draft berhasil disimpan!")
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Gagal simpan draft")
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleNext = async () => {
    setIsLoadingNext(true)

    try {
      const res = await fetch("/api/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          tax,
          friends: selectedData.map((f) => f.name),
        }),
      })

      const text = await res.text()
      console.log("NEXT STATUS:", res.status)
      console.log("NEXT RAW RESPONSE:", text)

      let data: CreateBillResponse = {}

      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        throw new Error("Response bukan JSON")
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || "Gagal membuat bill")
      }

      if (!data.id) {
        throw new Error("ID bill tidak ditemukan")
      }

      router.push(`/dashboard/input-method?billId=${data.id}`)
    } catch (err: unknown) {
      console.error(err)

      const message =
        err instanceof Error ? err.message : "Gagal membuat bill"

      alert(message)
    } finally {
      setIsLoadingNext(false)
    }
  }

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <span className="text-outline font-bold text-sm tracking-widest uppercase mb-2 block">
            Step 1 of 3
          </span>
          <h2 className="text-4xl font-black text-on-surface tracking-tight font-headline">
            Create New Bill
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 items-start">
        <section className="col-span-12 lg:col-span-7 space-y-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

            <label className="block text-outline font-headline font-bold text-sm uppercase mb-4">
              Bill Information
            </label>

            <input
              className="w-full bg-transparent border-none text-5xl font-black outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex items-center gap-2 mt-4 text-outline">
              <Calendar className="w-4 h-4" />
              <span>Today</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <label className="text-sm font-bold uppercase">
                  Tax & Service
                </label>
                <p className="text-sm">Applied to total</p>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-full p-2">
                <button onClick={() => setTax(Math.max(0, tax - 1))}>
                  <Minus />
                </button>

                <span className="text-3xl font-black w-16 text-center">
                  {tax}%
                </span>

                <button onClick={() => setTax(Math.min(100, tax + 1))}>
                  <Plus />
                </button>
              </div>
            </div>

            <div className="h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${tax}%` }}
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 shadow">
            <div className="flex justify-between mb-8">
              <div>
                <label className="text-sm font-bold uppercase">
                  Invite Friends
                </label>
                <p className="text-sm">Who are we splitting with today?</p>
              </div>

              <div className="flex gap-2">
                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Add friend..."
                  className="border rounded-full px-4"
                />
                <button
                  onClick={addFriend}
                  className="bg-black text-white px-4 rounded-full"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {friends.length === 0 && (
                <p className="text-gray-400 text-sm">Belum ada teman</p>
              )}

              {friends.map((friend) => {
                const isSelected = selectedFriends.includes(friend.id)

                return (
                  <button
                    key={friend.id}
                    onClick={() => toggleFriend(friend.id)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl",
                      isSelected ? "bg-primary text-white" : "bg-gray-100"
                    )}
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                      {friend.name[0]}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold">{friend.name}</h4>
                      <span className="text-xs">
                        {isSelected ? "Selected" : "Click to add"}
                      </span>
                    </div>

                    {isSelected ? <CheckCircle /> : <Plus />}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5 sticky top-8">
          <div className="bg-black text-white rounded-xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-8">Summary Preview</h3>

            <div className="space-y-6">
              <div className="flex justify-between border-b pb-4">
                <span>Bill Title</span>
                <span>{title}</span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span>Friends Invited</span>
                <span>{selectedData.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>{tax}%</span>
              </div>

              <button
                onClick={handleNext}
                disabled={isLoadingNext}
                className="w-full bg-blue-500 py-4 rounded-full flex justify-center gap-2 disabled:opacity-60"
              >
                {isLoadingNext ? (
                  <>
                    <Loader2 className="animate-spin" /> Loading...
                  </>
                ) : (
                  <>
                    Selanjutnya <ArrowRight />
                  </>
                )}
              </button>

              <button
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="w-full bg-white/10 py-4 rounded-full flex justify-center gap-2 disabled:opacity-60"
              >
                {isSavingDraft && <Loader2 className="animate-spin" />}
                Save as Draft
              </button>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 p-6 rounded-xl flex gap-4">
            <Lightbulb />
            <p className="text-sm">
              Adding a clear title helps your friends find the bill faster.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}