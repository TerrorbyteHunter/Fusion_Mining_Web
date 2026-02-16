import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, X, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import mapSvg from "../../../attached_assets/generated_images/zambia-provinces-label.svg";

/**
 * Interface representing the minimal data required by the map for a listing.
 */
interface BaseListing {
    id: string;
    title: string;
    location: string;
    mineralType?: string | null;
    seller?: {
        firstName?: string | null;
        lastName?: string | null;
        verified?: boolean | null;
        verificationStatus?: string | null;
        [key: string]: any;
    } | null;
    status: string;
    price?: string | null;
    [key: string]: any;
}

interface MarketplaceMapProps<T extends BaseListing> {
    listings: T[];
    onListingClick?: (listing: T) => void;
}

// Zambia province data with coordinates and colors
const provinces = [
    { id: "lusaka", name: "Lusaka", x: 58, y: 72, color: "#f59e0b", description: "Capital & Commercial Hub" },
    { id: "copperbelt", name: "Copperbelt Province", x: 50, y: 48, color: "#d97706", description: "Mining Heartland" },
    { id: "central", name: "Central Province", x: 50, y: 62, color: "#ea580c", description: "Agricultural & Mining" },
    { id: "eastern", name: "Eastern Province", x: 82, y: 55, color: "#dc2626", description: "Emerald Deposits" },
    { id: "northern", name: "Northern Province", x: 75, y: 22, color: "#16a34a", description: "Gemstone Rich" },
    { id: "luapula", name: "Luapula Province", x: 62, y: 40, color: "#059669", description: "Copper & Cobalt" },
    { id: "muchinga", name: "Muchinga Province", x: 88, y: 40, color: "#0891b2", description: "Emerging Sector" },
    { id: "northwestern", name: "North-Western Province", x: 22, y: 55, color: "#7c3aed", description: "Copper Belt Extension" },
    { id: "southern", name: "Southern Province", x: 42, y: 88, color: "#c026d3", description: "Coal & Minerals" },
    { id: "western", name: "Western Province", x: 12, y: 75, color: "#e11d48", description: "Frontier Region" },
];

export function MarketplaceMap<T extends BaseListing>({ listings, onListingClick }: MarketplaceMapProps<T>) {
    const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);

    // Group listings by province
    const listingsByProvince = useMemo(() => {
        const grouped: Record<string, T[]> = {};

        listings.forEach(listing => {
            const province = provinces.find(p =>
                listing.location.toLowerCase().includes(p.name.toLowerCase()) ||
                listing.location.toLowerCase().includes(p.id)
            );

            if (province) {
                if (!grouped[province.id]) {
                    grouped[province.id] = [];
                }
                grouped[province.id].push(listing);
            }
        });

        return grouped;
    }, [listings]);

    const getProvinceData = (provinceId: string) => {
        const province = provinces.find(p => p.id === provinceId);
        const provinceListings = listingsByProvince[provinceId] || [];
        const verifiedCount = provinceListings.filter(l =>
            l.seller?.verificationStatus === 'approved' || l.seller?.verified
        ).length;

        return {
            province,
            listings: provinceListings,
            verifiedCount,
            totalCount: provinceListings.length
        };
    };

    const selectedData = selectedProvinceId ? getProvinceData(selectedProvinceId) : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Map Visualization */}
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

                    {/* Map Canvas */}
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
                            {provinces.map((province) => {
                                const data = getProvinceData(province.id);
                                const isSelected = selectedProvinceId === province.id;
                                const hasListings = data.totalCount > 0;

                                return (
                                    <g
                                        key={province.id}
                                        className="cursor-pointer"
                                        onClick={() => setSelectedProvinceId(isSelected ? null : province.id)}
                                    >
                                        <circle
                                            cx={province.x}
                                            cy={province.y}
                                            r={isSelected ? 1.8 : 1.2}
                                            fill={hasListings ? "#10b981" : "#94a3b8"}
                                            stroke={isSelected ? "#000" : "none"}
                                            strokeWidth="0.3"
                                            className="transition-all duration-300"
                                        />

                                        {/* Interaction layer */}
                                        <circle
                                            cx={province.x}
                                            cy={province.y}
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

            {/* Details Panel */}
            <div className="lg:col-span-1 h-[600px]">
                {selectedData?.province ? (
                    <Card className="h-full border-slate-200 bg-white overflow-hidden flex flex-col">
                        <div className="p-6 border-b">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="text-xl font-bold">{selectedData.province.name}</h4>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => setSelectedProvinceId(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">{selectedData.province.description}</p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 shadow-sm">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Assets</p>
                                    <p className="text-2xl font-black text-primary">{selectedData.totalCount}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 shadow-sm">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Verified</p>
                                    <p className="text-2xl font-black text-emerald-600">{selectedData.verifiedCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <div className="flex items-center justify-between px-2 mb-2">
                                <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">Regional Listings</h5>
                                <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-200">Recent</Badge>
                            </div>

                            {selectedData.listings.length > 0 ? (
                                selectedData.listings.map((listing) => (
                                    <div
                                        key={listing.id}
                                        className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer group"
                                        onClick={() => onListingClick?.(listing)}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-slate-900 line-clamp-1 mb-1 group-hover:text-emerald-600">
                                                    {listing.title}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 items-center">
                                                    {listing.mineralType && (
                                                        <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-white border-slate-200 text-slate-600">{listing.mineralType}</Badge>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[11px] text-slate-500 font-medium">
                                                            {listing.seller?.firstName} {listing.seller?.lastName}
                                                        </span>
                                                        {(listing.seller?.verificationStatus === 'approved' || listing.seller?.verified) && (
                                                            <BadgeCheck className="h-3 w-3 text-blue-500" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-all transition-all group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 grayscale opacity-50">
                                    <MapPin className="h-12 w-12 text-slate-300 mb-4" />
                                    <p className="text-sm text-slate-500 italic">No listings in this region yet.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                ) : (
                    <Card className="h-full flex flex-col items-center justify-center text-center p-8 border-slate-200 bg-white">
                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                            <MapPin className="h-8 w-8 text-primary shadow-sm" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Regional Exploration</h3>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-[200px]">
                            Selecting a province on the map will reveal specific mining opportunities and verified operators in that territory.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
