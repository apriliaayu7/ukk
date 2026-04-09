/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */


"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  QrCode, 
  Edit3, 
  Share2, 
  Check, 
  ArrowRight, 
  Smartphone, 
  Play, 
  TrendingUp, 
  Users, 
  Globe, 
  Share,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

import Link from "next/link";

// --- Components ---

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <nav className="w-full top-0 sticky z-50 glass-nav">
    <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
      <div className="text-2xl font-black italic text-primary font-headline cursor-pointer">Patungin</div>
      <div className="hidden md:flex items-center gap-8">
        <a className="font-headline font-bold text-primary border-b-2 border-primary transition-colors" href="#">Product</a>
        <a className="font-headline font-bold text-outline hover:text-primary transition-colors" href="#">Features</a>
        <a className="font-headline font-bold text-outline hover:text-primary transition-colors" href="#">Pricing</a>
        <a className="font-headline font-bold text-outline hover:text-primary transition-colors" href="#">About</a>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onLoginClick}
          className="font-headline font-bold text-primary transition-transform active:scale-95"
        >
          Masuk
        </button>
        <Link href="/register">
 <button className="bg-linear-to-r from-primary to-primary-container text-white px-6 py-2.5 rounded-full font-headline font-bold shadow-lg transition-transform active:scale-95">
          Mulai Sekarang
        </button>
</Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-20 pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <span className="inline-block py-1 px-4 rounded-full bg-secondary-container text-secondary font-label text-sm font-bold mb-6">
          #PatunginPulse
        </span>
        <h1 className="text-6xl md:text-7xl leading-[1.1] font-headline font-extrabold tracking-tighter text-on-surface mb-8">
          Patungan <span className="text-primary italic">Tanpa Drama</span>
        </h1>
        <p className="text-xl text-outline font-medium max-w-xl mb-10 leading-relaxed">
          Bagi tagihan instan, adil, dan transparan. Nggak perlu lagi nunggu transferan yang nggak kunjung datang.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-linear-to-r from-primary to-primary-container text-white px-10 py-4 rounded-full font-headline font-bold text-lg shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
            Mulai Sekarang
          </button>
          <button className="bg-surface-container-lowest text-primary px-10 py-4 rounded-full font-headline font-bold text-lg border border-outline-variant/15 transition-all hover:bg-surface-container-low active:scale-95">
            Lihat Demo
          </button>
        </div>
        <div className="mt-12 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-highest overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <p className="text-sm font-label font-semibold text-outline">Dipercaya oleh 50,000+ Gen Z Indonesia</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px]"></div>
        <div className="relative bg-surface-container-lowest rounded-xl p-4 shadow-2xl rotate-3 transform-gpu">
          <img 
            className="w-full h-125 object-cover rounded-lg" 
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1000" 
            alt="Friends"
            referrerPolicy="no-referrer"
          />
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur p-6 rounded-lg shadow-xl -rotate-6 max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-primary w-5 h-5 fill-primary/10" />
              <span className="font-bold text-sm">Paid!</span>
            </div>
            <p className="text-xs text-outline font-medium">Budi baru saja membayar bagiannya Rp 85.000</p>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute -right-8 bottom-12 bg-primary p-6 rounded-lg shadow-xl rotate-3 text-white"
          >
            <p className="text-xs opacity-80 mb-1">Total Bill</p>
            <p className="text-2xl font-black">Rp 1.250.000</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-[#001a20] text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">
            Fitur Canggih,<br/><span className="text-[#00e5ff]">Tanpa Ribet.</span>
          </h2>
          <p className="text-outline-variant text-lg">
            Hapus keganjalan saat nagih utang ke temen. Biarkan Patungin yang urus semuanya secara otomatis dan transparan.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <QrCode className="text-[#00e5ff] w-8 h-8" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4">Scan</h3>
          <p className="text-outline-variant leading-relaxed mb-6">
            Cukup foto struk belanjaanmu, AI kami akan otomatis mendeteksi setiap item dan harganya.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-surface-container-highest">
              <Check className="w-4 h-4" /> OCR Akurasi Tinggi
            </li>
            <li className="flex items-center gap-2 text-sm text-surface-container-highest">
              <Check className="w-4 h-4" /> Deteksi Pajak & Service
            </li>
          </ul>
        </div>

        <div className="group p-10 bg-primary rounded-xl relative overflow-hidden shadow-2xl transform md:-translate-y-6">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Edit3 className="w-32 h-32" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Edit3 className="text-white w-8 h-8" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4">Manual</h3>
          <p className="text-white/80 leading-relaxed mb-6">
            Input tagihan secara fleksibel. Bagi rata atau tentukan siapa makan apa dengan satu sentuhan jari.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-white/90">
              <Check className="w-4 h-4" /> Custom Split Shares
            </li>
            <li className="flex items-center gap-2 text-sm text-white/90">
              <Check className="w-4 h-4" /> Item-based Assignment
            </li>
          </ul>
        </div>

        <div className="group p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Share2 className="text-secondary-container w-8 h-8" />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-4">Share</h3>
          <p className="text-outline-variant leading-relaxed mb-6">
            Kirim link tagihan via WhatsApp. Temen kamu bisa langsung bayar pake QRIS atau E-Wallet favorit.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-surface-container-highest">
              <Check className="w-4 h-4" /> Notifikasi Otomatis
            </li>
            <li className="flex items-center gap-2 text-sm text-surface-container-highest">
              <Check className="w-4 h-4" /> Integrasi QRIS & Bank
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24 bg-background">
    <div className="max-w-7xl mx-auto px-8">
      <div className="bg-surface-container-low rounded-xl p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-right"></div>
        <div className="flex-1 relative z-10">
          <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface mb-8">
            Siap Berbagi Seru Tanpa Pusing?
          </h2>
          <p className="text-xl text-outline mb-10 max-w-lg">
            Bergabunglah dengan komunitas yang nggak pernah ribut soal kembalian.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-zinc-800 transition-colors">
              <Smartphone className="w-8 h-8" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold opacity-60">Download on the</p>
                <p className="text-lg font-bold leading-tight">App Store</p>
              </div>
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-zinc-800 transition-colors">
              <Play className="w-8 h-8 fill-current" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold opacity-60">Get it on</p>
                <p className="text-lg font-bold leading-tight">Google Play</p>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-surface-container-lowest p-6 rounded-lg shadow-xl transform -translate-y-8"
            >
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-on-secondary-container w-6 h-6" />
              </div>
              <p className="text-xs text-outline mb-1 font-bold">Total Savings</p>
              <p className="text-2xl font-black text-on-surface">Rp 4.2M+</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-surface-container-lowest p-6 rounded-lg shadow-xl translate-y-4"
            >
              <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
                <Users className="text-on-primary-container w-6 h-6" />
              </div>
              <p className="text-xs text-outline mb-1 font-bold">Active Circles</p>
              <p className="text-2xl font-black text-on-surface">12.4K</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#001a20] text-[#82b5c6] py-16">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-black italic text-[#00e5ff] font-headline mb-6">Patungin</div>
          <p className="text-sm leading-relaxed mb-6">
            Solusi cerdas bagi tagihan untuk gaya hidup modern. Transparan, adil, dan tanpa drama.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
              <Share className="w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Smart Scan</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Split Logic</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">E-Wallet Link</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Premium Plans</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">About Us</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Careers</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Press Kit</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-headline font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm">
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Terms of Service</a></li>
            <li><a className="hover:text-[#00e5ff] transition-colors" href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <p>© 2024 Patungin Indonesia. All rights reserved.</p>
        <div className="flex gap-8">
          <p>Designed with Love for Gen Z</p>
          <p>🇮🇩 Made in Jakarta</p>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <div className="min-h-screen bg-background">
    <Navbar onLoginClick={onLoginClick} />
    <Hero />
    <Features />
    <CTA />
    <Footer />
  </div>
);

