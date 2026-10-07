import MarketIndices from "@/components/MarketIndices";
import DashboardTabs from "@/components/DashboardTabs";

export default function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Pulse</h1>
        <p className="text-text-muted mt-1">Your unified trading dashboard</p>
      </header>
      
      <MarketIndices />
      <DashboardTabs />
    </div>
  );
}
