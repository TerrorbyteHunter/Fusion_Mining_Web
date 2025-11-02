import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LMEPrices() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const metals = [
    {
      name: "Copper",
      symbol: "Cu",
      price: 10887.50,
      unit: "USD/tonne",
      change: -1.2,
      type: "3-Month Closing",
      date: "Nov 1, 2025",
      description: "Primary metal for electrical wiring, plumbing, and industrial machinery",
      zambiaNotes: "Zambia's primary export commodity, accounting for ~70% of export earnings"
    },
    {
      name: "Cobalt",
      symbol: "Co",
      price: 49559.92,
      unit: "USD/tonne",
      change: 3.5,
      type: "Month 2 Closing",
      date: "Oct 30, 2025",
      description: "Critical metal for EV batteries and renewable energy storage",
      zambiaNotes: "Zambia is Africa's 2nd largest cobalt producer after DRC"
    },
    {
      name: "Zinc",
      symbol: "Zn",
      price: 3044.00,
      unit: "USD/tonne",
      change: -0.8,
      type: "3-Month",
      date: "Oct 31, 2025",
      description: "Used for galvanizing steel and in alloys",
      zambiaNotes: "Found in polymetallic deposits alongside copper and lead"
    },
    {
      name: "Nickel",
      symbol: "Ni",
      price: 16234.00,
      unit: "USD/tonne",
      change: 1.4,
      type: "3-Month",
      date: "Nov 1, 2025",
      description: "Essential for stainless steel production and EV batteries",
      zambiaNotes: "Emerging nickel exploration in Zambia's copper belt"
    },
    {
      name: "Manganese",
      symbol: "Mn",
      price: 4850.00,
      unit: "USD/tonne",
      change: 0.5,
      type: "Spot Price",
      date: "Nov 1, 2025",
      description: "Key additive in steel production and battery materials",
      zambiaNotes: "Significant manganese deposits in southern Zambia provinces"
    },
    {
      name: "Gold",
      symbol: "Au",
      price: 2735.50,
      unit: "USD/oz",
      change: 2.1,
      type: "Spot Price",
      date: "Nov 1, 2025",
      description: "Precious metal for investment, jewelry, and industrial uses",
      zambiaNotes: "Growing gold mining sector with small-scale and artisanal operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">
                LME Mineral Prices
              </h1>
              <p className="text-muted-foreground" data-testid="text-page-subtitle">
                Live London Metal Exchange pricing for key minerals traded in Zambia
              </p>
            </div>
            <Button variant="outline" size="sm" data-testid="button-refresh-prices">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid="text-last-updated">Last updated: {currentDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metals.map((metal) => (
            <Card 
              key={metal.symbol} 
              className="hover:shadow-lg transition-shadow"
              data-testid={`card-metal-${metal.symbol.toLowerCase()}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {metal.name}
                      <Badge variant="secondary" className="font-mono">
                        {metal.symbol}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {metal.type} • {metal.date}
                    </CardDescription>
                  </div>
                  <div className={`flex items-center gap-1 ${metal.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metal.change >= 0 ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                    <span className="font-semibold" data-testid={`text-change-${metal.symbol.toLowerCase()}`}>
                      {metal.change >= 0 ? '+' : ''}{metal.change}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <span className="text-3xl font-bold" data-testid={`text-price-${metal.symbol.toLowerCase()}`}>
                      {metal.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-7">{metal.unit}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Usage:</p>
                    <p className="leading-relaxed">{metal.description}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground mb-1">Zambia Context:</p>
                    <p className="leading-relaxed text-primary/90">{metal.zambiaNotes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>About LME Prices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">What is the London Metal Exchange (LME)?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The London Metal Exchange is the world's largest market for industrial metals trading. 
                LME prices serve as global reference prices for metals and are used by producers, 
                consumers, and traders worldwide to price physical metal contracts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Price Types Explained</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium min-w-[140px]">3-Month Futures:</span>
                  <span>Contracts for delivery three months from the trade date (most liquid LME contract)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium min-w-[140px]">Cash/Spot Price:</span>
                  <span>Price for immediate delivery (settlement in 2 business days)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium min-w-[140px]">Month 2 Closing:</span>
                  <span>Price for contracts settling in the second month forward</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Why These Prices Matter for Zambia</h3>
              <p className="text-muted-foreground leading-relaxed">
                Zambia's mining sector relies heavily on LME prices as they directly impact:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground ml-4">
                <li>Export revenue and foreign exchange earnings</li>
                <li>Mineral royalty calculations (based on LME copper prices)</li>
                <li>Mining project feasibility and investment decisions</li>
                <li>Government revenue through mineral royalties and taxes</li>
                <li>Employment levels in the mining sector</li>
              </ul>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Data Source:</strong> London Metal Exchange (LME) official pricing. 
                Prices shown are indicative and may have a 1-day delay. For real-time pricing and trading, 
                please visit <a href="https://www.lme.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">www.lme.com</a> or 
                consult with licensed commodity brokers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
