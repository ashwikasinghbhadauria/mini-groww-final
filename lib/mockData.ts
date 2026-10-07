import { Stock } from "./supabase";

export const MOCK_STOCKS: Stock[] = [
  {
    id: "1",
    symbol: "RELIANCE",
    company_name: "Reliance Industries Ltd.",
    current_price: 2945.50,
    day_change_percent: 1.25,
    category: "Energy",
    market_cap: "₹19.9T",
    pe_ratio: 28.5,
    high_52w: 3024.90,
    low_52w: 2220.30
  },
  {
    id: "2",
    symbol: "TCS",
    company_name: "Tata Consultancy Services",
    current_price: 3890.20,
    day_change_percent: -0.45,
    category: "Tech",
    market_cap: "₹14.2T",
    pe_ratio: 31.2,
    high_52w: 4254.75,
    low_52w: 3112.50
  },
  {
    id: "3",
    symbol: "HDFCBANK",
    company_name: "HDFC Bank Ltd.",
    current_price: 1435.80,
    day_change_percent: 0.85,
    category: "Banking",
    market_cap: "₹10.9T",
    pe_ratio: 15.4,
    high_52w: 1757.50,
    low_52w: 1363.45
  },
  {
    id: "4",
    symbol: "INFY",
    company_name: "Infosys Ltd.",
    current_price: 1450.60,
    day_change_percent: 2.10,
    category: "Tech",
    market_cap: "₹6.1T",
    pe_ratio: 24.8,
    high_52w: 1733.00,
    low_52w: 1215.45
  },
  {
    id: "5",
    symbol: "TATAMOTORS",
    company_name: "Tata Motors Ltd.",
    current_price: 985.40,
    day_change_percent: 3.50,
    category: "Auto",
    market_cap: "₹3.2T",
    pe_ratio: 16.7,
    high_52w: 1065.60,
    low_52w: 400.40
  },
  {
    id: "6",
    symbol: "ICICIBANK",
    company_name: "ICICI Bank Ltd.",
    current_price: 1120.30,
    day_change_percent: 0.20,
    category: "Banking",
    market_cap: "₹7.8T",
    pe_ratio: 17.5,
    high_52w: 1169.30,
    low_52w: 899.00
  },
  {
    id: "7",
    symbol: "BHARTIARTL",
    company_name: "Bharti Airtel Ltd.",
    current_price: 1285.90,
    day_change_percent: -1.15,
    category: "Telecom",
    market_cap: "₹7.3T",
    pe_ratio: 55.4,
    high_52w: 1315.00,
    low_52w: 775.50
  },
  {
    id: "8",
    symbol: "ITC",
    company_name: "ITC Ltd.",
    current_price: 435.25,
    day_change_percent: 0.10,
    category: "FMCG",
    market_cap: "₹5.4T",
    pe_ratio: 25.1,
    high_52w: 499.70,
    low_52w: 399.30
  },
  {
    id: "9",
    symbol: "SBIN",
    company_name: "State Bank of India",
    current_price: 820.50,
    day_change_percent: 1.40,
    category: "Banking",
    market_cap: "₹7.3T",
    pe_ratio: 10.2,
    high_52w: 835.60,
    low_52w: 501.55
  },
  {
    id: "10",
    symbol: "LT",
    company_name: "Larsen & Toubro Ltd.",
    current_price: 3450.75,
    day_change_percent: 0.65,
    category: "Infrastructure",
    market_cap: "₹4.7T",
    pe_ratio: 35.8,
    high_52w: 3810.00,
    low_52w: 2167.95
  }
];

export const MOCK_PROFILE = {
  id: "user-1",
  full_name: "Demo User",
  wallet_balance: 100000.00
};
