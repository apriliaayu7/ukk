"use client"

import { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function ScanPageContent() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const params = useSearchParams()
  const billId = params.get("billId")

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("CAMERA ERROR:", error)
      alert("Kamera tidak bisa diakses")
    }
  }

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight

    ctx.drawImage(videoRef.current, 0, 0)

    const data = canvasRef.current.toDataURL("image/png")
    setImage(data)
  }

  const processOCR = async () => {
    if (!image) {
      alert("Ambil gambar dulu")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      })

      const raw = await res.text()

      let data: any = {}
      try {
        data = raw ? JSON.parse(raw) : {}
      } catch {
        throw new Error("Response OCR bukan JSON")
      }

      if (!res.ok) {
        throw new Error(data.error || "Gagal proses OCR")
      }

      const items = data?.data?.items || data?.items || []

      if (!items.length) {
        alert("Item tidak terbaca!")
        return
      }

      router.push(
        `/dashboard/assign-items?items=${encodeURIComponent(
          JSON.stringify(items)
        )}&billId=${billId || ""}`
      )
    } catch (error) {
      console.error("PROCESS OCR ERROR:", error)
      alert(error instanceof Error ? error.message : "Gagal proses OCR")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <video ref={videoRef} autoPlay className="w-full max-w-xl rounded-lg" />
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-3 mt-4">
        <button
          onClick={startCamera}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Start Camera
        </button>

        <button
          onClick={capture}
          className="px-4 py-2 rounded bg-green-500 text-white"
        >
          Capture
        </button>

        <button
          onClick={processOCR}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        >
          {loading ? "Processing..." : "Process"}
        </button>
      </div>

      {image && (
        <img
          src={image}
          alt="preview"
          className="mt-6 w-full max-w-xl rounded-lg border"
        />
      )}
    </div>
  )
}