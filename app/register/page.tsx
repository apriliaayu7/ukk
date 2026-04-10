"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Semua field wajib diisi")
      return
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const text = await res.text()
      console.log("REGISTER STATUS:", res.status)
      console.log("REGISTER RESPONSE:", text)

      let data: any = {}
      try {
        data = text ? JSON.parse(text) : {}
      } catch (e) {
        console.error("Response bukan JSON:", text)
        alert("Response backend bukan JSON")
        return
      }

      if (!res.ok) {
        alert(data.error || "Terjadi kesalahan saat register")
        return
      }

      alert("Register berhasil")
      router.push(`/dashboard?userId=${data.id}`)
    } catch (error) {
      console.error("REGISTER FETCH ERROR:", error)
      alert("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20">
      <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md flex justify-between items-center px-6 md:px-12 py-4">
        <div className="text-2xl font-black italic text-primary font-headline tracking-tight cursor-pointer">
          Patungin
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-outline font-medium hover:text-primary transition-colors duration-300 font-headline"
          >
            How it Works
          </a>
          <a
            href="#"
            className="text-outline font-medium hover:text-primary transition-colors duration-300 font-headline"
          >
            Security
          </a>
          <a
            href="#"
            className="text-outline font-medium hover:text-primary transition-colors duration-300 font-headline"
          >
            Support
          </a>
        </nav>

        <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2 rounded-full font-bold transition-transform active:scale-95 duration-200 shadow-sm hover:shadow-md">
          Sign In
        </button>
      </header>

      <main className="grow flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-2xl z-10"
        >
          <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-[0px_24px_48px_rgba(0,52,64,0.06)] border border-outline-variant flex flex-col items-center">
            <div className="text-center mb-10">
              <h1 className="text-on-background font-headline font-extrabold text-4xl md:text-5xl tracking-tight mb-3">
                Create Your Account
              </h1>
              <p className="text-outline font-body text-lg">
                Experience the future of fair splitting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <label className="text-outline font-headline text-sm font-semibold px-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border-none rounded-2xl px-4 py-4 text-on-background focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline/40 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-outline font-headline text-sm font-semibold px-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border-none rounded-2xl px-4 py-4 text-on-background focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline/40 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
              <div className="space-y-2">
                <label className="text-outline font-headline text-sm font-semibold px-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border-none rounded-2xl px-4 py-4 text-on-background focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline/40 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-outline font-headline text-sm font-semibold px-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border-none rounded-2xl px-4 py-4 text-on-background focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline/40 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98] mt-8 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Mulai Sekarang"}
            </button>

            <div className="w-full flex items-center gap-4 my-8">
              <div className="h-px grow bg-outline-variant" />
              <span className="text-outline text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                Or Continue With
              </span>
              <div className="h-px grow bg-outline-variant" />
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-background hover:bg-primary-container/10 transition-colors py-4 rounded-2xl font-semibold text-on-background">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 5.84-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>

              <button className="flex items-center justify-center gap-3 bg-background hover:bg-primary-container/10 transition-colors py-4 rounded-2xl font-semibold text-on-background">
                Apple
              </button>
            </div>

            <p className="mt-10 font-body text-outline">
              Already have an account?
              <a
                href="#"
                className="text-primary font-bold hover:underline decoration-primary-container underline-offset-4 ml-1"
              >
                Login here
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full py-12 px-6 md:px-12 bg-primary-container/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-bold text-on-background font-headline italic">
            Patungin
          </div>
          <p className="font-body text-sm text-outline">
            © 2024 Patungin. The Neon Oasis of Finance.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="font-body text-sm text-outline hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="font-body text-sm text-outline hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="font-body text-sm text-outline hover:text-primary transition-colors">
            Cookie Settings
          </a>
        </div>
      </footer>
    </div>
  )
}