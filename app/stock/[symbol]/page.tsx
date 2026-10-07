"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_STOCKS } from "@/lib/mockData";
import StockChart from "@/components/StockChart";
import StockFundamentals from "@/components/StockFundamentals";
import OrderModal from "@/components/OrderModal";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function StockDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const [stock, setStock] = useState<any>(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [orderModal, setOrderModal] = useState<{ isOpen: boolean; type: "BUY" | "SELL" }>({
    isOpen: false,
    type: "BUY"
  });

  useEffect(() => {
    // In a real app, fetch from Supabase
    const found = MOCK_STOCKS.find(s => s.symbol === symbol);
    setStock(found);
  }, [symbol]);

  if (!stock) return <div className="p-8 animate-pulse">Loading stock data...</div>;

  const isPositive = stock.day_change_percent >= 0;

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    if (!isWatchlisted) {
      toast.success(`${stock.symbol} added to watchlist`);
    } else {
      toast(`${stock.symbol} removed from watchlist`);
    }
  };

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-xl font-bold">
            {stock.symbol.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{stock.symbol}</h1>
            <p className="text-text-muted">{stock.company_name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6">
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight">₹{stock.current_price.toLocaleString()}</div>
            <div className={`flex items-center justify-end gap-2 font-medium ${isPositive ? 'text-emerald' : 'text-crimson'}`}>
              {isPositive ? '+' : ''}{stock.day_change_percent}%
            </div>
          </div>
          <button 
            onClick={toggleWatchlist}
            className={`p-3 rounded-xl border transition-all ${
              isWatchlisted 
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' 
                : 'bg-surface border-border text-text-muted hover:text-text-primary hover:border-text-muted'
            }`}
          >
            <Star className={`w-5 h-5 ${isWatchlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <StockChart stock={stock} />
        </div>
        
        <div className="space-y-8">
          <StockFundamentals stock={stock} />
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-center lg:justify-end gap-4 pointer-events-auto">
          <button 
            onClick={() => setOrderModal({ isOpen: true, type: "SELL" })}
            className="w-32 py-3 rounded-full font-bold bg-crimson hover:bg-red-500 text-white transition-transform active:scale-95 shadow-lg"
          >
            SELL
          </button>
          <button 
            onClick={() => setOrderModal({ isOpen: true, type: "BUY" })}
            className="w-48 py-3 rounded-full font-bold bg-emerald hover:bg-[#0EA5E9] text-white transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            BUY
          </button>
        </div>
      </div>

      <OrderModal 
        isOpen={orderModal.isOpen} 
        onClose={() => setOrderModal({ ...orderModal, isOpen: false })} 
        stock={stock} 
        type={orderModal.type} 
      />
    </div>
  );
}
