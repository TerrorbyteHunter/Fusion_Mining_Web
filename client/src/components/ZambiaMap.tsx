import { Card } from "@/components/ui/card";
import mapSvg from "../../../attached_assets/generated_images/zambia-provinces-label.svg";

interface ZambiaMapProps {
  onRegionClick?: (region: string) => void;
  selectedRegion?: string;
}

const provinces = [
  { id: "lusaka", name: "Lusaka", x: 58, y: 71 },
  { id: "central", name: "Central Province", x: 48, y: 64 },
  { id: "eastern", name: "Eastern Province", x: 78, y: 60 },
  { id: "copperbelt", name: "Copperbelt", x: 45, y: 47 },
  { id: "muchinga", name: "Muchinga Province", x: 79, y: 40 },
  { id: "northern", name: "Northern Province", x: 71, y: 24 },
  { id: "luapula", name: "Luapula Province", x: 59, y: 40 },
  { id: "southern", name: "Southern Province", x: 37, y: 86 },
  { id: "north-western", name: "North-Western Province", x: 18, y: 53 },
  { id: "western", name: "Western Province", x: 9, y: 74 },
];

export function ZambiaMap({ onRegionClick, selectedRegion }: ZambiaMapProps) {
  const handleRegionClick = (provinceName: string) => {
    if (onRegionClick) {
      onRegionClick(provinceName);
    }
  };


  return (
    <Card className="relative w-full aspect-square bg-gradient-to-br from-primary/5 to-chart-2/5 overflow-hidden">
      <div className="absolute inset-0 p-4 md:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Map background using external SVG file (responsive) */}
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(${mapSvg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          >
            {/* Interactive overlay (absolute positioned) */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {provinces.map((province) => {
                const isSelected = selectedRegion === province.name;
                return (
                  <g key={province.id}>
                    {/* Clickable circle area around each label */}
                    <circle
                      cx={province.x}
                      cy={province.y}
                      r="8"
                      fill={isSelected ? "hsl(var(--primary))" : "transparent"}
                      fillOpacity={isSelected ? "0.2" : "0"}
                      stroke={isSelected ? "hsl(var(--primary))" : "transparent"}
                      strokeWidth="0.5"
                      strokeOpacity={isSelected ? "1" : "0"}
                      className="transition-all duration-300 cursor-pointer hover:fill-opacity-30 hover:stroke-opacity-50"
                      onClick={() => handleRegionClick(province.name)}
                    />
                    
                    {/* Province labels removed – map SVG already contains labels. Only dots remain. */}

                    <circle
                      cx={province.x}
                      cy={province.y}
                      r="1"
                      fill={isSelected ? "hsl(var(--primary))" : "hsl(var(--chart-2))"}
                      className="pointer-events-none"
                    />

                    <rect
                      x={province.x - 8}
                      y={province.y - 8}
                      width="16"
                      height="16"
                      fill="transparent"
                      className="cursor-pointer"
                      onClick={() => handleRegionClick(province.name)}
                      data-testid={`region-${province.id}`}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

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
              <div className="w-3 h-3 rounded-full bg-chart-2"></div>
              <span className="text-muted-foreground text-[10px] md:text-xs">Click region to filter</span>
            </div>
            {selectedRegion && selectedRegion !== "all" && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-primary text-[10px] md:text-xs font-medium">Selected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
