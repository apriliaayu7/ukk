import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { AssignItems } from "@/components/AssignItems"

export default function Page() {
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-6">
          <AssignItems />
        </main>
      </div>
    </div>
  )
}