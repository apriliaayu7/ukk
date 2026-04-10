import { Suspense } from "react"
import { AssignItems } from "@/components/AssignItems"

export default function AssignItemsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <AssignItems />
    </Suspense>
  )
}