"use client"

import { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [image, setImage] = useState<string | null>(null)

  const router = useRouter()
  const params = useSearchParams()
  const billId = params.get("billId")

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.current) {
      videoRef.current.srcObject = stream
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
  if (!image) return

  const res = await fetch("/api/ocr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ image })
  })

  const data = await res.json()

  if (!data.items || data.items.length === 0) {
    alert("Item tidak terbaca!")
    return
  }

  router.push(
    `/dashboard/assign-items?items=${encodeURIComponent(
      JSON.stringify(data.items)
    )}&billId=${billId}`
  )
}

  return (
    <div className="p-6">
      <video ref={videoRef} autoPlay className="w-full" />
      <canvas ref={canvasRef} className="hidden" />

      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capture}>Capture</button>
      <button onClick={processOCR}>Process</button>

      {image && <img src={image} alt="preview" />}
    </div>
  )
}