"use client";

import { MOCK_STOCKS } from "@/lib/mockData";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<any[]>([]);

  useEffect(() => {
    // Generate some mock holdings based on the mock stocks
    const mockHoldings = [
      { stock: MOCK_STOCKS[0], quantity: 15, avg_buy: 2850.00 }, // RELIANCE
      { stock: MOCK_STOCKS[2], quantity: 40, avg_buy: 1390.50 }, // HDFCBANK
      { stock: MOCK_STOCKS[4], quantity: 100, avg_buy: 950.00 }, // TATAMOTORS
    ];
    setHoldings(mockHoldings);
  }, []);

  const totalInvested = holdings.reduce((sum, h) => sum + (h.quantity * h.avg_buy), 0);
  const currentValue = holdings.reduce((sum, h) => sum + (h.quantity * h.stock.current_price), 0);
  const totalReturn = currentValue - totalInvested;
  const returnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;
  const isPositive = totalReturn >= 0;

  return (
    <div className="animate-in fade-in duration-500">
      <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-3 mb-8">
        <Briefcase className="w-8 h-8 text-emerald" />
        <h1 className="text-3xl font-bold tracking-tight">Your Portfolio</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6">
          <div className="text-sm text-text-muted mb-2">Total Invested</div>
          <div className="text-3xl font-bold">₹{totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>
        
        <div className="glass-card p-6">
          <div className="text-sm text-text-muted mb-2">Current Value</div>
          <div className="text-3xl font-bold">₹{currentValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>
        
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            {isPositive ? <ArrowUpRight className="w-16 h-16" /> : <ArrowDownRight className="w-16 h-16" />}
          </div>
          <div className="text-sm text-text-muted mb-2">Total Returns</div>
          <div className={`text-3xl font-bold flex items-center gap-2 ${isPositive ? 'text-emerald' : 'text-crimson'}`}>
            {isPositive ? '+' : ''}₹{totalReturn.toLocaleString(undefined, {minimumFractionDigits: 2})}
          </div>
          <div className={`text-sm mt-1 font-medium ${isPositive ? 'text-emerald' : 'text-crimson'}`}>
            {isPositive ? '+' : ''}{returnPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Holdings ({holdings.length})</h2>
      
      {/* Holdings Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-text-muted">Stock</th>
                <th className="p-4 font-semibold text-text-muted text-right">Qty</th>
                <th className="p-4 font-semibold text-text-muted text-right">Avg Price</th>
                <th className="p-4 font-semibold text-text-muted text-right">LTP</th>
                <th className="p-4 font-semibold text-text-muted text-right">Current Value</th>
                <th className="p-4 font-semibold text-text-muted text-right">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {holdings.map((h, i) => {
                const invested = h.quantity * h.avg_buy;
                const current = h.quantity * h.stock.current_price;
                const pnl = current - invested;
                const pnlPct = (pnl / invested) * 100;
                const isPos = pnl >= 0;

                return (
                  <tr key={i} className="hover:bg-surface/30 transition-colors">
                    <td className="p-4">
                      <Link href={`/stock/${h.stock.symbol}`} className="font-semibold hover:text-emerald transition-colors">
                        {h.stock.symbol}
                      </Link>
                      <div className="text-xs text-text-muted mt-0.5">{h.stock.company_name}</div>
                    </td>
                    <td className="p-4 text-right font-medium">{h.quantity}</td>
                    <td className="p-4 text-right font-medium">₹{h.avg_buy.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="p-4 text-right font-medium">₹{h.stock.current_price.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="p-4 text-right font-bold">₹{current.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className="p-4 text-right">
                      <div className={`font-bold ${isPos ? 'text-emerald' : 'text-crimson'}`}>
                        {isPos ? '+' : ''}₹{pnl.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </div>
                      <div className={`text-xs ${isPos ? 'text-emerald' : 'text-crimson'}`}>
                        {isPos ? '+' : ''}{pnlPct.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
