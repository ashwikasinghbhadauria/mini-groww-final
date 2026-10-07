"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

const INITIAL_INDICES = [
  { name: "Nifty 50", value: 22453.30, change: 125.40, percent: 0.56 },
  { name: "Sensex", value: 73982.15, change: -45.20, percent: -0.06 },
  { name: "Nifty Bank", value: 48932.50, change: 310.80, percent: 0.64 },
];

export default function MarketIndices() {
  const [indices, setIndices] = useState(INITIAL_INDICES);

  // Simulate live market ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(idx => {
        const fluctuation = (Math.random() - 0.5) * 10;
        const newValue = idx.value + fluctuation;
        const newChange = idx.change + fluctuation;
        const newPercent = (newChange / (newValue - newChange)) * 100;
        
        return {
          ...idx,
          value: Number(newValue.toFixed(2)),
          change: Number(newChange.toFixed(2)),
          percent: Number(newPercent.toFixed(2))
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Market Indices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div key={index.name} className="glass-card p-4 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex justify-between items-start">
                <span className="text-text-muted font-medium">{index.name}</span>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isPositive ? 'bg-emerald/10 text-emerald' : 'bg-crimson/10 text-crimson'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(index.percent)}%</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-2xl font-bold">{index.value.toLocaleString('en-IN')}</div>
                <div className={`text-sm mt-1 ${isPositive ? 'text-emerald' : 'text-crimson'}`}>
                  {isPositive ? '+' : ''}{index.change.toFixed(2)} pts
                </div>
              </div>
              
              {/* Sparkline placeholder */}
              <div className="mt-4 h-8 w-full opacity-50">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
                  <path 
                    d={`M0,10 Q25,${isPositive ? 5 : 15} 50,10 T100,${isPositive ? 2 : 18}`} 
                    fill="none" 
                    stroke={isPositive ? '#10B981' : '#F87171'} 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
