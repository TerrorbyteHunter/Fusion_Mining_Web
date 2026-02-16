import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface MetalPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

// Top minerals relevant to Zambia's mining sector
const initialMetals: MetalPrice[] = [
  { name: "Copper", symbol: "Cu", price: 12875.50, change: 125.30, changePercent: 1.37, unit: "USD/t" },
  { name: "Cobalt", symbol: "Co", price: 55830.00, change: 450.00, changePercent: 0.81, unit: "USD/t" },
  { name: "Gold", symbol: "Au", price: 84.87, change: 0.25, changePercent: 0.29, unit: "USD/g" },
  { name: "Zinc", symbol: "Zn", price: 3412.50, change: -4.50, changePercent: -0.13, unit: "USD/t" },
  { name: "Nickel", symbol: "Ni", price: 17234.00, change: 17.50, changePercent: 0.10, unit: "USD/t" },
  { name: "Manganese", symbol: "Mn", price: 4655.00, change: -4.60, changePercent: -0.10, unit: "USD/t" },
  { name: "Silver", symbol: "Ag", price: 1.01, change: 0.01, changePercent: 0.99, unit: "USD/g" },
  { name: "Lithium", symbol: "Li", price: 18.20, change: -0.01, changePercent: -0.08, unit: "USD/kg" },
];

export function LMEPriceTicker() {
  const [metals, setMetals] = useState<MetalPrice[]>(initialMetals);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate small price fluctuations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetals(prevMetals =>
        prevMetals.map(metal => {
          // Random fluctuation between -0.3% and +0.3%
          const fluctuation = (Math.random() - 0.5) * 0.006;
          const newPrice = metal.price * (1 + fluctuation);
          const priceChange = newPrice - metal.price;
          const percentChange = (priceChange / metal.price) * 100;

          return {
            ...metal,
            price: Number(newPrice.toFixed(metal.unit.includes('/g') || metal.unit.includes('/kg') ? 2 : 0)),
            change: Number(priceChange.toFixed(2)),
            changePercent: Number(percentChange.toFixed(2))
          };
        })
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live LME Prices
          </CardTitle>
          <a
            href="/lme-prices"
            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            title="View full dashboard"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        <div className="space-y-1 px-3 pb-3">
          {metals.map((metal) => (
            <div
              key={metal.symbol}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border cursor-pointer"
              data-testid={`metal-${metal.symbol.toLowerCase()}`}
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{metal.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{metal.symbol}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-bold">
                    ${metal.price.toLocaleString(undefined, {
                      minimumFractionDigits: (metal.unit.includes('/g') || metal.unit.includes('/kg')) ? 2 : 0,
                      maximumFractionDigits: (metal.unit.includes('/g') || metal.unit.includes('/kg')) ? 2 : 0
                    })}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{metal.unit}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  {metal.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${metal.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {metal.change >= 0 ? "+" : ""}
                  {metal.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t text-center bg-muted/30">
          <p className="text-[10px] text-muted-foreground">
            Updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
