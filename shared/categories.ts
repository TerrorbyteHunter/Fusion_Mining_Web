// Category hierarchies matching B2B Mineral structure
// Used across frontend and backend for consistent categorization

export const MAIN_CATEGORIES = {
  minerals: {
    value: 'minerals',
    label: 'Minerals',
    icon: 'gem',
    description: 'Metallic and non-metallic minerals, natural stones'
  },
  mining_equipment: {
    value: 'mining_equipment',
    label: 'Mining Equipment',
    icon: 'wrench',
    description: 'Equipment, machinery, and PPE for mining operations'
  },
  mining_services: {
    value: 'mining_services',
    label: 'Mining & Engineering Services',
    icon: 'briefcase',
    description: 'Professional services for mining operations'
  }
} as const;

// Minerals subcategories and specific types
export const MINERAL_SUBCATEGORIES = {
  metallic: {
    value: 'metallic',
    label: 'Metallic',
    specificTypes: [
      'Aluminum Ores', 'Antimony Ores', 'Cobalt Ores', 'Chrome Ores', 'Copper Ores',
      'Gold Ores', 'Iron Ores', 'Lead Ores', 'Lithium Ores', 'Manganese Ores',
      'Molybdenum Ores', 'Nickel Ores', 'Niobium Ores', 'Platinum Group Elements (PGE)',
      'Silver Ores', 'Tantalum Ores', 'Tin Ores', 'Tungsten Ores', 'Zinc Ores'
    ]
  },
  non_metallic: {
    value: 'non_metallic',
    label: 'Non-metallic Industrial Minerals',
    specificTypes: [
      'Asbestos', 'Barite', 'Bentonite', 'Calcium Carbonate (Calcite)', 'Dolomite',
      'Feldspar', 'Fluorite', 'Graphite', 'Gypsum and Anhydrite', 'Halite (Rock Salt)',
      'Kaolin', 'Mica', 'Nepheline', 'Perlite', 'Pyrophyllite', 'Silica',
      'Talc', 'Smectite', 'Vermiculite', 'Wollastonite', 'Zeolite'
    ]
  },
  marble_natural_stone: {
    value: 'marble_natural_stone',
    label: 'Marble and Natural Stone',
    specificTypes: [
      'Marble', 'Onyx', 'Travertine', 'Limestone', 'Sandstone', 'Granite',
      'Basalt', 'Quartz', 'Quartzite', 'Slate', 'Precious and Semi-Precious Stones',
      'Other Natural Stone'
    ]
  },
  gravel_sand_aggregate: {
    value: 'gravel_sand_aggregate',
    label: 'Gravel, Sand, Aggregate',
    specificTypes: ['Gravel', 'Sand', 'Aggregate', 'Crushed Stone']
  },
  coal_peat: {
    value: 'coal_peat',
    label: 'Coal and Peat',
    specificTypes: ['Anthracite', 'Bituminous Coal', 'Lignite', 'Peat']
  },
  other_minerals: {
    value: 'other_minerals',
    label: 'Other Minerals',
    specificTypes: ['Other']
  }
} as const;

// Mining Equipment subcategories (merged Tools and PPE)
export const EQUIPMENT_SUBCATEGORIES = {
  drilling_equipment: {
    value: 'drilling_equipment',
    label: 'Drilling Rigs and Equipment',
    specificTypes: [
      'Surface Drilling Rigs', 'Horizontal Drilling Rigs', 'Wagon Drill, Rock Drill',
      'Portable Hand Drilling Rigs', 'Drilling Injection Kits', 'Drill Pipes, Drill Rods',
      'Core Tray and Other Components', 'Other Drilling Equipment'
    ]
  },
  energy_machines: {
    value: 'energy_machines',
    label: 'Energy - Machines and Equipment',
    specificTypes: [
      'Generators', 'Solar Panels', 'Wind Turbines', 'Water Turbines',
      'Electrical and Electronic Equipment', 'Other Energy Resources'
    ]
  },
  engineering_devices: {
    value: 'engineering_devices',
    label: 'Engineering Devices and Equipment',
    specificTypes: [
      'Cartography GPS GNSS Device and Accessories', 'Detectors, Underground Imaging',
      'Explosives and Blasting Equipment', 'Ground Investigation Equipment and Parts',
      'Laboratory Equipment and Accessories', 'Sample Preparation Machines'
    ]
  },
  heavy_equipment: {
    value: 'heavy_equipment',
    label: 'Heavy Equipment',
    specificTypes: [
      'Backhoe Loader', 'Bored Pile Machine', 'Dozer Bucket', 'Excavator',
      'Forklifts and Stackers', 'Grader', 'Heavy Equipment Spare Parts',
      'Hydraulic Breaker and Gun', 'Loader', 'Mobile Crane', 'Rock Truck',
      'Telehandler', 'Mine Trailer', 'Other Heavy Equipment'
    ]
  },
  industrial_equipment: {
    value: 'industrial_equipment',
    label: 'Industrial Equipment & Components',
    specificTypes: [
      'Compressors', 'Fuel Oil Products', 'Accumulators', 'Tire-Rim and Armor',
      'Wire Rope and Chains', 'Fuel-oil Tanks', 'Container, Cabin, Shelter',
      'Other Industry Equipment'
    ]
  },
  marble_machinery: {
    value: 'marble_machinery',
    label: 'Marble Industry Machinery',
    specificTypes: [
      'Marble Quarry Machines', 'Marble Processing Machines',
      'Marble Handling and Transport Equipment'
    ]
  },
  ore_processing: {
    value: 'ore_processing',
    label: 'Ore Mineral Processing Equipment',
    specificTypes: [
      'Bulk Bag Filling and Bagging', 'Bunkers and Feeders', 'Centrifuges',
      'Conveyors and Carriers', 'Crushers', 'Cyclones', 'Filters and Presses',
      'Flotation Cells', 'Grinders and Mills', 'Leaching Equipment',
      'Mining Drying Machine', 'Pumps', 'Separators', 'Screens', 'Silos',
      'Thickeners', 'Washing Machines', 'Other Ore Mineral Processing Equipment'
    ]
  },
  underground_mining: {
    value: 'underground_mining',
    label: 'Underground Mining Equipment',
    specificTypes: [
      'Roof Support Systems', 'Ventilation Systems', 'Underground Pumps'
    ]
  },
  head_face_protection: {
    value: 'head_face_protection',
    label: 'Head & Face Protection',
    specificTypes: ['Hard Hats', 'Face Shields', 'Safety Goggles', 'Ear Protection']
  },
  respiratory_protection: {
    value: 'respiratory_protection',
    label: 'Mask/Respiratory Protection',
    specificTypes: ['Dust Masks', 'Respirators', 'Gas Masks', 'Air Purifiers']
  },
  hand_foot_protection: {
    value: 'hand_foot_protection',
    label: 'Hand & Foot Protection',
    specificTypes: ['Safety Gloves', 'Safety Boots', 'Steel-toe Boots', 'Chemical Resistant Gloves']
  },
  fall_protection: {
    value: 'fall_protection',
    label: 'Personal Fall Protection',
    specificTypes: ['Safety Harnesses', 'Lanyards', 'Anchor Points', 'Fall Arrest Systems']
  },
  protective_clothing: {
    value: 'protective_clothing',
    label: 'Protective Clothing',
    specificTypes: ['Coveralls', 'High-Visibility Vests', 'Flame Resistant Clothing', 'Chemical Suits']
  },
  other_equipment: {
    value: 'other_equipment',
    label: 'Other Equipment',
    specificTypes: ['Other']
  }
} as const;

