import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { InputMethod } from "@/components/InputMethod"

export default function Page() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-6">
          <InputMethod />
        </main>
      </div>
    </div>
  )
}