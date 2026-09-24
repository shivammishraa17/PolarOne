import { 
  StationId, 
  StationProfile, 
  Expedition, 
  CargoItem, 
  InventoryItem, 
  Asset, 
  Personnel, 
  Alert, 
  EmergencyIncident, 
  WhatIfScenario, 
  MissionHistoryRecord 
} from '../types';

export const stationProfiles: Record<StationId, StationProfile> = {
  bharati: {
    id: 'bharati',
    name: 'Bharati Research Station',
    shortName: 'Bharati',
    region: 'Larsemann Hills, Princess Elizabeth Land',
    country: 'India',
    operator: 'NCPOR / Ministry of Earth Sciences',
    flagEmoji: '🇮🇳',
    coordinates: [-69.4075, 76.1942],
    elevationM: 35,
    utcOffsetHours: 5,
    weather: {
      tempC: -38,
      windKt: 34,
      windDir: 'ENE',
      daylight: '24h Polar Daylight',
      condition: 'Pack Ice Active'
    },
    readinessScore: 63,
    statusBadge: 'COASTAL FJORD RESUPPLY',
    tagline: 'Modern elevated station on stilts with sea-ice resupply channel'
  },
  maitri: {
    id: 'maitri',
    name: 'Maitri Research Station',
    shortName: 'Maitri',
    region: 'Queen Maud Land (Schirmacher Oasis)',
    country: 'India',
    operator: 'NCPOR / Ministry of Earth Sciences',
    flagEmoji: '🇮🇳',
    coordinates: [-70.7667, 11.7333],
    elevationM: 117,
    utcOffsetHours: 5,
    weather: {
      tempC: -28,
      windKt: 28,
      windDir: 'SW',
      daylight: '24h Polar Daylight',
      condition: 'Oasis Permafrost'
    },
    readinessScore: 84,
    statusBadge: 'CONTINENTAL OASIS HUB',
    tagline: 'Year-round station situated on rocky permafrost adjacent to Lake Priyadarshini'
  },
  himadri: {
    id: 'himadri',
    name: 'Himadri Research Station',
    shortName: 'Himadri',
    region: 'Ny-Ålesund, Spitsbergen, Svalbard',
    country: 'India',
    operator: 'NCPOR / Ministry of Earth Sciences',
    flagEmoji: '🇮🇳',
    coordinates: [78.9236, 11.9224],
    elevationM: 14,
    utcOffsetHours: 1,
    weather: {
      tempC: -14,
      windKt: 22,
      windDir: 'NW',
      daylight: 'Arctic Twilight',
      condition: 'Kongsfjorden Fjord Watch'
    },
    readinessScore: 88,
    statusBadge: 'ARCTIC FJORD RESEARCH HUB',
    tagline: "India's permanent Arctic station conducting IndARC underwater mooring and atmospheric research"
  }
};

export interface StationDataset {
  profile: StationProfile;
  expedition: Expedition;
  inventory: InventoryItem[];
  cargo: CargoItem[];
  assets: Asset[];
  personnel: Personnel[];
  alerts: Alert[];
  incidents: EmergencyIncident[];
  scenarios: WhatIfScenario[];
  history: MissionHistoryRecord[];
}

