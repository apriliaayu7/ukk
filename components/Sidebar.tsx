"use client"

import React from 'react';
import { Home, History, Users, User, Plus } from 'lucide-react';
import { useRouter, usePathname } from "next/navigation";

// kalau kamu punya cn di lib/utils, tetap pakai
import { cn } from '@/lib/utils';

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Home', icon: Home },
    { id: 'history', path: '/dashboard/history', label: 'History', icon: History },
    { id: 'friends', path: '/dashboard/friends', label: 'Friends', icon: Users },
    { id: 'profile', path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 rounded-r-xl shadow-xl flex flex-col py-10 gap-2 z-50">
      <div className="px-8 mb-10">
        <h1 className="text-3xl font-black bg-gradient-to-br from-blue-600 to-cyan-400 bg-clip-text text-transparent font-headline">
          Patungin
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          Split bills, stay friends
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 mx-4 rounded-full transition-all duration-300 group",
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:text-blue-600 hover:translate-x-2"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="font-headline font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-8 mt-auto">
        <button 
  onClick={() => router.push('/dashboard/create-bill')}
  className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
>
  <Plus className="w-5 h-5" />
  New Split
</button>
      </div>
    </aside>
  );
}