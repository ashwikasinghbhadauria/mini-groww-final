"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { Stock } from "@/lib/supabase";

export default function StockChart({ stock }: { stock: Stock }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState("1M");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const isPositive = stock.day_change_percent >= 0;
    const lineColor = isPositive ? '#10B981' : '#F87171';
    const topColor = isPositive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(248, 113, 113, 0.4)';
    const bottomColor = isPositive ? 'rgba(16, 185, 129, 0.0)' : 'rgba(248, 113, 113, 0.0)';

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94A3B8',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor,
      topColor,
      bottomColor,
      lineWidth: 2,
    });

    // Generate mock data based on timeframe
    const data = generateMockData(stock.current_price, timeframe);
    areaSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [stock, timeframe]);

  return (
    <div className="glass-card p-4">
      {/* Timeframe Pills */}
      <div className="flex gap-2 mb-4 justify-end">
        {["1D", "1W", "1M", "1Y", "ALL"].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              timeframe === tf 
                ? 'bg-emerald text-white' 
                : 'bg-surface border border-border text-text-muted hover:text-text-primary'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
}

function generateMockData(basePrice: number, timeframe: string) {
  const data = [];
  const now = new Date();
  
  let days = 30;
  if (timeframe === '1D') days = 1;
  else if (timeframe === '1W') days = 7;
  else if (timeframe === '1Y') days = 365;
  else if (timeframe === 'ALL') days = 1000;

  let currentVal = basePrice * (0.8 + Math.random() * 0.4); // Start somewhere related

  for (let i = days; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    currentVal = currentVal + (Math.random() - 0.48) * (basePrice * 0.02); // slight upward bias
    data.push({ time, value: currentVal });
  }

  // Ensure last point is the current price
  data[data.length - 1].value = basePrice;
  return data;
}
