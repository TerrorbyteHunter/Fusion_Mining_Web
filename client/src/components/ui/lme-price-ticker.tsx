import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface MetalPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const metals: MetalPrice[] = [
  { name: "Copper", symbol: "Cu", price: 8245.50, change: 125.30, changePercent: 1.54 },
  { name: "Gold", symbol: "Au", price: 1985.20, change: -12.40, changePercent: -0.62 },
  { name: "Silver", symbol: "Ag", price: 23.45, change: 0.32, changePercent: 1.38 },
  { name: "Aluminum", symbol: "Al", price: 2150.75, change: 18.50, changePercent: 0.87 },
  { name: "Zinc", symbol: "Zn", price: 2385.40, change: -8.20, changePercent: -0.34 },
  { name: "Nickel", symbol: "Ni", price: 16720.00, change: 245.00, changePercent: 1.49 },
  { name: "Lead", symbol: "Pb", price: 2045.30, change: -15.80, changePercent: -0.77 },
  { name: "Tin", symbol: "Sn", price: 25430.00, change: 120.00, changePercent: 0.47 },
  { name: "Cobalt", symbol: "Co", price: 32500.00, change: 450.00, changePercent: 1.40 },
  { name: "Lithium", symbol: "Li", price: 18200.00, change: -230.00, changePercent: -1.25 },
];

export function LMEPriceTicker() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        if (newPosition >= metals.length * 100) {
          return 0;
        }
        return newPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">LME Prices</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="overflow-hidden h-[calc(100vh-12rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="lme-price-ticker"
        >
          <div 
            className="space-y-1 px-4 pb-4"
            style={{
              transform: `translateY(-${scrollPosition % (metals.length * 100)}px)`,
              transition: 'transform 0.05s linear'
            }}
          >
            {[...metals, ...metals, ...metals].map((metal, index) => (
              <div
                key={`${metal.symbol}-${index}`}
                className="flex flex-col p-2 rounded-lg hover:bg-accent transition-colors border border-transparent hover:border-border"
                data-testid={`metal-${metal.symbol.toLowerCase()}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">{metal.name}</span>
                    <span className="text-[10px] text-muted-foreground">{metal.symbol}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {metal.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold">
                    ${metal.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      metal.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {metal.change >= 0 ? "+" : ""}
                    {metal.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-2 border-t text-center">
          <p className="text-[10px] text-muted-foreground">
            Updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
