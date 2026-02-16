import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, X, ChevronRight, BadgeCheck } from "lucide-react";
import { useState, useMemo } from "react";
import mapSvg from "../../../attached_assets/generated_images/zambia-provinces-label.svg";

interface BaseProject {
    id: string;
    name: string;
    location: string;
    minerals: string[];
    owner?: {
        firstName?: string | null;
        lastName?: string | null;
        verified?: boolean | null;
    } | null;
    status: string;
}

interface MiningOperationsMapProps<P = any> {
    projects?: P[];
    onProjectClick?: (project: P) => void;
    onRegionClick?: (region: string) => void;
    selectedRegion?: string;
}

const provinces = [
    { id: "Lusaka", name: "Lusaka", x: 58, y: 72, description: "Administrative Hub" },
    { id: "Copperbelt", name: "Copperbelt Province", x: 50, y: 48, description: "Mining Heartland" },
    { id: "Central Province", name: "Central Province", x: 50, y: 62, description: "Central Sector" },
    { id: "Eastern Province", name: "Eastern Province", x: 82, y: 55, description: "Eastern Deposits" },
    { id: "Northern Province", name: "Northern Province", x: 75, y: 22, description: "Northern Frontier" },
    { id: "Luapula Province", name: "Luapula Province", x: 62, y: 40, description: "Luapula Resources" },
    { id: "Muchinga Province", name: "Muchinga Province", x: 88, y: 40, description: "Muchinga Corridor" },
    { id: "North-Western Province", name: "North-Western Province", x: 22, y: 55, description: "Emerging Boom Region" },
    { id: "Southern Province", name: "Southern Province", x: 42, y: 88, description: "Southern Minerals" },
    { id: "Western Province", name: "Western Province", x: 12, y: 75, description: "Frontier Assets" },
];

export function MiningOperationsMap<P extends BaseProject>({
    projects = [],
    onProjectClick,
    onRegionClick,
    selectedRegion
}: MiningOperationsMapProps<P>) {
    const [localSelectedId, setLocalSelectedId] = useState<string | null>(null);

    const activeRegion = selectedRegion || localSelectedId;

    const projectsByProvince = useMemo(() => {
        const grouped: Record<string, P[]> = {};
        projects.forEach(project => {
            const province = provinces.find(p =>
                project.location.toLowerCase().includes(p.name.toLowerCase()) ||
                project.location.toLowerCase().includes(p.id.toLowerCase())
            );
            if (province) {
                if (!grouped[province.id]) grouped[province.id] = [];
                grouped[province.id].push(project);
            }
        });
        return grouped;
    }, [projects]);

    const getProvinceData = (id: string) => {
        const province = provinces.find(p => p.id === id);
        const provinceProjects = projectsByProvince[id] || [];
        return {
            province,
            projects: provinceProjects,
            count: provinceProjects.length
        };
    };

    const selectedData = activeRegion ? getProvinceData(activeRegion) : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Map Area */}
            <div className="lg:col-span-2">
                <Card className="relative overflow-hidden bg-white border border-slate-200 h-[600px] flex items-center justify-center p-4">
                    {/* Compass Overlay */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-2 z-20 pointer-events-none shadow-sm">
                        <div className="grid grid-cols-3 gap-1 w-8 h-8 text-[8px] text-slate-500 text-center font-bold">
                            <div className="col-start-2">N</div>
                            <div className="row-start-2 col-start-1 flex items-center">W</div>
                            <div className="row-start-2 col-start-2 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                            </div>
                            <div className="row-start-2 col-start-3 flex items-center">E</div>
                            <div className="row-start-3 col-start-2">S</div>
                        </div>
                    </div>

                    {/* SVG Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={mapSvg}
                            alt="Zambia Map"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                        <svg
                            viewBox="0 0 100 100"
                            className="relative z-10 w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {provinces.map((prov) => {
                                const isSelected = activeRegion === prov.id;

                                return (
                                    <g
                                        key={prov.id}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            const newId = isSelected ? null : prov.id;
                                            setLocalSelectedId(newId);
                                            if (onRegionClick) onRegionClick(newId || "all");
                                        }}
                                    >
                                        <circle
                                            cx={prov.x}
                                            cy={prov.y}
                                            r={isSelected ? 1.8 : 1.2}
                                            fill="#10b981"
                                            stroke={isSelected ? "#000" : "none"}
                                            strokeWidth="0.3"
                                            className="transition-all duration-300"
                                        />
                                        {/* Interaction layer */}
                                        <circle
                                            cx={prov.x}
                                            cy={prov.y}
                                            r={8}
                                            fill="transparent"
                                            className="hover:fill-primary/5 transition-colors"
                                        />
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </Card>
            </div>

            {/* Region Details Panel */}
            <div className="lg:col-span-1 h-[600px]">
                {selectedData?.province ? (
                    <Card className="h-full flex flex-col border-slate-200 bg-white">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-900">{selectedData.province.name}</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => {
                                        setLocalSelectedId(null);
                                        if (onRegionClick) onRegionClick("all");
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                                    {selectedData.count} Projects Found
                                </Badge>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {selectedData.projects.length > 0 ? (
                                selectedData.projects.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer group"
                                        onClick={() => onProjectClick?.(proj)}
                                    >
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase text-sm">
                                                {proj.name}
                                            </h4>
                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-all" />
                                        </div>
                                        <div className="flex items-center gap-1 mb-3">
                                            <span className="text-xs text-slate-500">{proj.owner?.firstName} {proj.owner?.lastName}</span>
                                            {proj.owner?.verified && <BadgeCheck className="h-3 w-3 text-blue-500" />}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {proj.minerals.map((min, i) => (
                                                <span key={i} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                                                    {min}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 grayscale opacity-50">
                                    <MapPin className="h-12 w-12 text-slate-300 mb-4" />
                                    <p className="text-sm text-slate-500 italic">No active projects in this region yet.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                ) : (
                    <Card className="h-full flex flex-col items-center justify-center text-center p-8 border-slate-200 bg-white">
                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                            <MapPin className="h-8 w-8 text-primary shadow-sm" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Regional Exploration</h3>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-[200px]">
                            Selecting a province on the map will reveal specific mining opportunities and verified operators in that territory.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