// Mining Services subcategories and specific types
export const SERVICE_SUBCATEGORIES = {
  analysis_services: {
    value: 'analysis_services',
    label: 'Analysis Services',
    specificTypes: ['Laboratory Analysis', 'Chemical Analysis', 'Mineral Testing']
  },
  consulting_advisory: {
    value: 'consulting_advisory',
    label: 'Consulting & Advisory',
    specificTypes: ['Mining Consultancy', 'Geological Advisory', 'Business Advisory']
  },
  drilling_blasting: {
    value: 'drilling_blasting',
    label: 'Drilling and Blasting Services',
    specificTypes: ['Core Drilling', 'Blast Hole Drilling', 'Blasting Services']
  },
  exploration_surveying: {
    value: 'exploration_surveying',
    label: 'Exploration & Surveying Services',
    specificTypes: ['Geological Surveying', 'Geophysical Surveys', 'Mineral Exploration']
  },
  freight_services: {
    value: 'freight_services',
    label: 'Freight Services',
    specificTypes: ['Road Transport', 'Rail Transport', 'Freight Forwarding']
  },
  mine_extraction: {
    value: 'mine_extraction',
    label: 'Mine Extraction Service',
    specificTypes: ['Open-pit Mining', 'Underground Mining', 'Contract Mining']
  },
  mineral_processing: {
    value: 'mineral_processing',
    label: 'Mineral Processing Services',
    specificTypes: ['Crushing & Screening', 'Flotation', 'Smelting & Refining']
  },
  supply_chain: {
    value: 'supply_chain',
    label: 'Supply Chain Solution',
    specificTypes: ['Logistics Management', 'Inventory Management', 'Procurement Services']
  },
  other_services: {
    value: 'other_services',
    label: 'Other Services',
    specificTypes: ['Other']
  }
} as const;

// Helper function to get all subcategories for a main category
export function getSubcategoriesForMain(mainCategory: string) {
  switch (mainCategory) {
    case 'minerals':
      return MINERAL_SUBCATEGORIES;
    case 'mining_equipment':
      return EQUIPMENT_SUBCATEGORIES;
    case 'mining_services':
      return SERVICE_SUBCATEGORIES;
    case 'mining_tools':
      return EQUIPMENT_SUBCATEGORIES;
    case 'mining_ppe':
      return EQUIPMENT_SUBCATEGORIES;
    default:
      return {};
  }
}

// Helper function to get specific types for a subcategory
export function getSpecificTypes(mainCategory: string, subcategory: string): string[] {
  const subcategories = getSubcategoriesForMain(mainCategory);
  return (subcategories as any)[subcategory]?.specificTypes || [];
}

// Backward compatibility exports
export const TOOL_SUBCATEGORIES = EQUIPMENT_SUBCATEGORIES;
export const PPE_SUBCATEGORIES = EQUIPMENT_SUBCATEGORIES;

// Export type for TypeScript
export type MainCategory = keyof typeof MAIN_CATEGORIES;
export type MineralSubcategory = keyof typeof MINERAL_SUBCATEGORIES;
export type EquipmentSubcategory = keyof typeof EQUIPMENT_SUBCATEGORIES;
export type ServiceSubcategory = keyof typeof SERVICE_SUBCATEGORIES;
export type ToolSubcategory = keyof typeof EQUIPMENT_SUBCATEGORIES;
export type PPESubcategory = keyof typeof EQUIPMENT_SUBCATEGORIES;
