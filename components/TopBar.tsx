
import React from 'react';
import { Search, Bell, Wallet } from 'lucide-react';

export function TopBar() {
  return (
    <header className="w-full sticky top-0 z-40 bg-cyan-50/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 shadow-[0px_24px_48px_rgba(0,52,64,0.06)]">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            className="bg-surface-container-low border-none rounded-full pl-10 pr-6 py-2 w-64 focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/50 text-sm"
            placeholder="Search bills or friends..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
        </button>
        
        <button className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          <span className="font-bold">Rp 2.450.000</span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-sm">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjFp3G-8U7aCRFZqENvXq4kGh9WtC-53_5KorJZ2zZYqVHfOr6pnl9x5dPfKjrdz_voZ4KaguAoyJEBGcWRlX0zIbSptcv4GuDp4ZN6fRMxKz4v9iyoBB90NjOtDNnC9pndFbET63G3xTxwG6HxP5GQruBcqjvQBJNDajdGIw4oOWhseTmuc_kUcdhy7od6hHU5x_p41AXi3Bu7-OZaJMvxTk-fZ4K5M6GkfH-YdQOo6TGt09SeEJGpJxY4bR9JIp1pwr7_3QvZWio"
          />
        </div>
      </div>
    </header>
  );
}
