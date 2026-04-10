import { Suspense } from "react"
import { ScanPageContent } from "@/components/ScanPageContent"

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ScanPageContent />
    </Suspense>
  )
}