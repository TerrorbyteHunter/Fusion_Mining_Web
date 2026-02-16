import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Info } from "lucide-react";

interface TradingViewWidgetProps {
  symbol: string;
  title: string;
  height?: string;
  color?: string;
  type?: 'overview' | 'mini';
}

function TradingViewWidget({ symbol, title, height = "400px", color = "#3b82f6", type = 'overview' }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    const isOverview = type === 'overview';
    script.src = isOverview
      ? "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
      : "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;

    const config = isOverview ? {
      "symbols": [[title, symbol]],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "headerFontSize": "medium",
      "backgroundColor": "#ffffff",
      "gridLineColor": "rgba(240, 243, 250, 0.06)",
      "lineWidth": 2,
      "lineColor": color,
      "topColor": `${color}33`,
      "bottomColor": `${color}00`,
      "container_id": `tv_widget_${symbol.replace(/[^a-zA-Z0-9]/g, "_")}`
    } : {
      "symbol": symbol,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "12M",
      "colorTheme": "light",
      "trendLineColor": color,
      "underLineColor": `${color}33`,
      "underLineBottomColor": `${color}00`,
      "isTransparent": false,
      "autosize": true,
      "largeChartUrl": ""
    };

    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);
  }, [symbol, title, color, type]);

  return (
    <div className="tradingview-widget-container" style={{ height }}>
      <div ref={containerRef} className="tradingview-widget-container__widget" style={{ height: "100%" }}></div>
    </div>
  );
}

export default function LMEPrices() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary animate-pulse" />
              Live Market Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Real-time pricing from London Metal Exchange (LME) and global spot markets.
              Crucial data for Zambia's mining sector.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-full border shadow-sm w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-medium text-slate-600">Market Open • Live Updates</span>
          </div>
        </div>

        {/* Main Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Copper Widget */}
          <Card className="shadow-lg border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]"></span>
                Copper (Cu)
              </CardTitle>
              <CardDescription>HG Copper Cash - Spot Market</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="CAPITALCOM:COPPER"
                title="Copper"
                color="#d97706"
              />
              <div className="p-4 bg-slate-50 border-t text-sm">
                <p className="text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">Zambia Context</p>
                <p className="text-slate-700 leading-relaxed">Zambia's primary export commodity, accounting for ~70% of export earnings</p>
              </div>
            </CardContent>
          </Card>

          {/* Gold Widget */}
          <Card className="shadow-lg border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span>
                Gold (Au)
              </CardTitle>
              <CardDescription>Spot Gold Price - USD/g</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="TVC:GOLD"
                title="Gold"
                color="#eab308"
              />
              <div className="p-4 bg-slate-50 border-t text-sm">
                <p className="text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">Zambia Context</p>
                <p className="text-slate-700 leading-relaxed">Growing gold mining sector with small-scale and artisanal operations</p>
              </div>
            </CardContent>
          </Card>

          {/* Silver Widget (Replacing problematic Cobalt) */}
          <Card className="shadow-lg border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]"></span>
                Silver (Ag)
              </CardTitle>
              <CardDescription>Spot Silver Price - USD/g</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="TVC:XAGUSD"
                title="Silver"
                color="#94a3b8"
              />
              <div className="p-4 bg-slate-50 border-t text-sm">
                <p className="text-slate-500 mb-1 font-semibold uppercase text-[10px] tracking-wider">Zambia Context</p>
                <p className="text-slate-700 leading-relaxed">Zambia produces significant silver as a byproduct of copper-cobalt mining</p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Additional Metals Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Zinc */}
          <Card className="shadow-md border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                Zinc (Zn)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="CAPITALCOM:ZINC"
                title="Zinc"
                height="200px"
                color="#64748b"
                type="mini"
              />
            </CardContent>
          </Card>

          {/* Nickel */}
          <Card className="shadow-md border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                Nickel (Ni)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="CAPITALCOM:NICKEL"
                title="Nickel"
                height="200px"
                color="#059669"
                type="mini"
              />
            </CardContent>
          </Card>

          {/* Platinum */}
          <Card className="shadow-md border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                Platinum (Pt)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="CAPITALCOM:PLATINUM"
                title="Platinum"
                height="200px"
                color="#6366f1"
                type="mini"
              />
            </CardContent>
          </Card>

          {/* Lead */}
          <Card className="shadow-md border-slate-200 overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-blue-700"></span>
                Lead (Pb)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TradingViewWidget
                symbol="CAPITALCOM:LEAD"
                title="Lead"
                height="200px"
                color="#1d4ed8"
                type="mini"
              />
            </CardContent>
          </Card>

        </div>

        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">About This Data</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All price data is sourced directly from global exchanges including the London Metal Exchange (LME),
                  COMEX, and other leading commodity markets via TradingView. Charts update in real-time during market hours.
                  For Zambia's mining sector, these prices directly impact export revenue, mineral royalty calculations,
                  and investment decisions.
                </p>
                <p className="text-xs text-muted-foreground pt-2 border-t mt-4">
                  <strong>Disclaimer:</strong> Prices shown are for informational purposes only.
                  For trading and official contracts, please consult licensed commodity brokers or visit
                  <a href="https://www.lme.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">
                    www.lme.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