const LoginPage = ({ onBackClick }: { onBackClick: () => void }) => (
  <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col relative overflow-hidden">
    {/* Background Fluid Shapes */}
    <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-surface-container rounded-full blur-[120px] opacity-60 z-0"></div>
    <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-secondary-container/30 rounded-full blur-[100px] opacity-40 z-0"></div>

    <main className="flex-grow flex items-center justify-center p-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-surface-container-lowest rounded-xl p-10 md:p-14 shadow-[0px_24px_48px_rgba(0,52,64,0.06)] relative overflow-hidden">
          <button 
            onClick={onBackClick}
            className="absolute top-6 left-6 text-outline hover:text-primary transition-colors"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>

          <div className="mb-12 flex flex-col items-center text-center">
            <h1 className="font-headline font-black italic text-4xl text-primary tracking-tighter mb-2">Patungin</h1>
            <p className="text-outline font-medium tracking-wide font-label uppercase text-xs">The Neon Oasis</p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              <label className="font-label text-sm font-semibold text-outline px-1" htmlFor="identifier">Email or Username</label>
              <input 
                className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-outline-variant outline-none" 
                id="identifier" 
                placeholder="yourname@email.com" 
                type="text"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-sm font-semibold text-outline" htmlFor="password">Password</label>
                <a className="text-xs font-bold text-primary hover:text-primary-dim" href="#">Lupa?</a>
              </div>
              <input 
                className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-outline-variant outline-none" 
                id="password" 
                placeholder="••••••••" 
                type="password"
              />
            </div>

            <div className="pt-4">
              <button className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-extrabold text-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Masuk
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-outline-variant opacity-20"></div>
              <span className="flex-shrink mx-4 text-outline text-xs font-bold font-label">ATAU LANJUT DENGAN</span>
              <div className="flex-grow border-t border-outline-variant opacity-20"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
                <img 
                  alt="Google" 
                  className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" 
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                  referrerPolicy="no-referrer"
                />
                <span className="font-label font-bold text-sm text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
                <Smartphone className="w-5 h-5 text-on-surface" />
                <span className="font-label font-bold text-sm text-on-surface">Apple</span>
              </button>
            </div>

            <div className="text-center pt-6">
              <p className="text-outline font-medium">Belum punya akun? 
                <a className="text-primary font-bold hover:underline underline-offset-4 ml-1" href="#">Daftar Sekarang</a>
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 p-2">
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary-container rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-xs font-bold text-outline uppercase tracking-widest opacity-60">
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Terms</a>
          <a className="hover:text-primary transition-colors" href="#">Help</a>
        </div>
      </motion.div>
    </main>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login'>('landing');

  return (
    <div className="antialiased">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onLoginClick={() => setCurrentPage('login')} />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginPage onBackClick={() => setCurrentPage('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}