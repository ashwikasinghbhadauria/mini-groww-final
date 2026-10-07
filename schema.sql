-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  wallet_balance DECIMAL(12, 2) DEFAULT 100000.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Stocks Table
CREATE TABLE stocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  symbol VARCHAR(20) UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  current_price DECIMAL(10, 2) NOT NULL,
  day_change_percent DECIMAL(5, 2) NOT NULL,
  category VARCHAR(50),
  market_cap TEXT,
  pe_ratio DECIMAL(8, 2),
  high_52w DECIMAL(10, 2),
  low_52w DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Holdings Table
CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  avg_buy_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, stock_id)
);

-- 4. Watchlist Table
CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, stock_id)
);

-- 5. Transactions Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
  type VARCHAR(10) CHECK (type IN ('BUY', 'SELL')),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Seed Data: Top 10 Indian Stocks
INSERT INTO stocks (symbol, company_name, current_price, day_change_percent, category, market_cap, pe_ratio, high_52w, low_52w) VALUES
('RELIANCE', 'Reliance Industries Ltd.', 2945.50, 1.25, 'Energy', '₹19.9T', 28.5, 3024.90, 2220.30),
('TCS', 'Tata Consultancy Services', 3890.20, -0.45, 'Tech', '₹14.2T', 31.2, 4254.75, 3112.50),
('HDFCBANK', 'HDFC Bank Ltd.', 1435.80, 0.85, 'Banking', '₹10.9T', 15.4, 1757.50, 1363.45),
('INFY', 'Infosys Ltd.', 1450.60, 2.10, 'Tech', '₹6.1T', 24.8, 1733.00, 1215.45),
('TATAMOTORS', 'Tata Motors Ltd.', 985.40, 3.50, 'Auto', '₹3.2T', 16.7, 1065.60, 400.40),
('ICICIBANK', 'ICICI Bank Ltd.', 1120.30, 0.20, 'Banking', '₹7.8T', 17.5, 1169.30, 899.00),
('BHARTIARTL', 'Bharti Airtel Ltd.', 1285.90, -1.15, 'Telecom', '₹7.3T', 55.4, 1315.00, 775.50),
('ITC', 'ITC Ltd.', 435.25, 0.10, 'FMCG', '₹5.4T', 25.1, 499.70, 399.30),
('SBIN', 'State Bank of India', 820.50, 1.40, 'Banking', '₹7.3T', 10.2, 835.60, 501.55),
('LT', 'Larsen & Toubro Ltd.', 3450.75, 0.65, 'Infrastructure', '₹4.7T', 35.8, 3810.00, 2167.95);

-- Create a demo user profile
INSERT INTO profiles (full_name, wallet_balance) VALUES ('Demo User', 100000.00);
