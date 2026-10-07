import { Stock } from "@/lib/supabase";

export default function StockFundamentals({ stock }: { stock: Stock }) {
  // Calculate where the current price sits in the 52W range
  const range = stock.high_52w - stock.low_52w;
  const position = ((stock.current_price - stock.low_52w) / range) * 100;
  const clampedPosition = Math.max(0, Math.min(100, position));

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-6">Fundamentals</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-sm text-text-muted mb-1">Market Cap</div>
          <div className="font-semibold">{stock.market_cap}</div>
        </div>
        <div>
          <div className="text-sm text-text-muted mb-1">P/E Ratio</div>
          <div className="font-semibold">{stock.pe_ratio}</div>
        </div>
        <div>
          <div className="text-sm text-text-muted mb-1">Sector</div>
          <div className="font-semibold">{stock.category}</div>
        </div>
        <div>
          <div className="text-sm text-text-muted mb-1">Div Yield</div>
          <div className="font-semibold">1.2%</div>
        </div>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-muted">52W Low: <strong className="text-text-primary">₹{stock.low_52w.toLocaleString()}</strong></span>
          <span className="text-text-muted">52W High: <strong className="text-text-primary">₹{stock.high_52w.toLocaleString()}</strong></span>
        </div>
        
        {/* Slider Bar */}
        <div className="relative h-2 bg-surface border border-border rounded-full w-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-crimson via-yellow-500 to-emerald w-full opacity-30"></div>
          
          {/* Indicator */}
          <div 
            className="absolute top-0 h-full w-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ left: `calc(${clampedPosition}% - 4px)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