// ==========================================
// 1. BHARATI DATASET
// ==========================================
const bharatiData: StationDataset = {
  profile: stationProfiles.bharati,
  expedition: {
    id: 'EXP-44-ASRE',
    name: 'Antarctic Supply & Research Expedition 44',
    code: 'ASRE-44',
    phase: 'Resupply & Station Support',
    progress: 68,
    startDate: '2026-10-15',
    endDate: '2027-03-30',
    destination: 'Bharati Station & Larsemann Hills Transect',
    station: 'Bharati Research Station (-69.4075° S, 76.1942° E)',
    leadCommander: 'Dr. Vikram Vardhan (Expedition Director)',
    teamMemberCount: 26,
    readinessScore: 63,
    requiredResourcesSummary: '45,000 L Polar Diesel, 4,800 High-Calorie Rations, 120 Medical Units',
    requiredEquipmentSummary: '2 PistenBully Snowcats, 1 Hägglunds Carrier, 2 CAT Diesel Gensets, 1 Deep Ice Corer',
    transportMethod: 'Multi-modal: Icebreaker Vessel RV Bharati + LC-130 Air + Overland Snowcat Traverse',
    emergencyPlanSummary: 'SAR Protocol Red: Medevac via Twin Otter skiway to Cape Town or Maitri relay.',
    checklist: [
      { id: 'CHK-B1', task: 'Pre-winter Fuel Tank Ullage Verification', assignedTo: 'Chief Eng. Rajesh Nair', completed: true, critical: true },
      { id: 'CHK-B2', task: 'Primary Genset CAT 350 Valve Lash Adjustment', assignedTo: 'Diesel Tech Marcus Lind', completed: true, critical: true },
      { id: 'CHK-B3', task: 'Prydz Bay Sea Ice Thickness Sounding for Resupply', assignedTo: 'Glaciologist Anya Roy', completed: false, critical: true },
      { id: 'CHK-B4', task: 'Satellite Backup Link Bandwidth Stress Test', assignedTo: 'Comms Officer Sarah Chen', completed: true, critical: false },
      { id: 'CHK-B5', task: 'Medical Cryo-Unit Plasma & Antivenin Inventory', assignedTo: 'Dr. Elena Rostova', completed: true, critical: true },
      { id: 'CHK-B6', task: 'Traverse Snowcat Emergency Survival Cache Check', assignedTo: 'Traverse Lead Jean-Luc', completed: false, critical: true },
      { id: 'CHK-B7', task: 'Auxiliary Generator Injector Overhaul', assignedTo: 'Diesel Tech Marcus Lind', completed: false, critical: false }
    ]
  },
  inventory: [
    {
      id: 'INV-B-FUEL-01',
      name: 'Arctic Jet A-1 Aviation / Turbine Fuel',
      category: 'Fuel',
      currentStock: 4200,
      unit: 'Liters',
      threshold: 5250,
      dailyConsumption: 350,
      estimatedDaysRemaining: 12,
      reorderStatus: 'Critical Depletion',
      locationSector: 'Sector C - Fuel Depot Tank 2',
      lastAudited: 'Today at 06:00 UTC'
    },
    {
      id: 'INV-B-FUEL-02',
      name: 'Antarctic Low-Temp Polar Diesel (-50°C Grade)',
      category: 'Fuel',
      currentStock: 18500,
      unit: 'Liters',
      threshold: 9000,
      dailyConsumption: 420,
      estimatedDaysRemaining: 44,
      reorderStatus: 'Nominal',
      locationSector: 'Sector C - Bulk Tank 1',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-B-FOOD-01',
      name: 'Expedition Freeze-Dried High-Calorie Rations (4500 kcal)',
      category: 'Food',
      currentStock: 3400,
      unit: 'Meals',
      threshold: 2000,
      dailyConsumption: 78,
      estimatedDaysRemaining: 43,
      reorderStatus: 'Nominal',
      locationSector: 'Sector A - Cold Food Cache',
      lastAudited: '2 days ago'
    },
    {
      id: 'INV-B-FOOD-02',
      name: 'Hydroponic Vitamin & Fresh Nutrient Supplements',
      category: 'Food',
      currentStock: 310,
      unit: 'Ration Packs',
      threshold: 400,
      dailyConsumption: 26,
      estimatedDaysRemaining: 11,
      reorderStatus: 'Reorder Due',
      locationSector: 'Sector B - Hydroponic Lab',
      lastAudited: 'Today'
    },
    {
      id: 'INV-B-MED-01',
      name: 'Extreme Hypothermia & Resuscitation Trauma Kits',
      category: 'Medical supplies',
      currentStock: 14,
      unit: 'Full Kits',
      threshold: 8,
      dailyConsumption: 0.2,
      estimatedDaysRemaining: 70,
      reorderStatus: 'Nominal',
      locationSector: 'Sector B - Medical Bay Alpha',
      lastAudited: '3 days ago'
    },
    {
      id: 'INV-B-MED-02',
      name: 'Sterile IV Plasma & Normal Saline Warmers (40°C)',
      category: 'Medical supplies',
      currentStock: 22,
      unit: 'Bags',
      threshold: 15,
      dailyConsumption: 0.5,
      estimatedDaysRemaining: 44,
      reorderStatus: 'Nominal',
      locationSector: 'Sector B - Emergency Surgical Cabinet',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-B-SPARE-01',
      name: 'PistenBully 600 Heavy Track Cleats & Ice Grousers',
      category: 'Spare parts',
      currentStock: 8,
      unit: 'Sets',
      threshold: 12,
      dailyConsumption: 0.1,
      estimatedDaysRemaining: 80,
      reorderStatus: 'Reorder Due',
      locationSector: 'Sector D - Heavy Vehicle Workshop',
      lastAudited: '5 days ago'
    },
    {
      id: 'INV-B-SPARE-02',
      name: 'CAT 350 Turbocharger Gasket & Injector O-Rings',
      category: 'Spare parts',
      currentStock: 4,
      unit: 'Kits',
      threshold: 3,
      dailyConsumption: 0.05,
      estimatedDaysRemaining: 80,
      reorderStatus: 'Nominal',
      locationSector: 'Sector C - Powerhouse Parts Bin',
      lastAudited: '1 week ago'
    },
    {
      id: 'INV-B-SCI-01',
      name: 'Glaciology Sub-Ice Core Diamond Drill Heads (85mm)',
      category: 'Scientific equipment',
      currentStock: 6,
      unit: 'Heads',
      threshold: 4,
      dailyConsumption: 0.04,
      estimatedDaysRemaining: 150,
      reorderStatus: 'Nominal',
      locationSector: 'Sector A - Science Laboratory',
      lastAudited: '4 days ago'
    },
    {
      id: 'INV-B-BATT-01',
      name: 'Lithium Iron Phosphate (LiFePO4) Heated Standby Cells',
      category: 'Batteries',
      currentStock: 28,
      unit: 'Modules',
      threshold: 20,
      dailyConsumption: 0.1,
      estimatedDaysRemaining: 280,
      reorderStatus: 'Nominal',
      locationSector: 'Sector C - Battery Storage Locker',
      lastAudited: '2 days ago'
    },
    {
      id: 'INV-B-BATT-02',
      name: 'Field Radio & Handheld GPS Cold-Tolerant Packs',
      category: 'Batteries',
      currentStock: 85,
      unit: 'Packs',
      threshold: 50,
      dailyConsumption: 1.5,
      estimatedDaysRemaining: 56,
      reorderStatus: 'Nominal',
      locationSector: 'Sector B - Comms Center',
      lastAudited: 'Today'
    },
    {
      id: 'INV-B-SAFE-01',
      name: 'Crevasse Rescue Harnesses & 200m Dynamic Kernmantle Ropes',
      category: 'Safety equipment',
      currentStock: 16,
      unit: 'Complete Sets',
      threshold: 12,
      dailyConsumption: 0.02,
      estimatedDaysRemaining: 800,
      reorderStatus: 'Nominal',
      locationSector: 'Sector D - SAR Staging Airlock',
      lastAudited: 'Yesterday'
    }
  ],
  cargo: [
    {
      id: 'CARGO-B-01',
      description: 'Bulk Arctic Jet A-1 Fuel Drum Consignment (12,000 L)',
      category: 'Fuel',
      weightKg: 9600,
      quantity: 60,
      unit: 'Drums',
      origin: 'Cape Town Port Hub',
      destination: 'Bharati Research Station',
      transportMode: 'Icebreaker Vessel',
      currentLocation: 'RV Bharati (Prydz Bay Outer Pack Ice)',
      coordinates: [-68.8500, 75.6000],
      expectedArrival: '2026-11-28 (Delayed +5d)',
      status: 'Delayed',
      delayDays: 5,
      priority: 'CRITICAL'
    },
    {
      id: 'CARGO-B-02',
      description: 'CAT 350 Diesel Generator Overhaul Parts & Injectors',
      category: 'Spare parts',
      weightKg: 480,
      quantity: 1,
      unit: 'Crate',
      origin: 'Cape Town Staging Airfield',
      destination: 'Bharati Station Workshop',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Flight En Route (Crossing Lat 60S)',
      coordinates: [-62.4000, 48.2000],
      expectedArrival: '2026-11-23 18:00 UTC',
      status: 'In Transit',
      delayDays: 0,
      priority: 'HIGH'
    },
    {
      id: 'CARGO-B-03',
      description: 'Austral Winterization Freeze-Dried Food Rations (1,200 Meals)',
      category: 'Food',
      weightKg: 950,
      quantity: 40,
      unit: 'Cases',
      origin: 'Cape Town Logistics Depot',
      destination: 'Sector A Cold Store',
      transportMode: 'Icebreaker Vessel',
      currentLocation: 'RV Bharati Lower Cargo Hold',
      coordinates: [-68.8500, 75.6000],
      expectedArrival: '2026-11-28 (Delayed +5d)',
      status: 'Delayed',
      delayDays: 5,
      priority: 'HIGH'
    },
    {
      id: 'CARGO-B-04',
      description: 'Cryo-Medical Blood Plasma & Specialized Trauma Units',
      category: 'Medical supplies',
      weightKg: 65,
      quantity: 4,
      unit: 'Insulated Vaults',
      origin: 'Cape Town Military Medical Lab',
      destination: 'Sector B Medical Bay',
      transportMode: 'Twin Otter Ski-Plane',
      currentLocation: 'Maitri Airfield Staging',
      coordinates: [-70.7667, 11.7333],
      expectedArrival: '2026-11-24 10:00 UTC',
      status: 'In Transit',
      delayDays: 0,
      priority: 'CRITICAL'
    },
    {
      id: 'CARGO-B-05',
      description: 'Atmospheric Aerosol LIDAR Laser Sensor Package',
      category: 'Scientific equipment',
      weightKg: 340,
      quantity: 2,
      unit: 'Sensors',
      origin: 'NCPOR Goa Headquarters',
      destination: 'Sector A Upper Observation Deck',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Staged at Cape Town Cargo Apron',
      coordinates: [-33.9249, 18.4241],
      expectedArrival: '2026-12-02',
      status: 'Packed',
      delayDays: 0,
      priority: 'ROUTINE'
    },
    {
      id: 'CARGO-B-06',
      description: 'PistenBully Overland Traverse Convoy (Larsemann Transect)',
      category: 'Safety equipment',
      weightKg: 3200,
      quantity: 8,
      unit: 'Sleds',
      origin: 'Bharati Staging Bay',
      destination: 'Camp Amery Outpost',
      transportMode: 'PistenBully Traverse',
      currentLocation: 'Overland Ridge Mile 14',
      coordinates: [-69.5200, 75.9500],
      expectedArrival: '2026-11-22 22:00 UTC',
      status: 'In Transit',
      delayDays: 0,
      priority: 'HIGH'
    }
  ],
  assets: [
    {
      id: 'AST-B-GEN-01',
      name: 'Caterpillar 350 kW Primary Diesel Generator',
      type: 'Primary Diesel Genset',
      locationSector: 'Sector C - Central Power Plant',
      conditionPct: 88,
      hoursRun: 4120,
      lastInspection: '2026-11-10',
      nextMaintenance: '2026-12-01 (In 9 Days)',
      status: 'Operational',
      telemetry: {
        tempC: 84,
        powerDrawKw: 240,
        fuelLevelPct: 76,
        loadPct: 68
      }
    },
    {
      id: 'AST-B-GEN-02',
      name: 'Cummins 250 kW Auxiliary Emergency Genset',
      type: 'Backup Diesel Genset',
      locationSector: 'Sector C - Auxiliary Power Hub',
      conditionPct: 72,
      hoursRun: 1840,
      lastInspection: '2026-10-25',
      nextMaintenance: 'OVERDUE (Service Needed)',
      status: 'Warning',
      telemetry: {
        tempC: 62,
        powerDrawKw: 0,
        fuelLevelPct: 85,
        loadPct: 0
      }
    },
    {
      id: 'AST-B-SNOW-01',
      name: 'PistenBully 600 Heavy Traverse Snowcat (Alpha)',
      type: 'Heavy Traverse Snowcat',
      locationSector: 'Sector D - Vehicle Garage 1',
      conditionPct: 92,
      hoursRun: 960,
      lastInspection: '2026-11-18',
      nextMaintenance: '2026-12-15',
      status: 'Operational',
      telemetry: {
        tempC: 78,
        powerDrawKw: 0,
        fuelLevelPct: 94,
        loadPct: 45
      }
    },
    {
      id: 'AST-B-TURB-01',
      name: 'Proven Energy 15 kW Micro-Wind Turbines (3x Cluster)',
      type: 'Wind Micro-Turbine Farm',
      locationSector: 'Sector E - Ridge Wind Farm',
      conditionPct: 95,
      hoursRun: 8400,
      lastInspection: '2026-11-05',
      nextMaintenance: '2027-01-10',
      status: 'Operational',
      telemetry: {
        tempC: -15,
        powerDrawKw: 38,
        loadPct: 82
      }
    },
    {
      id: 'AST-B-RAD-01',
      name: 'Iridium Extreme Geodesic Satellite Dome Dish',
      type: 'Iridium Satellite Radome',
      locationSector: 'Sector B - Operations Roof',
      conditionPct: 98,
      hoursRun: 12500,
      lastInspection: '2026-11-15',
      nextMaintenance: '2027-02-01',
      status: 'Operational',
      telemetry: {
        tempC: 18,
        powerDrawKw: 4.5,
        loadPct: 40
      }
    },
    {
      id: 'AST-B-DRILL-01',
      name: 'Hans Tausen Sub-Ice Deep Electro-Thermal Corer',
      type: 'Ice Core Deep Drill',
      locationSector: 'Sector A - Science Trench',
      conditionPct: 84,
      hoursRun: 320,
      lastInspection: '2026-11-12',
      nextMaintenance: '2026-12-05',
      status: 'Operational',
      telemetry: {
        tempC: 35,
        powerDrawKw: 22,
        loadPct: 55
      }
    },
    {
      id: 'AST-B-HAGG-01',
      name: 'BAE Hägglunds BV206 All-Terrain Tracked Carrier',
      type: 'Tracked Personnel Carrier',
      locationSector: 'Sector D - Staging Apron',
      conditionPct: 89,
      hoursRun: 1450,
      lastInspection: '2026-11-02',
      nextMaintenance: '2026-12-20',
      status: 'Operational',
      telemetry: {
        tempC: 72,
        powerDrawKw: 0,
        fuelLevelPct: 82,
        loadPct: 30
      }
    },
    {
      id: 'AST-B-MET-01',
      name: 'Automated Synoptic Polar Weather Mast (AWS 8904)',
      type: 'Automated Weather Station',
      locationSector: 'Sector E - Met Mast Ridge',
      conditionPct: 96,
      hoursRun: 17520,
      lastInspection: '2026-11-14',
      nextMaintenance: '2027-03-01',
      status: 'Operational',
      telemetry: {
        tempC: -38,
        powerDrawKw: 1.2,
        loadPct: 25
      }
    }
  ],
  personnel: [
    {
      id: 'PER-B-01',
      name: 'Dr. Vikram Vardhan',
      role: 'Expedition Director & Station Leader',
      team: 'Command Staff',
      currentLocation: 'Sector B - Main Operations Center',
      coordinates: [-69.4075, 76.1942],
      currentAssignment: 'Overseeing ASRE-44 austral summer resupply and Katabatic storm protocol',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Incident Commander Alpha',
      vitals: { heartRateBpm: 72, bodyTempC: 36.9, spo2Pct: 99 }
    },
    {
      id: 'PER-B-02',
      name: 'Dr. Elena Rostova',
      role: 'Chief Medical Officer & Polar Triage Surgeon',
      team: 'Medical Unit',
      currentLocation: 'Sector B - Medical Bay Alpha',
      coordinates: [-69.4078, 76.1945],
      currentAssignment: 'Prepping hypothermia thermal wrap & surgical stabilization unit',
      availability: 'Emergency Standby',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Medical Lead / SAR Triage',
      vitals: { heartRateBpm: 78, bodyTempC: 37.1, spo2Pct: 98 }
    },
    {
      id: 'PER-B-03',
      name: 'Rajesh Nair',
      role: 'Station Chief Mechanical & Electrical Engineer',
      team: 'Infrastructure',
      currentLocation: 'Sector C - Central Power Plant',
      coordinates: [-69.4072, 76.1938],
      currentAssignment: 'Monitoring CAT 350 genset bearing vibrations and fuel manifold',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Facility Damage Control Lead',
      vitals: { heartRateBpm: 84, bodyTempC: 36.8, spo2Pct: 98 }
    },
    {
      id: 'PER-B-04',
      name: 'Marcus Lind',
      role: 'Heavy Diesel Specialist & Rescue Driver',
      team: 'Infrastructure',
      currentLocation: 'Sector D - Vehicle Workshop',
      coordinates: [-69.4069, 76.1950],
      currentAssignment: 'Overhauling auxiliary generator injectors and prepping Skidoo Tundra',
      availability: 'On Duty',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Primary Heavy Rescue Driver',
      vitals: { heartRateBpm: 80, bodyTempC: 36.7, spo2Pct: 97 }
    },
    {
      id: 'PER-B-05',
      name: 'Dr. Anya Roy',
      role: 'Senior Glaciologist & Sea Ice Specialist',
      team: 'Science Lab',
      currentLocation: 'Sector B Plateau Ridge (Mile 3.8)',
      coordinates: [-69.4120, 76.2200],
      currentAssignment: 'Conducting ground-penetrating radar survey of Prydz Bay shorefast ice',
      availability: 'Field Traverse',
      contactStatus: 'Iridium Satellite',
      safetyStatus: 'Cold Stress Alert',
      emergencyRole: 'Crevasse Rescue Specialist',
      vitals: { heartRateBpm: 104, bodyTempC: 35.1, spo2Pct: 94 }
    },
    {
      id: 'PER-B-06',
      name: 'Sarah Chen',
      role: 'Communications & Satellite Systems Officer',
      team: 'Command Staff',
      currentLocation: 'Sector B - Comms Center',
      coordinates: [-69.4074, 76.1940],
      currentAssignment: 'Managing Iridium SBD relays and telemetry uplink buffer',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Comms Coordinator',
      vitals: { heartRateBpm: 68, bodyTempC: 36.9, spo2Pct: 99 }
    },
    {
      id: 'PER-B-07',
      name: 'Jean-Luc Bernard',
      role: 'Polar Guide & Overland Traverse Leader',
      team: 'Traverse Alpha',
      currentLocation: 'Larsemann Inland Ridge (Mile 14)',
      coordinates: [-69.5200, 75.9500],
      currentAssignment: 'Leading 4-person PistenBully supply run to Camp Amery',
      availability: 'Field Traverse',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Extreme Weather Protocol',
      emergencyRole: 'Field Rescue Navigator',
      vitals: { heartRateBpm: 88, bodyTempC: 36.6, spo2Pct: 96 }
    },
    {
      id: 'PER-B-08',
      name: 'Pooja Sharma',
      role: 'Logistics Coordinator & Cargo Master',
      team: 'Logistics',
      currentLocation: 'Sector C - Helipad Cargo Staging',
      coordinates: [-69.4070, 76.1930],
      currentAssignment: 'Inventorying drum seals and tracking RV Bharati delayed sea-ice convoy',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Supply Evac Marshal',
      vitals: { heartRateBpm: 74, bodyTempC: 37.0, spo2Pct: 98 }
    }
  ],
  alerts: [
    {
      id: 'ALT-B-01',
      timestamp: '12 min ago',
      title: 'Fuel Runway Critical: 12 Days Remaining',
      description: 'Arctic Jet A-1 reserve at 4,200 L has dropped below the 15-day safety threshold (5,250 L). Resupply vessel delayed.',
      severity: 'CRITICAL',
      category: 'Fuel',
      acknowledged: false,
      relatedEntityId: 'INV-B-FUEL-01',
      actionRecommendation: 'Initiate non-essential thermal load shedding to preserve 15% daily burn rate.'
    },
    {
      id: 'ALT-B-02',
      timestamp: '28 min ago',
      title: 'Vessel RV Bharati Impeded by Prydz Bay Sea-Ice',
      description: 'Satellite SAR imagery shows 2.4m thick multi-year pack ice blocking direct approach. ETA slipped +5 days.',
      severity: 'WARNING',
      category: 'Cargo',
      acknowledged: false,
      relatedEntityId: 'CARGO-B-01',
      actionRecommendation: 'Re-route LC-130 Hercules with prioritized fuel bladder air-drop.'
    },
    {
      id: 'ALT-B-03',
      timestamp: '45 min ago',
      title: 'Auxiliary Genset Injector Maintenance Overdue',
      description: 'Cummins 250 kW backup generator has exceeded 1,800 operating hours without injector overhaul.',
      severity: 'WARNING',
      category: 'Generator',
      acknowledged: false,
      relatedEntityId: 'AST-B-GEN-02',
      actionRecommendation: 'Complete scheduled overhaul prior to incoming Katabatic storm front.'
    },
    {
      id: 'ALT-B-04',
      timestamp: '1 hr ago',
      title: 'Medical Cold Stress Alert: Scout Team B',
      description: 'Glaciologist Dr. Anya Roy telemetry indicates body temperature drop to 35.1°C with elevated heart rate.',
      severity: 'CRITICAL',
      category: 'Medical',
      acknowledged: true,
      relatedEntityId: 'PER-B-05',
      actionRecommendation: 'Dispatch Skidoo Tundra rescue team with warm electrolyte packs.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-08',
      title: 'Medical Emergency: Severe Cold Exposure & Knee Sprain',
      type: 'Medical emergency',
      locationSector: 'Sector B Plateau Ridge (Mile 3.8)',
      coordinates: [-69.4120, 76.2200],
      severity: 'CRITICAL',
      status: 'REPORTED',
      reportedAt: '14:22 UTC',
      nearestTeam: 'Medical Unit Alpha (Dr. Elena Rostova + Lead Guide)',
      availableVehicles: ['PistenBully 600 Polar', 'Skidoo Tundra Alpha'],
      requiredEquipment: ['Vacuum Splint', 'Hypothermia Heat Wrap', 'Oxygen 50L', 'GPS Transponder'],
      medicalResources: ['Trauma Bag Alpha', 'IV Warm Ringer Lactate', 'Morphine Analgesic'],
      suggestedResponseTeam: ['Dr. Elena Rostova (Medical Lead)', 'Marcus Lind (Rescue Driver)'],
      responseEtaMinutes: 8,
      incidentTimeline: [
        { time: '14:22 UTC', event: 'Dr. Anya Roy biometrics flagged Core Temp 35.1°C after slip in ice gully', actor: 'Automated Bio-Monitor' },
        { time: '14:25 UTC', event: 'VHF distress call received at Command Center. Triage initiated.', actor: 'Comms Officer Sarah Chen' },
        { time: '14:28 UTC', event: 'PistenBully 600 warmed up and staged at vehicle bay airlock', actor: 'Marcus Lind' }
      ],
      recommendedPlan: 'Dispatch Skidoo Tundra Alpha with Rescue Driver Marcus Lind and Paramedic Kit. Transport patient to Sector B Heated Hab inside 18 minutes.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-B-1',
      name: 'Scenario 1: Resupply Vessel Delayed by 5 Days (Sea-Ice Blockage)',
      cargoDelayedDays: 5,
      fuelConsumptionIncreasePct: 0,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Normal Arctic Air',
      description: 'Pack ice thickens in Prydz Bay; RV Bharati cannot reach offloading pier for an extra 120 hours.'
    },
    {
      id: 'SCEN-B-2',
      name: 'Scenario 2: Extreme Katabatic Blizzard (+20% Heating Surge)',
      cargoDelayedDays: 0,
      fuelConsumptionIncreasePct: 20,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Katabatic Gale',
      description: 'Continuous 48-hour gale at -44°C forces all hab zone trace-heating and turbine bypass circuits to max burn.'
    },
    {
      id: 'SCEN-B-3',
      name: 'Scenario 3: Primary CAT 350 Genset Failure (12-Hour Outage)',
      cargoDelayedDays: 0,
      fuelConsumptionIncreasePct: 10,
      generatorFailedHours: 12,
      personnelDelta: 0,
      weatherCondition: 'Normal Arctic Air',
      description: 'Crankshaft bearing sensor trips main genset. Auxiliary generator burns 15% more fuel per kWh.'
    },
    {
      id: 'SCEN-B-4',
      name: 'Scenario 4: Field Camp Evacuation (+8 Crew Influx to Base)',
      cargoDelayedDays: 0,
      fuelConsumptionIncreasePct: 8,
      generatorFailedHours: 0,
      personnelDelta: 8,
      weatherCondition: 'Normal Arctic Air',
      description: 'Camp Amery personnel evacuated due to crevasse instability; base population surges to 34.'
    },
    {
      id: 'SCEN-B-5',
      name: 'Scenario 5: Compound Crisis (5-Day Delay + Katabatic Gale)',
      cargoDelayedDays: 5,
      fuelConsumptionIncreasePct: 25,
      generatorFailedHours: 6,
      personnelDelta: 4,
      weatherCondition: 'Class 5 Polar Blizzard',
      description: 'Prydz Bay pack ice halts ship arrival during a major Antarctic winter storm front.'
    }
  ],
  history: [
    {
      id: 'HIST-B-43',
      missionName: '43rd Indian Antarctic Scientific Expedition',
      season: '2024-2025',
      station: 'Bharati Research Station',
      commander: 'Dr. Priya Sharma',
      outcome: 'Success',
      totalDurationDays: 410,
      totalPersonnel: 24,
      incidentsLogged: 6,
      fuelConsumedLiters: 142000,
      cargoDelaysDays: 8,
      lessonsLearned: [
        'Sea-ice resupply windows must maintain a minimum 20-day buffer before March freeze-up.',
        'Primary diesel generator exhaust heat exchanger recovered 35 kW for domestic water melting.',
        'Spare turbocharger gaskets must be pre-positioned at Bharati before winter isolation.'
      ],
      appliedToCurrent: 'Pre-winter fuel threshold increased from 10 to 15 days safety margin in ASRE-44.'
    },
    {
      id: 'HIST-B-42',
      missionName: '42nd Indian Antarctic Scientific Expedition',
      season: '2023-2024',
      station: 'Bharati Research Station',
      commander: 'Dr. Ananya Sen',
      outcome: 'Success',
      totalDurationDays: 390,
      totalPersonnel: 22,
      incidentsLogged: 4,
      fuelConsumedLiters: 128000,
      cargoDelaysDays: 3,
      lessonsLearned: [
        'PistenBully track pins suffered accelerated fatigue at -45°C on blue ice ridges.',
        'Lithium battery heating blankets must remain energized during standby storage.'
      ],
      appliedToCurrent: 'Routine track cleat ultrasonic inspection implemented every 200 operating hours.'
    }
  ]
};

