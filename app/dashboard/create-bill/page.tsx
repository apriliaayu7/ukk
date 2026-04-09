import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"
import { CreateBill } from "@/components/CreateBill"

export default function Page() {
  return (
    <div className="flex">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <CreateBill />
        </main>

      </div>
    </div>
  )
}