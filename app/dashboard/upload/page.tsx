"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import Tesseract from "tesseract.js"

export default function UploadPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpload = async (file: File) => {
    try {
      setLoading(true)

      // 1. OCR dari gambar
      const result = await Tesseract.recognize(file, "eng")
      const text = result.data.text

      console.log("OCR TEXT:", text)

      // 2. Kirim hasil OCR ke backend
      const res = await fetch("/api/bill/form-ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const raw = await res.text()
      console.log("FORM OCR STATUS:", res.status)
      console.log("FORM OCR RAW:", raw)

      let data: any = {}
      try {
        data = raw ? JSON.parse(raw) : {}
      } catch {
        throw new Error("Response backend bukan JSON")
      }

      if (!res.ok) {
        throw new Error(data.error || "Gagal proses OCR")
      }

      if (!data.billId) {
        throw new Error("Bill ID tidak ditemukan")
      }

      // 3. Masuk ke halaman assign items
      router.push(`/dashboard/assign-items?billId=${data.billId}`)
    } catch (error) {
      console.error("UPLOAD ERROR:", error)
      alert(error instanceof Error ? error.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex flex-col items-center justify-center h-full gap-6 p-6">
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleUpload(file)
            }}
          />

          {loading && <p>Scanning struk...</p>}
        </main>
      </div>
    </div>
  )
}