'use client';
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { InputMethod } from "@/components/InputMethod"

export default function Page() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-64 w-full">
        <TopBar />

        <InputMethod
          onNext={() => {
            // nanti diarahkan ke halaman scan / manual / upload
            window.location.href = "/dashboard/create-bill"
          }}
          onCancel={() => {
            window.location.href = "/dashboard"
          }}
        />
      </div>
    </div>
  )
}