// ==========================================
// 2. MAITRI DATASET (Queen Maud Land)
// ==========================================
const maitriData: StationDataset = {
  profile: stationProfiles.maitri,
  expedition: {
    id: 'EXP-44-MTR',
    name: '44th IAE Maitri Continental Oasis Expedition',
    code: 'MAITRI-44',
    phase: 'Traverse & Fieldwork',
    progress: 74,
    startDate: '2026-10-01',
    endDate: '2027-03-25',
    destination: 'Maitri Station & Schirmacher Oasis Permafrost',
    station: 'Maitri Research Station (-70.7667° S, 11.7333° E)',
    leadCommander: 'Dr. Santosh Kumar (Station Leader)',
    teamMemberCount: 21,
    readinessScore: 84,
    requiredResourcesSummary: '38,000 L Polar Diesel, 3,800 High-Calorie Rations, Lake Water Heat Tracing Kits',
    requiredEquipmentSummary: '2 PistenBully 300, 1 Kirloskar 250kVA Genset, Lake Pump Skid, Borehole Drill',
    transportMethod: 'Air link via Novolazarevskaya Blue Ice Runway (IL-76 / Basler BT-67) + Overland Convoy',
    emergencyPlanSummary: 'SAR Protocol Novo: Medevac via Basler BT-67 to Cape Town or Troll Station relay.',
    checklist: [
      { id: 'CHK-M1', task: 'Lake Priyadarshini Water Pipeline Trace-Heating Test', assignedTo: 'Chief Eng. Harish Patel', completed: true, critical: true },
      { id: 'CHK-M2', task: 'Kirloskar Heavy Diesel Genset Fuel Injector Service', assignedTo: 'Diesel Mech. Suresh Rao', completed: true, critical: true },
      { id: 'CHK-M3', task: 'Novolazarevskaya Blue Ice Runway Friction Survey', assignedTo: 'Traverse Lead Col. Sharma', completed: true, critical: true },
      { id: 'CHK-M4', task: 'Permafrost Seismograph Array Calibration', assignedTo: 'Glaciologist Sunita Deshmukh', completed: true, critical: false },
      { id: 'CHK-M5', task: 'High-Altitude Meteorological Balloon Release Trial', assignedTo: 'Met Officer R. Verma', completed: false, critical: false },
      { id: 'CHK-M6', task: 'Oasis Freshwater Storage Tank Sterilization', assignedTo: 'Dr. Meera Nambiar', completed: true, critical: true }
    ]
  },
  inventory: [
    {
      id: 'INV-M-FUEL-01',
      name: 'High-Density Polar Winter Diesel (-50°C)',
      category: 'Fuel',
      currentStock: 22000,
      unit: 'Liters',
      threshold: 8500,
      dailyConsumption: 380,
      estimatedDaysRemaining: 57,
      reorderStatus: 'Nominal',
      locationSector: 'Depot A - Oasis Bulk Tanks',
      lastAudited: 'Today at 08:00 UTC'
    },
    {
      id: 'INV-M-FUEL-02',
      name: 'Aviation Kerosene Jet A-1 (Basler BT-67 Skid)',
      category: 'Fuel',
      currentStock: 6800,
      unit: 'Liters',
      threshold: 3000,
      dailyConsumption: 140,
      estimatedDaysRemaining: 48,
      reorderStatus: 'Nominal',
      locationSector: 'Depot B - Helipad Skid Tanks',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-M-WATER-01',
      name: 'Lake Priyadarshini Potable Water Buffer',
      category: 'Food',
      currentStock: 14500,
      unit: 'Liters',
      threshold: 6000,
      dailyConsumption: 480,
      estimatedDaysRemaining: 30,
      reorderStatus: 'Nominal',
      locationSector: 'Sector A - Main Hab Water Cistern',
      lastAudited: 'Today'
    },
    {
      id: 'INV-M-FOOD-01',
      name: 'Curated Indian Continental Rations & Millets (3800 kcal)',
      category: 'Food',
      currentStock: 2800,
      unit: 'Meals',
      threshold: 1600,
      dailyConsumption: 63,
      estimatedDaysRemaining: 44,
      reorderStatus: 'Nominal',
      locationSector: 'Sector A - Insulated Food Stores',
      lastAudited: '3 days ago'
    },
    {
      id: 'INV-M-HEAT-01',
      name: 'Electric Self-Regulating Trace Heating Cable (100m)',
      category: 'Spare parts',
      currentStock: 3,
      unit: 'Spools',
      threshold: 4,
      dailyConsumption: 0.05,
      estimatedDaysRemaining: 60,
      reorderStatus: 'Reorder Due',
      locationSector: 'Sector C - Electrical Maintenance Bay',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-M-MED-01',
      name: 'High-Latitude Frostbite & Surgical Kits',
      category: 'Medical supplies',
      currentStock: 18,
      unit: 'Kits',
      threshold: 10,
      dailyConsumption: 0.15,
      estimatedDaysRemaining: 120,
      reorderStatus: 'Nominal',
      locationSector: 'Sector B - Maitri Hospital Unit',
      lastAudited: '4 days ago'
    },
    {
      id: 'INV-M-BATT-01',
      name: 'Nickel-Cadmium Low-Temp Emergency Bank Cells',
      category: 'Batteries',
      currentStock: 42,
      unit: 'Cells',
      threshold: 25,
      dailyConsumption: 0.2,
      estimatedDaysRemaining: 210,
      reorderStatus: 'Nominal',
      locationSector: 'Sector C - Powerhouse Sub-Room',
      lastAudited: '1 week ago'
    }
  ],
  cargo: [
    {
      id: 'CARGO-M-01',
      description: 'Novolazarevskaya Skiway Air-Drop (Basler BT-67)',
      category: 'Spare parts',
      weightKg: 2800,
      quantity: 12,
      unit: 'Pallets',
      origin: 'Cape Town Airport Hub',
      destination: 'Maitri Research Station',
      transportMode: 'Twin Otter Ski-Plane',
      currentLocation: 'Novolazarevskaya Blue Ice Airfield',
      coordinates: [-70.8300, 11.6400],
      expectedArrival: '2026-11-21 16:00 UTC',
      status: 'At Station',
      delayDays: 0,
      priority: 'HIGH'
    },
    {
      id: 'CARGO-M-02',
      description: 'Heavy Overland Fuel Traverse from Ice Shelf Edge',
      category: 'Fuel',
      weightKg: 14500,
      quantity: 75,
      unit: 'Drums',
      origin: 'Kamenev Bight Sea-Ice Offload',
      destination: 'Maitri Fuel Depot A',
      transportMode: 'PistenBully Traverse',
      currentLocation: 'Inland Continental Glacier Transect (Mile 28)',
      coordinates: [-70.4500, 11.8200],
      expectedArrival: '2026-11-23',
      status: 'In Transit',
      delayDays: 0,
      priority: 'CRITICAL'
    },
    {
      id: 'CARGO-M-03',
      description: 'Priyadarshini Lake Submersible Water Pump Replacement',
      category: 'Spare parts',
      weightKg: 320,
      quantity: 2,
      unit: 'Pumps',
      origin: 'Cape Town Logistics Depot',
      destination: 'Maitri Lake Pumphouse',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Novolazarevskaya Staging Cargo Hangar',
      coordinates: [-70.8300, 11.6400],
      expectedArrival: '2026-11-22',
      status: 'In Transit',
      delayDays: 0,
      priority: 'CRITICAL'
    }
  ],
  assets: [
    {
      id: 'AST-M-GEN-01',
      name: 'Kirloskar 250 kVA Prime Diesel Generator (Main)',
      type: 'Primary Diesel Genset',
      locationSector: 'Sector C - Powerhouse',
      conditionPct: 92,
      hoursRun: 3640,
      lastInspection: '2026-11-12',
      nextMaintenance: '2026-12-10',
      status: 'Operational',
      telemetry: {
        tempC: 80,
        powerDrawKw: 175,
        fuelLevelPct: 82,
        loadPct: 62
      }
    },
    {
      id: 'AST-M-PUMP-01',
      name: 'Lake Priyadarshini Submersible Water Pumping Skid',
      type: 'Primary Diesel Genset',
      locationSector: 'Sector F - Lake Priyadarshini Shore',
      conditionPct: 76,
      hoursRun: 7200,
      lastInspection: '2026-11-19',
      nextMaintenance: '2026-11-25 (Line Trace Check Due)',
      status: 'Warning',
      telemetry: {
        tempC: 2,
        powerDrawKw: 14,
        loadPct: 70
      }
    },
    {
      id: 'AST-M-SNOW-01',
      name: 'PistenBully 300 Polar Traverse Tractor',
      type: 'Heavy Traverse Snowcat',
      locationSector: 'Sector D - Oasis Garage',
      conditionPct: 88,
      hoursRun: 1120,
      lastInspection: '2026-11-15',
      nextMaintenance: '2026-12-20',
      status: 'Operational',
      telemetry: {
        tempC: 74,
        powerDrawKw: 0,
        fuelLevelPct: 88,
        loadPct: 35
      }
    },
    {
      id: 'AST-M-COMMS-01',
      name: 'Schirmacher Long-Range HF / Iridium Array',
      type: 'Iridium Satellite Radome',
      locationSector: 'Sector B - Main Communication Mast',
      conditionPct: 95,
      hoursRun: 18000,
      lastInspection: '2026-11-08',
      nextMaintenance: '2027-02-15',
      status: 'Operational',
      telemetry: {
        tempC: 14,
        powerDrawKw: 3.2,
        loadPct: 38
      }
    }
  ],
  personnel: [
    {
      id: 'PER-M-01',
      name: 'Dr. Santosh Kumar',
      role: 'Station Leader & Senior Geoscientist',
      team: 'Command Staff',
      currentLocation: 'Sector A - Main Habitation Lounge',
      coordinates: [-70.7667, 11.7333],
      currentAssignment: 'Overseeing Schirmacher Oasis permafrost monitoring and resupply coordination',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Station Commander',
      vitals: { heartRateBpm: 70, bodyTempC: 36.8, spo2Pct: 98 }
    },
    {
      id: 'PER-M-02',
      name: 'Dr. Meera Nambiar',
      role: 'Chief Medical Officer',
      team: 'Medical Unit',
      currentLocation: 'Sector B - Maitri Hospital Ward',
      coordinates: [-70.7670, 11.7335],
      currentAssignment: 'Inspecting potable water filtration and hypothermia warming units',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Medical Triage Lead',
      vitals: { heartRateBpm: 74, bodyTempC: 37.0, spo2Pct: 99 }
    },
    {
      id: 'PER-M-03',
      name: 'Harish Patel',
      role: 'Station Electrical & Power Engineer',
      team: 'Infrastructure',
      currentLocation: 'Sector F - Lake Pumphouse Station',
      coordinates: [-70.7690, 11.7380],
      currentAssignment: 'Testing trace-heating circuits on the lake water intake pipe',
      availability: 'On Duty',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Utilities Restoration Lead',
      vitals: { heartRateBpm: 82, bodyTempC: 36.7, spo2Pct: 97 }
    },
    {
      id: 'PER-M-04',
      name: 'Col. Alok Sharma',
      role: 'Overland Traverse Commander',
      team: 'Traverse Alpha',
      currentLocation: 'Novolazarevskaya Blue Ice Skiway',
      coordinates: [-70.8300, 11.6400],
      currentAssignment: 'Coordinating fuel drum staging from Basler BT-67 landing',
      availability: 'Field Traverse',
      contactStatus: 'Iridium Satellite',
      safetyStatus: 'Nominal',
      emergencyRole: 'SAR Traverse Commander',
      vitals: { heartRateBpm: 76, bodyTempC: 36.9, spo2Pct: 98 }
    }
  ],
  alerts: [
    {
      id: 'ALT-M-01',
      timestamp: '18 min ago',
      title: 'Lake Priyadarshini Water Pipe Trace-Heat Warning',
      description: 'Sensor indicates trace heating temperature dropped to +2°C along Section 3. Ambient at -28°C.',
      severity: 'WARNING',
      category: 'Generator',
      acknowledged: false,
      relatedEntityId: 'AST-M-PUMP-01',
      actionRecommendation: 'Engage secondary auxiliary heating breaker to prevent pipe freeze-up.'
    },
    {
      id: 'ALT-M-02',
      timestamp: '42 min ago',
      title: 'Novolazarevskaya Blue Ice Runway Clear',
      description: 'Runway surface cleared of sastrugi drifts; friction coefficient optimal for heavy cargo landings.',
      severity: 'INFO',
      category: 'Cargo',
      acknowledged: true,
      actionRecommendation: 'Green light granted for Basler BT-67 inbound leg from Cape Town.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-11',
      title: 'Utility Emergency: Freshwater Pipeline Trace-Heat Breaker Trip',
      type: 'Equipment failure',
      locationSector: 'Sector F - Lake Priyadarshini Shore (1.2 km from Base)',
      coordinates: [-70.7690, 11.7380],
      severity: 'HIGH',
      status: 'REPORTED',
      reportedAt: '15:10 UTC',
      nearestTeam: 'Infrastructure Quick-Response (Harish Patel + Tech Team)',
      availableVehicles: ['PistenBully 300', 'Ski-Doo Snowmobile 02'],
      requiredEquipment: ['Portable Heat Gun', 'Multimeter', 'Spare 20A Heating Breakers'],
      medicalResources: ['Cold Exposure First Aid Kit'],
      suggestedResponseTeam: ['Harish Patel (Electrical Eng)', 'Suresh Rao (Diesel Mech)'],
      responseEtaMinutes: 6,
      incidentTimeline: [
        { time: '15:10 UTC', event: 'Breaker CB-4 tripped in Lake Pumphouse; temperature monitoring alert sent', actor: 'Automated SCADA System' },
        { time: '15:14 UTC', event: 'Harish Patel dispatched to site with backup thermal coils', actor: 'Station Leader Dr. Santosh Kumar' }
      ],
      recommendedPlan: 'Drive PistenBully 300 to Lake Pump Station, replace tripped breaker CB-4, and verify 15 kW trace current.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-M-1',
      name: 'Scenario 1: Freshwater Lake Intake Pipe Freeze-Up',
      cargoDelayedDays: 0,
      fuelConsumptionIncreasePct: 15,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Normal Arctic Air',
      description: 'Trace-heating fails; water line freezes, requiring emergency diesel steam boilers to thaw.'
    },
    {
      id: 'SCEN-M-2',
      name: 'Scenario 2: Novolazarevskaya Airfield Closed by Whiteout (7 Days)',
      cargoDelayedDays: 7,
      fuelConsumptionIncreasePct: 5,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Katabatic Gale',
      description: 'Dense Antarctic coastal ground blizzard halts all Basler and IL-76 flights for a full week.'
    }
  ],
  history: [
    {
      id: 'HIST-M-42',
      missionName: '42nd Indian Antarctic Scientific Expedition (Maitri)',
      season: '2023-2024',
      station: 'Maitri Research Station',
      commander: 'Dr. B. K. Jena',
      outcome: 'Success',
      totalDurationDays: 420,
      totalPersonnel: 22,
      incidentsLogged: 5,
      fuelConsumedLiters: 135000,
      cargoDelaysDays: 4,
      lessonsLearned: [
        'Insulated casing around Lake Priyadarshini pipeline prevented ice plug formation during -34°C snap.',
        'Novolazarevskaya blue-ice runway operations require 48h advance radar weather window analysis.'
      ],
      appliedToCurrent: 'Dual redundant thermal sensors installed along full 1.2 km lake pipeline in MAITRI-44.'
    }
  ]
};

