# Mini Groww (Groww Pulse)

A modern, responsive stock trading and portfolio tracking web application inspired by Groww.

## Features

- 📈 **Real-time Market Indices**: Live tracking of NIFTY 50, SENSEX, BANK NIFTY, and more.
- 📊 **Interactive Stock Charts**: Powered by TradingView's Lightweight Charts for smooth technical analysis.
- 💼 **Portfolio Management**: Track holdings, investments, returns, and wallet balance.
- ⚡ **Order Placement Simulation**: Buy and sell stocks with market or limit orders.
- 🔍 **Stock Fundamentals & Metrics**: P/E ratio, 52-week high/low, market cap, and key financial ratios.
- 🎨 **Modern UI/UX**: Built with Next.js 14, Tailwind CSS, Framer Motion, and Lucide icons.
- 🗄️ **Supabase Integration**: Ready for database persistence with SQL schema included (`schema.sql`).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Lightweight Charts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database / Backend**: Supabase

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashwikasinghbhadauria/mini-groww.git
   cd mini-groww
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Note: If no Supabase credentials are provided, fallback mock data is used automatically.*

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup (Optional)

Run the SQL script provided in `schema.sql` in your Supabase SQL Editor to set up the necessary tables and policies.
