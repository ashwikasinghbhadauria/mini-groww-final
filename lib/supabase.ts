import { createClient } from '@supabase/supabase-js';

// Fallback to dummy URL/Key if env vars are not set (for prototyping without full backend setup)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export type Stock = {
  id: string;
  symbol: string;
  company_name: string;
  current_price: number;
  day_change_percent: number;
  category: string;
  market_cap: string;
  pe_ratio: number;
  high_52w: number;
  low_52w: number;
}

export type Profile = {
  id: string;
  full_name: string;
  wallet_balance: number;
}