// ==========================================
// 3. HIMADRI DATASET (Ny-Ålesund, Svalbard, Arctic)
// ==========================================
const himadriData: StationDataset = {
  profile: stationProfiles.himadri,
  expedition: {
    id: 'EXP-18-HIM',
    name: '18th Indian Arctic Expedition (Ny-Ålesund)',
    code: 'HIMADRI-18',
    phase: 'Traverse & Fieldwork',
    progress: 74,
    startDate: '2026-03-01',
    endDate: '2026-11-30',
    destination: 'Himadri Station, Ny-Ålesund, Svalbard',
    station: 'Himadri Research Station (78.9236° N, 11.9224° E)',
    leadCommander: 'Dr. Arindam Sen (Arctic Mission Director)',
    teamMemberCount: 14,
    readinessScore: 88,
    requiredResourcesSummary: '24,000 L Arctic Gas Oil, Aerosol Spectrometers, Cold-Climate Diving Gear',
    requiredEquipmentSummary: '1 Polarcirkel Workboat, 3 Lynx Snowmobiles, 1 IndARC Mooring Acoustic Transceiver, Gruvebadet Air Samplers',
    transportMethod: 'Flight Tromsø/Longyearbyen + Dornier 228 to Ny-Ålesund + Polarcirkel Marine Transect',
    emergencyPlanSummary: 'SAR Protocol Svalbard: Kings Bay AS Polar Bear Defense & Super Puma Medevac to Longyearbyen Hospital.',
    checklist: [
      { id: 'CHK-H1', task: 'IndARC Subsurface Mooring Acoustic Telemetry Ping Check', assignedTo: 'Oceanographer Dr. Kavita Nair', completed: true, critical: true },
      { id: 'CHK-H2', task: 'Gruvebadet Atmospheric Aerosol Lidar Calibration', assignedTo: 'Atmospheric Physicist Dev Sharma', completed: true, critical: true },
      { id: 'CHK-H3', task: 'Kongsfjorden Sea Ice Thickness & CTD Profiling', assignedTo: 'Glaciologist Tanvi Joshi', completed: false, critical: true },
      { id: 'CHK-H4', task: 'Polar Bear Perimeter Trip-Wire & Flare Launcher Inspection', assignedTo: 'Safety Officer Erik Lindqvist', completed: true, critical: true },
      { id: 'CHK-H5', task: 'Kings Bay District Heating & Backup Generator Coupling', assignedTo: 'Station Eng. Rajesh Kulkarni', completed: true, critical: false },
      { id: 'CHK-H6', task: 'Polarcirkel Workboat Outboard Anti-Ice Deicing Test', assignedTo: 'Marine Tech Lars Hansen', completed: false, critical: true }
    ]
  },
  inventory: [
    {
      id: 'INV-H-FUEL-01',
      name: 'Arctic-Grade Marine Gas Oil (AG-75 Low Pour Point)',
      category: 'Fuel',
      currentStock: 24500,
      unit: 'Liters',
      threshold: 8000,
      dailyConsumption: 140,
      estimatedDaysRemaining: 175,
      reorderStatus: 'Nominal',
      locationSector: 'Kings Bay Tank Farm - Bay 4',
      lastAudited: 'Today at 08:30 UTC'
    },
    {
      id: 'INV-H-FUEL-02',
      name: 'Aviation Kerosene Jet A-1 (Ny-Ålesund Skiway Buffer)',
      category: 'Fuel',
      currentStock: 8200,
      unit: 'Liters',
      threshold: 3500,
      dailyConsumption: 95,
      estimatedDaysRemaining: 86,
      reorderStatus: 'Nominal',
      locationSector: 'Hamnerabben Airfield Fuel Depot',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-H-FOOD-01',
      name: 'High-Calorie Arctic Field Rations & Freeze-Dried Provisions',
      category: 'Food',
      currentStock: 2800,
      unit: 'Meals',
      threshold: 1000,
      dailyConsumption: 42,
      estimatedDaysRemaining: 66,
      reorderStatus: 'Nominal',
      locationSector: 'Himadri Main Pantry & Cold Locker',
      lastAudited: 'Today'
    },
    {
      id: 'INV-H-MED-01',
      name: 'Arctic Hypothermia, Trauma & Hyperbaric Emergency Kits',
      category: 'Medical supplies',
      currentStock: 48,
      unit: 'Kits',
      threshold: 15,
      dailyConsumption: 0.1,
      estimatedDaysRemaining: 480,
      reorderStatus: 'Nominal',
      locationSector: 'Ny-Ålesund Medical Clinic / Himadri Sickbay',
      lastAudited: '3 days ago'
    },
    {
      id: 'INV-H-SPARE-01',
      name: 'IndARC Fjord Mooring Acoustic Sensors & Hydrophone Batteries',
      category: 'Spare parts',
      currentStock: 5,
      unit: 'Units',
      threshold: 6,
      dailyConsumption: 0.05,
      estimatedDaysRemaining: 100,
      reorderStatus: 'Reorder Due',
      locationSector: 'Himadri Marine Tech Workshop',
      lastAudited: '2 days ago'
    },
    {
      id: 'INV-H-SCI-01',
      name: 'Gruvebadet High-Volume Aerosol Filter Cassettes',
      category: 'Scientific equipment',
      currentStock: 64,
      unit: 'Filters',
      threshold: 20,
      dailyConsumption: 0.5,
      estimatedDaysRemaining: 128,
      reorderStatus: 'Nominal',
      locationSector: 'Gruvebadet Atmospheric Laboratory',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-H-SAF-01',
      name: 'Polar Bear Deterrent Signal Flares & 12G Non-Lethal Slugs',
      category: 'Safety equipment',
      currentStock: 120,
      unit: 'Rounds',
      threshold: 40,
      dailyConsumption: 0.1,
      estimatedDaysRemaining: 999,
      reorderStatus: 'Nominal',
      locationSector: 'Armory Lockbox - Ny-Ålesund Safety Station',
      lastAudited: 'Today'
    }
  ],
  cargo: [
    {
      id: 'CARGO-H-01',
      description: 'IndARC Fjord Oceanographic Mooring Acoustic Sensor Replacements',
      category: 'Scientific equipment',
      weightKg: 850,
      quantity: 4,
      unit: 'Crates',
      origin: 'NCPOR Goa Headquarters',
      destination: 'Himadri Station, Ny-Ålesund',
      transportMode: 'Twin Otter Ski-Plane',
      currentLocation: 'Longyearbyen Staging Hangar (Svalbard Lufthavn)',
      coordinates: [78.2232, 15.6267],
      expectedArrival: '2026-09-30',
      status: 'In Transit',
      delayDays: 0,
      priority: 'HIGH'
    },
    {
      id: 'CARGO-H-02',
      description: 'Gruvebadet Multi-Wavelength Aerosol Spectrometer Optic Cells',
      category: 'Scientific equipment',
      weightKg: 210,
      quantity: 2,
      unit: 'Containers',
      origin: 'IIT Delhi / NCPOR Logistics Hub',
      destination: 'Gruvebadet Atmospheric Lab',
      transportMode: 'Icebreaker Vessel',
      currentLocation: 'Aboard MS Norbjørn - Barents Sea Transect',
      coordinates: [72.1500, 19.8200],
      expectedArrival: '2026-10-05',
      status: 'In Transit',
      delayDays: 0,
      priority: 'ROUTINE'
    },
    {
      id: 'CARGO-H-03',
      description: 'Lynx Commander Snowmobile Cold-Start Ignition Modules & Tracks',
      category: 'Spare parts',
      weightKg: 95,
      quantity: 3,
      unit: 'Boxes',
      origin: 'Kings Bay Logistics Oslo Depot',
      destination: 'Himadri Equipment Shed',
      transportMode: 'Twin Otter Ski-Plane',
      currentLocation: 'Ny-Ålesund Hamnerabben Airfield Hangar',
      coordinates: [78.9236, 11.9224],
      expectedArrival: '2026-09-22',
      status: 'At Station',
      delayDays: 0,
      priority: 'ROUTINE'
    }
  ],
  assets: [
    {
      id: 'AST-H-BOAT-01',
      name: 'Polarcirkel 845 Workboat "Varun" (Kongsfjorden Transect)',
      type: 'Tracked Personnel Carrier',
      locationSector: 'Ny-Ålesund Marine Harbor Jetty',
      conditionPct: 92,
      hoursRun: 640,
      lastInspection: '2026-08-20',
      nextMaintenance: '2026-11-15',
      status: 'Operational',
      telemetry: {
        tempC: 4,
        powerDrawKw: 28,
        fuelLevelPct: 88,
        loadPct: 52
      }
    },
    {
      id: 'AST-H-MOOR-01',
      name: 'IndARC Subsurface Oceanographic Mooring System',
      type: 'Automated Weather Station',
      locationSector: 'Kongsfjorden Outer Basin (192m depth)',
      conditionPct: 89,
      hoursRun: 8760,
      lastInspection: '2025-08-10',
      nextMaintenance: '2026-10-10',
      status: 'Operational',
      telemetry: {
        tempC: -1,
        powerDrawKw: 5,
        loadPct: 40
      }
    },
    {
      id: 'AST-H-LIDAR-01',
      name: 'Gruvebadet Atmospheric Aerosol Lidar & Spectrometer',
      type: 'Automated Weather Station',
      locationSector: 'Gruvebadet Atmospheric Laboratory',
      conditionPct: 96,
      hoursRun: 4320,
      lastInspection: '2026-07-14',
      nextMaintenance: '2026-12-01',
      status: 'Operational',
      telemetry: {
        tempC: 18,
        powerDrawKw: 12,
        loadPct: 35
      }
    },
    {
      id: 'AST-H-SNOW-01',
      name: 'Lynx Commander 900 ACE Arctic Utility Snowmobile',
      type: 'Skidoo Snowmobile',
      locationSector: 'Sector B - Himadri Equipment Shed',
      conditionPct: 88,
      hoursRun: 380,
      lastInspection: '2026-09-02',
      nextMaintenance: '2026-11-20',
      status: 'Operational',
      telemetry: {
        tempC: 68,
        powerDrawKw: 0,
        fuelLevelPct: 82,
        loadPct: 30
      }
    },
    {
      id: 'AST-H-GEN-01',
      name: 'Himadri Emergency Backup Volvo Penta 65 kVA Genset',
      type: 'Backup Diesel Genset',
      locationSector: 'Sector D - Ny-Ålesund Auxiliary Bay',
      conditionPct: 95,
      hoursRun: 120,
      lastInspection: '2026-08-28',
      nextMaintenance: '2026-11-28',
      status: 'Operational',
      telemetry: {
        tempC: 22,
        powerDrawKw: 0,
        fuelLevelPct: 94,
        loadPct: 10
      }
    }
  ],
  personnel: [
    {
      id: 'PER-H-01',
      name: 'Dr. Arindam Sen',
      role: 'Station Leader & Senior Arctic Climatologist',
      team: 'Command Staff',
      currentLocation: 'Sector A - Himadri Main Office & Science Lab',
      coordinates: [78.9236, 11.9224],
      currentAssignment: 'Leading Kongsfjorden glaciology transect and Svalbard research coordination',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Station Commander',
      vitals: { heartRateBpm: 68, bodyTempC: 36.8, spo2Pct: 99 }
    },
    {
      id: 'PER-H-02',
      name: 'Dr. Kavita Nair',
      role: 'Principal Oceanographer (IndARC Mooring Lead)',
      team: 'Oceanography Unit',
      currentLocation: 'Marine Harbor Jetty / Polarcirkel Boat',
      coordinates: [78.9280, 11.9350],
      currentAssignment: 'Monitoring IndARC subsurface hydrophone telemetry and acoustic data uplink',
      availability: 'On Duty',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Marine Operations Lead',
      vitals: { heartRateBpm: 75, bodyTempC: 36.7, spo2Pct: 98 }
    },
    {
      id: 'PER-H-03',
      name: 'Dev Sharma',
      role: 'Atmospheric Physicist (Gruvebadet Lab)',
      team: 'Atmospheric Physics',
      currentLocation: 'Gruvebadet Atmospheric Laboratory',
      coordinates: [78.9180, 11.8950],
      currentAssignment: 'Continuous black carbon and aerosol optical depth measurement runs',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Atmospheric Safety Officer',
      vitals: { heartRateBpm: 72, bodyTempC: 37.0, spo2Pct: 98 }
    },
    {
      id: 'PER-H-04',
      name: 'Erik Lindqvist',
      role: 'Svalbard Polar Bear Safety & Field Guide',
      team: 'Field Safety',
      currentLocation: 'Ny-Ålesund Western Perimeter Look-out',
      coordinates: [78.9240, 11.9050],
      currentAssignment: 'Perimeter wildlife watch and escorting researchers beyond settlement zone',
      availability: 'On Duty',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Chief Safety & SAR Guide',
      vitals: { heartRateBpm: 70, bodyTempC: 36.9, spo2Pct: 99 }
    }
  ],
  alerts: [
    {
      id: 'ALT-H-01',
      timestamp: '14 min ago',
      title: 'IndARC Fjord Mooring Telemetry Acoustic Ping Delay',
      description: 'Acoustic transponder ping interval from 192m depth hydrophone increased to 120s due to thermal stratification.',
      severity: 'WARNING',
      category: 'Comms',
      acknowledged: false,
      relatedEntityId: 'AST-H-MOOR-01',
      actionRecommendation: 'Perform high-gain hydrophone frequency scan from Polarcirkel workboat.'
    },
    {
      id: 'ALT-H-02',
      timestamp: '35 min ago',
      title: 'Ny-Ålesund Kings Bay Polar Bear Perimeter Clearance',
      description: 'Kings Bay AS safety patrol confirmed adult polar bear moved 3 km northwest towards Blomstrandhalvøya.',
      severity: 'INFO',
      category: 'Medical',
      acknowledged: true,
      actionRecommendation: 'Fieldwork cleared within 1.5 km perimeter; flare guns and rifles remain mandatory.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-18',
      title: 'Marine Hazard: Kongsfjorden Drift Ice Floe Approaching IndARC Buoy',
      type: 'Extreme weather',
      locationSector: 'Kongsfjorden Outer Basin (2.4 km Offshore)',
      coordinates: [78.9280, 11.9350],
      severity: 'HIGH',
      status: 'REPORTED',
      reportedAt: '13:40 UTC',
      nearestTeam: 'Marine Safety & Fjord Logistics (Dr. Kavita Nair + Lars Hansen)',
      availableVehicles: ['Polarcirkel 845 Workboat "Varun"'],
      requiredEquipment: ['Marine Tow Line', 'Sonar Ice Profiler', 'GPS Position Buoy'],
      medicalResources: ['Marine Immersion Hypothermia Kit'],
      suggestedResponseTeam: ['Dr. Kavita Nair (Oceanographer)', 'Lars Hansen (Marine Tech)'],
      responseEtaMinutes: 12,
      incidentTimeline: [
        { time: '13:40 UTC', event: 'Drift ice floe (approx 45m diameter) detected 400m northeast of IndARC surface marker', actor: 'Dr. Kavita Nair' },
        { time: '13:48 UTC', event: 'Polarcirkel workboat dispatched to monitor ice drift velocity and trajectory', actor: 'Station Leader Dr. Arindam Sen' }
      ],
      recommendedPlan: 'Deploy Polarcirkel workboat with ice-deflection towing harness to nudge floe clear of surface beacon.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-H-1',
      name: 'Scenario 1: Kongsfjorden Rapid Autumn Sea-Ice Freeze-up',
      cargoDelayedDays: 6,
      fuelConsumptionIncreasePct: 12,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Normal Arctic Air',
      description: 'Rapid pack ice consolidation closes Ny-Ålesund harbor 3 weeks earlier than normal, shifting supply to Dornier ski-flights.'
    },
    {
      id: 'SCEN-H-2',
      name: 'Scenario 2: Svalbard Extreme Polar Low Storm Front',
      cargoDelayedDays: 5,
      fuelConsumptionIncreasePct: 8,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Class 5 Polar Blizzard',
      description: 'Severe Arctic cyclonic polar low generates 50kt winds and whiteout, restricting personnel inside Ny-Ålesund station complex.'
    }
  ],
  history: [
    {
      id: 'HIST-H-17',
      missionName: '17th Indian Arctic Expedition (Ny-Ålesund)',
      season: '2024-2025',
      station: 'Himadri Research Station',
      commander: 'Dr. K. S. Rao',
      outcome: 'Success',
      totalDurationDays: 275,
      totalPersonnel: 14,
      incidentsLogged: 2,
      fuelConsumedLiters: 42000,
      cargoDelaysDays: 3,
      lessonsLearned: [
        'Autonomous IndARC mooring acoustic logger successfully recovered after 12 months continuous deep-water recording.',
        'Ny-Ålesund district heating microgrid reduced winter diesel consumption by 15%.'
      ],
      appliedToCurrent: 'Enhanced acoustic telemetry transceiver and high-endurance sensors installed in HIMADRI-18.'
    },
    {
      id: 'HIST-H-01',
      missionName: 'Inaugural Indian Arctic Expedition (Himadri Dedication)',
      season: '2008',
      station: 'Himadri Research Station',
      commander: 'Dr. Rasik Ravindra',
      outcome: 'Success',
      totalDurationDays: 120,
      totalPersonnel: 8,
      incidentsLogged: 1,
      fuelConsumedLiters: 18000,
      cargoDelaysDays: 2,
      lessonsLearned: [
        'Permanent establishment of Himadri station at Ny-Ålesund (79° N) established India as an active Arctic research nation.',
        'Formal scientific collaboration protocol established with Kings Bay AS and Norwegian Polar Institute.'
      ],
      appliedToCurrent: 'Standard operational protocol for continuous Arctic atmospheric and marine studies established.'
    }
  ]
};

export const stationsDataset: Record<StationId, StationDataset> = {
  bharati: bharatiData,
  maitri: maitriData,
  himadri: himadriData
};
