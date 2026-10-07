"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stock } from "@/lib/supabase";
import { X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { MOCK_PROFILE } from "@/lib/mockData";

type OrderType = "BUY" | "SELL";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
  type: OrderType;
}

export default function OrderModal({ isOpen, onClose, stock, type }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isDelivery, setIsDelivery] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Need a state to hold the current balance for this session since we aren't using a real global store
  const [currentBalance, setCurrentBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wallet_balance');
      if (stored) return parseFloat(stored);
    }
    return MOCK_PROFILE.wallet_balance;
  });

  const price = stock.current_price;
  const totalMargin = quantity * price;

  const handleConfirm = () => {
    if (type === "BUY" && totalMargin > currentBalance) {
      toast.error("Insufficient Funds", {
        description: `You need ₹${(totalMargin - currentBalance).toLocaleString()} more to execute this order.`
      });
      return;
    }

    // Simulate order execution
    setTimeout(() => {
      setIsSuccess(true);
      
      // Update balance mock
      const newBalance = type === "BUY" ? currentBalance - totalMargin : currentBalance + totalMargin;
      setCurrentBalance(newBalance);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wallet_balance', newBalance.toString());
        // Dispatch event for navbar to update
        window.dispatchEvent(new CustomEvent('balanceUpdate', { detail: { balance: newBalance } }));
      }

      toast.success(`Order Executed: ${type} ${quantity} ${stock.symbol}`);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setQuantity(1);
      }, 2000);
    }, 800);
  };

  const setPercent = (pct: number) => {
    if (type === "BUY") {
      const maxQty = Math.floor((currentBalance * (pct / 100)) / price);
      if (maxQty > 0) setQuantity(maxQty);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 w-full max-w-lg mx-auto z-50 pb-safe"
          >
            <div className="glass-panel rounded-t-3xl border-b-0 p-6">
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-16 h-16 text-emerald mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Order Successful</h2>
                  <p className="text-text-muted">
                    {type} {quantity} shares of {stock.symbol} at ₹{price.toLocaleString()}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        {type} {stock.symbol}
                        <span className="text-sm font-normal text-text-muted">NSE</span>
                      </h2>
                      <div className="text-sm font-semibold mt-1">₹{price.toLocaleString()}</div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-surface rounded-full hover:bg-surface/80">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Delivery / Intraday Toggle */}
                  <div className="flex p-1 bg-background rounded-full mb-6 border border-border">
                    <button 
                      onClick={() => setIsDelivery(true)}
                      className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${isDelivery ? 'bg-surface shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                    >
                      Delivery
                    </button>
                    <button 
                      onClick={() => setIsDelivery(false)}
                      className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors ${!isDelivery ? 'bg-surface shadow-sm' : 'text-text-muted hover:text-text-primary'}`}
                    >
                      Intraday
                    </button>
                  </div>

                  {/* Quantity Control */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2 text-text-muted">
                      <span>Quantity</span>
                      <span>Shares</span>
                    </div>
                    <div className="flex items-center justify-between bg-background border border-border rounded-xl p-2">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-surface/80 text-xl font-medium"
                      >-</button>
                      <input 
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 text-center bg-transparent font-bold text-xl focus:outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-surface/80 text-xl font-medium"
                      >+</button>
                    </div>
                  </div>

                  {/* Quick Percentages */}
                  {type === "BUY" && (
                    <div className="flex gap-2 mb-6">
                      {[25, 50, 75, 100].map(pct => (
                        <button 
                          key={pct}
                          onClick={() => setPercent(pct)}
                          className="flex-1 py-1.5 text-xs font-medium bg-surface border border-border rounded-lg hover:border-emerald/50 transition-colors"
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="space-y-3 mb-6 p-4 rounded-xl bg-background border border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Margin Required</span>
                      <span className="font-semibold">₹{totalMargin.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Available Balance</span>
                      <span className="font-semibold">₹{currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 text-white ${
                      type === "BUY" 
                        ? 'bg-emerald hover:bg-[#0EA5E9] shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                        : 'bg-crimson hover:bg-red-500 shadow-[0_0_15px_rgba(248,113,113,0.3)]'
                    }`}
                  >
                    CONFIRM {type}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
