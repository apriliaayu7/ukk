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
    setLoading(true)

    const result = await Tesseract.recognize(file, "eng")
    const text = result.data.text

    await fetch("/api/ocr", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
router.push(`/dashboard/assign-items?data=${encodeURIComponent(text)}`)
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