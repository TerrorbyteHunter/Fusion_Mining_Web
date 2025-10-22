import { Card } from "@/components/ui/card";

interface ZambiaMapProps {
  onRegionClick?: (region: string) => void;
  selectedRegion?: string;
}

const provinces = [
  {
    id: "ZM08",
    name: "Copperbelt",
    path: "M250,120 L320,120 L340,140 L340,180 L320,200 L260,200 L240,180 L240,140 Z",
    labelX: 290,
    labelY: 160,
  },
  {
    id: "ZM06",
    name: "North-Western Province",
    path: "M160,100 L250,100 L250,140 L240,160 L200,180 L160,180 L140,160 L140,120 Z",
    labelX: 195,
    labelY: 140,
  },
  {
    id: "ZM05",
    name: "Northern Province",
    path: "M340,80 L420,80 L450,100 L470,140 L460,180 L420,200 L340,200 L340,140 L320,120 L340,100 Z",
    labelX: 405,
    labelY: 140,
  },
  {
    id: "ZM04",
    name: "Luapula Province",
    path: "M470,140 L520,140 L540,160 L540,200 L520,220 L480,220 L460,200 L460,160 Z",
    labelX: 500,
    labelY: 180,
  },
  {
    id: "ZM10",
    name: "Muchinga Province",
    path: "M420,200 L460,200 L480,220 L500,260 L480,280 L440,280 L420,260 L400,240 Z",
    labelX: 450,
    labelY: 240,
  },
  {
    id: "ZM02",
    name: "Central Province",
    path: "M260,200 L340,200 L360,220 L380,260 L360,300 L320,320 L260,320 L240,300 L240,240 Z",
    labelX: 310,
    labelY: 260,
  },
  {
    id: "ZM03",
    name: "Eastern Province",
    path: "M440,280 L500,280 L520,300 L540,340 L520,380 L480,380 L460,360 L440,320 Z",
    labelX: 490,
    labelY: 330,
  },
  {
    id: "ZM09",
    name: "Lusaka",
    path: "M320,320 L360,320 L370,340 L360,360 L340,370 L320,360 L310,340 Z",
    labelX: 340,
    labelY: 345,
  },
  {
    id: "ZM07",
    name: "Southern Province",
    path: "M260,320 L360,320 L380,340 L400,380 L380,420 L340,440 L280,440 L240,420 L220,380 L240,340 Z",
    labelX: 320,
    labelY: 380,
  },
  {
    id: "ZM01",
    name: "Western Province",
    path: "M100,240 L200,240 L240,260 L240,340 L220,380 L180,400 L120,400 L100,380 L80,320 L80,280 Z",
    labelX: 160,
    labelY: 320,
  },
];

export function ZambiaMap({ onRegionClick, selectedRegion }: ZambiaMapProps) {
  return (
    <Card className="relative w-full aspect-video bg-gradient-to-br from-primary/5 to-chart-2/5 overflow-hidden">
      <div className="absolute inset-0 p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 620 520"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Zambia country outline (outer border) */}
            <path
              d="M140,120 L320,80 L450,80 L520,120 L560,180 L540,240 L500,300 L480,360 L400,440 L320,460 L240,460 L160,420 L100,360 L80,280 L100,200 Z"
              fill="hsl(var(--muted))"
              fillOpacity="0.2"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeOpacity="0.3"
            />

            {/* Province boundaries */}
            {provinces.map((province) => {
              const isSelected = selectedRegion === province.name;
              return (
                <g key={province.id}>
                  <path
                    d={province.path}
                    fill={isSelected ? "hsl(var(--primary))" : "hsl(var(--background))"}
                    fillOpacity={isSelected ? "0.6" : "0.4"}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeOpacity={isSelected ? "1" : "0.4"}
                    className="transition-all duration-300 cursor-pointer hover:fill-opacity-70 hover:stroke-opacity-100"
                    onClick={() => onRegionClick?.(province.name)}
                    data-testid={`region-${province.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <text
                    x={province.labelX}
                    y={province.labelY}
                    textAnchor="middle"
                    className="fill-current text-[10px] md:text-xs font-medium pointer-events-none select-none"
                    fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
                    fillOpacity={isSelected ? "1" : "0.7"}
                  >
                    {province.name.replace(" Province", "")}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Compass */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 md:p-3 text-xs">
            <div className="grid grid-cols-3 gap-1 w-12 h-12 md:w-16 md:h-16">
              <div className="col-start-2 flex items-start justify-center font-bold">N</div>
              <div className="row-start-2 col-start-1 flex items-center justify-start">W</div>
              <div className="row-start-2 col-start-2 flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"></div>
              </div>
              <div className="row-start-2 col-start-3 flex items-center justify-end">E</div>
              <div className="row-start-3 col-start-2 flex items-end justify-center font-bold">S</div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 md:p-3 text-xs">
            <p className="font-semibold mb-1 md:mb-2">Zambia Mining Regions</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border-2 border-primary/40 bg-background/40"></div>
              <span className="text-muted-foreground text-[10px] md:text-xs">Click to filter</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
