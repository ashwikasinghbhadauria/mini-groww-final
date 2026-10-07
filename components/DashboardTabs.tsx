"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_STOCKS } from "@/lib/mockData";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TABS = ["Stocks", "Mutual Funds", "F&O", "US Stocks"];
const SECTORS = ["Tech", "Banking", "Energy", "Auto", "FMCG"];

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-4 px-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab ? "text-text-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[400px]">
        {activeTab === "Stocks" && <StocksContent />}
        {activeTab === "Mutual Funds" && <MutualFundsContent />}
        {activeTab === "F&O" && <PlaceholderContent title="Futures & Options" />}
        {activeTab === "US Stocks" && <PlaceholderContent title="US Stocks" />}
      </div>
    </div>
  );
}

function StocksContent() {
  const topGainers = [...MOCK_STOCKS].sort((a, b) => b.day_change_percent - a.day_change_percent).slice(0, 4);
  const topLosers = [...MOCK_STOCKS].sort((a, b) => a.day_change_percent - b.day_change_percent).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Sectors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sectors</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {SECTORS.map((sector) => (
            <button key={sector} className="px-4 py-2 rounded-full border border-border bg-surface hover:border-emerald/50 transition-colors whitespace-nowrap text-sm">
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald">Top Gainers</h3>
            <button className="text-sm text-text-muted hover:text-emerald flex items-center">See All <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {topGainers.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-crimson">Top Losers</h3>
            <button className="text-sm text-text-muted hover:text-emerald flex items-center">See All <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {topLosers.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StockCard({ stock }: { stock: any }) {
  const isPositive = stock.day_change_percent >= 0;
  return (
    <Link href={`/stock/${stock.symbol}`}>
      <div className="glass-card p-4 hover:scale-[1.02] transition-transform">
        <div className="font-semibold">{stock.symbol}</div>
        <div className="text-xs text-text-muted truncate mt-0.5">{stock.company_name}</div>
        <div className="mt-4 flex items-end justify-between">
          <span className="font-bold">₹{stock.current_price.toLocaleString('en-IN')}</span>
          <span className={`text-sm ${isPositive ? 'text-emerald' : 'text-crimson'}`}>
            {isPositive ? '+' : ''}{stock.day_change_percent}%
          </span>
        </div>
      </div>
    </Link>
  );
}

function MutualFundsContent() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-20"
    >
      <div className="inline-block p-4 rounded-full bg-surface mb-4">
        <svg className="w-8 h-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Mutual Funds Integration</h3>
      <p className="text-text-muted max-w-md mx-auto">
        Live NAV data fetching from mfapi.in will be implemented here. Explore curated funds and track your SIPs.
      </p>
    </motion.div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center py-20"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-muted">Coming soon in the next prototype phase.</p>
    </motion.div>
  );
}
