"use client";

import { Search, Bell, Wallet, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCK_PROFILE } from "@/lib/mockData";

export default function Navbar() {
  const [balance, setBalance] = useState(MOCK_PROFILE.wallet_balance);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Listen to custom event for balance update across components
    const handleBalanceUpdate = (e: any) => {
      setBalance(e.detail.balance);
    };
    window.addEventListener('balanceUpdate', handleBalanceUpdate);
    return () => window.removeEventListener('balanceUpdate', handleBalanceUpdate);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-20"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald"></span>
            </div>
            <span className="text-xl font-bold tracking-tight">Groww Pulse</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-muted group-hover:text-emerald transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-16 py-2 border border-border rounded-full bg-surface/50 text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-emerald focus:border-emerald transition-all"
                placeholder="Search stocks, mutual funds..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs text-text-muted border border-border rounded px-1.5 py-0.5">⌘K</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border">
              <div className="w-2 h-2 rounded-full bg-emerald"></div>
              <span className="text-xs font-medium text-emerald">Markets Open</span>
            </div>

            <Link href="/portfolio">
              <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border hover:border-emerald/50 transition-colors cursor-pointer">
                <Wallet className="h-4 w-4 text-emerald" />
                <span className="text-sm font-semibold">
                  {mounted ? `₹${balance.toLocaleString('en-IN')}` : '---'}
                </span>
              </div>
            </Link>

            <button className="p-2 text-text-muted hover:text-text-primary transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-crimson ring-2 ring-background"></span>
            </button>

            <button className="p-1 rounded-full text-text-muted hover:text-emerald transition-colors">
              <UserCircle className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
