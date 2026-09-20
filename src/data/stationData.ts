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
  mcmurdo: {
    id: 'mcmurdo',
    name: 'McMurdo Station',
    shortName: 'McMurdo',
    region: 'Ross Island, McMurdo Sound',
    country: 'United States',
    operator: 'United States Antarctic Program (USAP / NSF)',
    flagEmoji: '🇺🇸',
    coordinates: [-77.8463, 166.6682],
    elevationM: 24,
    utcOffsetHours: 12,
    weather: {
      tempC: -22,
      windKt: 18,
      windDir: 'S',
      daylight: '24h Polar Daylight',
      condition: 'Heavy Logistics Airlift'
    },
    readinessScore: 91,
    statusBadge: 'PRIMARY ANTARCTIC AIR & HARBOR HUB',
    tagline: 'Largest Antarctic base with deep-water ice wharf, Pegasus runway, and Terra Bus logistics'
  },
  southpole: {
    id: 'southpole',
    name: 'Amundsen-Scott South Pole Station',
    shortName: 'South Pole',
    region: 'Geographic South Pole, Polar Plateau',
    country: 'United States / Intl',
    operator: 'National Science Foundation (NSF)',
    flagEmoji: '🇺🇸',
    coordinates: [-90.0000, 0.0000],
    elevationM: 2835,
    utcOffsetHours: 12,
    weather: {
      tempC: -58,
      windKt: 14,
      windDir: 'Grid N',
      daylight: '24h Polar Sun',
      condition: 'Extreme Altitude Cryo-Zone'
    },
    readinessScore: 54,
    statusBadge: 'CRITICAL COLD PLATEAU (-58°C)',
    tagline: 'Elevated station on hydraulic pylons at 2,835m altitude housing IceCube & South Pole Telescope'
  },
  neumayer: {
    id: 'neumayer',
    name: 'Neumayer Station III',
    shortName: 'Neumayer III',
    region: 'Ekström Ice Shelf, Atka Bay',
    country: 'Germany',
    operator: 'Alfred Wegener Institute (AWI)',
    flagEmoji: '🇩🇪',
    coordinates: [-70.6744, -8.2742],
    elevationM: 43,
    utcOffsetHours: 0,
    weather: {
      tempC: -31,
      windKt: 42,
      windDir: 'NE',
      daylight: '24h Polar Daylight',
      condition: 'Storm Front Warning'
    },
    readinessScore: 74,
    statusBadge: 'HYDRAULIC FLOATING SHELF PLATFORM',
    tagline: 'Advanced aerodynamic station elevated on 16 hydraulic jacks on a moving floating ice shelf'
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
    emergencyPlanSummary: 'SAR Protocol Red: Medevac via Twin Otter skiway to Cape Town or McMurdo relay.',
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
// 3. MCMURDO DATASET (Ross Island)
// ==========================================
const mcmurdoData: StationDataset = {
  profile: stationProfiles.mcmurdo,
  expedition: {
    id: 'EXP-ODF-2026',
    name: 'Operation Deep Freeze 2026 Logistic Airlift',
    code: 'ODF-2026',
    phase: 'Resupply & Station Support',
    progress: 82,
    startDate: '2026-10-01',
    endDate: '2027-04-15',
    destination: 'McMurdo Station & Ross Ice Shelf Traverses',
    station: 'McMurdo Station (-77.8463° S, 166.6682° E)',
    leadCommander: 'Cmdr. Sarah Jenkins (USAP Logistics Director)',
    teamMemberCount: 48,
    readinessScore: 91,
    requiredResourcesSummary: '180,000 L Polar Diesel, 14,000 Pre-Packaged Meals, Heavy Dozer Spares',
    requiredEquipmentSummary: '4 CAT D8T Bulldozers, Ivan the Terra Bus, 3 LC-130 Skiway Graders, 1 Icebreaker Escort',
    transportMethod: 'Heavy Maritime Icebreaker (USCGC Polar Star) + C-17 Globemaster Heavy Airlift',
    emergencyPlanSummary: 'SAR Protocol Gold: C-17 Medevac direct to Christchurch NZ Hospital.',
    checklist: [
      { id: 'CHK-MC1', task: 'Phoenix Ice Runway Laser Grade & Friction Test', assignedTo: 'Airfield Mgr. Dave Miller', completed: true, critical: true },
      { id: 'CHK-MC2', task: 'Central Power Plant Caterpillar 3516 1000h Service', assignedTo: 'Chief Mech. Chuck OBrien', completed: true, critical: true },
      { id: 'CHK-MC3', task: 'USCGC Polar Star Ice Channel Escort Briefing', assignedTo: 'Harbor Master T. Kowalski', completed: true, critical: true },
      { id: 'CHK-MC4', task: 'South Pole Overland Traverse Fuel Bladder Inspection', assignedTo: 'Traverse Lead Rick Dalton', completed: true, critical: true },
      { id: 'CHK-MC5', task: 'Williams Field LC-130 Skiway Compaction', assignedTo: 'Airfield Team Bravo', completed: false, critical: false }
    ]
  },
  inventory: [
    {
      id: 'INV-MC-FUEL-01',
      name: 'Bulk Arctic Jet A-1 Fuel (Phoenix Airfield Depot)',
      category: 'Fuel',
      currentStock: 68000,
      unit: 'Liters',
      threshold: 25000,
      dailyConsumption: 1150,
      estimatedDaysRemaining: 59,
      reorderStatus: 'Nominal',
      locationSector: 'Hut Point Fuel Farm Tank 4',
      lastAudited: 'Today at 04:00 UTC'
    },
    {
      id: 'INV-MC-FUEL-02',
      name: 'Special Low-Temp Polar Diesel #1 (AN-8)',
      category: 'Fuel',
      currentStock: 120000,
      unit: 'Liters',
      threshold: 40000,
      dailyConsumption: 1650,
      estimatedDaysRemaining: 72,
      reorderStatus: 'Nominal',
      locationSector: 'Central Tank Farm 1',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-MC-FOOD-01',
      name: 'C-17 Palletized Commercial Food Packs (4000 kcal)',
      category: 'Food',
      currentStock: 14000,
      unit: 'Meals',
      threshold: 5000,
      dailyConsumption: 152,
      estimatedDaysRemaining: 92,
      reorderStatus: 'Nominal',
      locationSector: 'Building 155 Main Galley Warehouse',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-MC-SPARE-01',
      name: 'Caterpillar D8T Track Rollers & Hydraulic Seals',
      category: 'Spare parts',
      currentStock: 45,
      unit: 'Units',
      threshold: 15,
      dailyConsumption: 0.3,
      estimatedDaysRemaining: 150,
      reorderStatus: 'Nominal',
      locationSector: 'Heavy Shop Garage Bay 3',
      lastAudited: '3 days ago'
    },
    {
      id: 'INV-MC-MED-01',
      name: 'Trauma & Surgical Center Surgical Packs',
      category: 'Medical supplies',
      currentStock: 420,
      unit: 'Packs',
      threshold: 120,
      dailyConsumption: 1.2,
      estimatedDaysRemaining: 350,
      reorderStatus: 'Nominal',
      locationSector: 'McMurdo Medical Center',
      lastAudited: '1 week ago'
    }
  ],
  cargo: [
    {
      id: 'CARGO-MC-01',
      description: 'USCGC Polar Star Heavy Maritime Resupply Vessel',
      category: 'Fuel',
      weightKg: 220000,
      quantity: 1,
      unit: 'Vessel',
      origin: 'Christchurch Lyttelton Port',
      destination: 'McMurdo Ice Pier',
      transportMode: 'Icebreaker Vessel',
      currentLocation: 'Ross Sea Ice Edge Channel',
      coordinates: [-76.4000, 168.2000],
      expectedArrival: '2026-11-26',
      status: 'In Transit',
      delayDays: 0,
      priority: 'CRITICAL'
    },
    {
      id: 'CARGO-MC-02',
      description: 'C-17 Globemaster III Heavy Air Bridge Flight #14',
      category: 'Food',
      weightKg: 32000,
      quantity: 16,
      unit: 'Pallets',
      origin: 'Christchurch Air Base',
      destination: 'Phoenix Ice Runway',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Final Approach Phoenix Runway',
      coordinates: [-77.9200, 166.7500],
      expectedArrival: '2026-11-20 20:30 UTC',
      status: 'In Transit',
      delayDays: 0,
      priority: 'HIGH'
    }
  ],
  assets: [
    {
      id: 'AST-MC-GEN-01',
      name: 'Caterpillar 3516 1.2 MW Mega-Genset (Unit 1)',
      type: 'Primary Diesel Genset',
      locationSector: 'Building 136 - Central Power Plant',
      conditionPct: 96,
      hoursRun: 8900,
      lastInspection: '2026-11-16',
      nextMaintenance: '2026-12-25',
      status: 'Operational',
      telemetry: {
        tempC: 86,
        powerDrawKw: 850,
        fuelLevelPct: 92,
        loadPct: 71
      }
    },
    {
      id: 'AST-MC-BUS-01',
      name: 'Ivan the Terra Bus (56-Passenger Ice Carrier)',
      type: 'Tracked Personnel Carrier',
      locationSector: 'Building 190 - Vehicle Maintenance Facility',
      conditionPct: 94,
      hoursRun: 2800,
      lastInspection: '2026-11-18',
      nextMaintenance: '2026-12-18',
      status: 'Operational',
      telemetry: {
        tempC: 78,
        powerDrawKw: 0,
        fuelLevelPct: 86,
        loadPct: 40
      }
    },
    {
      id: 'AST-MC-DOZ-01',
      name: 'Caterpillar D8T Low-Ground-Pressure Bulldozer',
      type: 'Heavy Traverse Snowcat',
      locationSector: 'Phoenix Runway Staging Pad',
      conditionPct: 91,
      hoursRun: 4200,
      lastInspection: '2026-11-14',
      nextMaintenance: '2026-12-14',
      status: 'Operational',
      telemetry: {
        tempC: 82,
        powerDrawKw: 0,
        fuelLevelPct: 75,
        loadPct: 65
      }
    }
  ],
  personnel: [
    {
      id: 'PER-MC-01',
      name: 'Cmdr. Sarah Jenkins',
      role: 'USAP Station Manager & Logistics Director',
      team: 'Command Staff',
      currentLocation: 'Building 155 - Station Ops Hub',
      coordinates: [-77.8463, 166.6682],
      currentAssignment: 'Coordinating C-17 airlift flight window and harbor icebreaker discharge',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Station Emergency Coordinator',
      vitals: { heartRateBpm: 68, bodyTempC: 37.0, spo2Pct: 99 }
    },
    {
      id: 'PER-MC-02',
      name: 'Maj. Dave Miller',
      role: 'Chief Airfield Manager (Phoenix & Williams)',
      team: 'Logistics',
      currentLocation: 'Phoenix Ice Runway Tower',
      coordinates: [-77.9200, 166.7500],
      currentAssignment: 'Monitoring surface melt pools and guiding inbound C-17 touch down',
      availability: 'On Duty',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Nominal',
      emergencyRole: 'Airfield SAR Incident Commander',
      vitals: { heartRateBpm: 75, bodyTempC: 36.8, spo2Pct: 98 }
    },
    {
      id: 'PER-MC-03',
      name: 'Chuck OBrien',
      role: 'Heavy Mechanical Superintendent',
      team: 'Infrastructure',
      currentLocation: 'Heavy Shop Garage Bay 1',
      coordinates: [-77.8470, 166.6710],
      currentAssignment: 'Overseeing Caterpillar 3516 turbine heat balance',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Engineering Disaster Response',
      vitals: { heartRateBpm: 80, bodyTempC: 36.9, spo2Pct: 97 }
    }
  ],
  alerts: [
    {
      id: 'ALT-MC-01',
      timestamp: '25 min ago',
      title: 'Warm Midday Solar Absorption on Pegasus Corridor',
      description: 'Black volcanic dust deposits causing localized soft spots on sea-ice route. Heavy trucks restricted.',
      severity: 'WARNING',
      category: 'Weather',
      acknowledged: true,
      actionRecommendation: 'Divert heavy flatbeds to Williams Field compacted snowpack.'
    },
    {
      id: 'ALT-MC-02',
      timestamp: '1 hr ago',
      title: 'South Pole Fuel Traverse Convoy Reached Mile 240',
      description: 'Quadtrac convoy completed crevasse shear zone passage successfully. All 45,000L fuel secure.',
      severity: 'INFO',
      category: 'Cargo',
      acknowledged: true,
      actionRecommendation: 'Maintain daily scheduled HF check-ins at 08:00 and 20:00 UTC.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-14',
      title: 'Vehicle Malfunction: Terra Bus Steering Hydraulic Hose Rupture',
      type: 'Vehicle failure',
      locationSector: 'Pegasus Roadway (Mile 7.2)',
      coordinates: [-77.8900, 166.7100],
      severity: 'MEDIUM',
      status: 'REPORTED',
      reportedAt: '16:05 UTC',
      nearestTeam: 'Heavy Shop Mobile Repair Truck',
      availableVehicles: ['Caterpillar Service Truck 04', 'Tracked Hagglunds'],
      requiredEquipment: ['Hydraulic Crimper', '50L Tellus Arctic Oil', 'Absorbent Spill Pads'],
      medicalResources: ['Vehicle First Aid Kit'],
      suggestedResponseTeam: ['Chuck OBrien', 'Mech Tech Todd Adams'],
      responseEtaMinutes: 12,
      incidentTimeline: [
        { time: '16:05 UTC', event: 'Terra Bus operator reported loss of hydraulic steering pressure', actor: 'Driver Dan Larson' },
        { time: '16:08 UTC', event: 'Passengers transferred to backup passenger van', actor: 'Transport Dispatch' }
      ],
      recommendedPlan: 'Deploy Mobile Repair Truck to Mile 7.2, clamp failed return line, and refill Arctic hydraulic fluid.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-MC-1',
      name: 'Scenario 1: Christchurch C-17 Air Bridge Grounded by Volcanic Ash',
      cargoDelayedDays: 6,
      fuelConsumptionIncreasePct: 0,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Normal Arctic Air',
      description: 'Mount Erebus or regional atmospheric disturbance suspends high-altitude air bridge from New Zealand.'
    }
  ],
  history: [
    {
      id: 'HIST-MC-2024',
      missionName: 'Operation Deep Freeze 2024 Resupply',
      season: '2023-2024',
      station: 'McMurdo Station',
      commander: 'Capt. E. Vance',
      outcome: 'Success',
      totalDurationDays: 450,
      totalPersonnel: 180,
      incidentsLogged: 8,
      fuelConsumedLiters: 1200000,
      cargoDelaysDays: 2,
      lessonsLearned: [
        'Laser grading Phoenix ice runway reduced tire wear on C-17 Globemasters by 40%.',
        'Bulk fuel transfer manifold operated at 100% capacity during 72-hour tanker docking window.'
      ],
      appliedToCurrent: 'Automated laser leveling implemented for entire 2026 runway season.'
    }
  ]
};

// ==========================================
// 4. AMUNDSEN-SCOTT SOUTH POLE DATASET
// ==========================================
const southpoleData: StationDataset = {
  profile: stationProfiles.southpole,
  expedition: {
    id: 'EXP-PS-27',
    name: 'Pole-Star 27 Astrophysics & IceCube Deep Coring',
    code: 'PS-27',
    phase: 'Winterization',
    progress: 58,
    startDate: '2026-10-25',
    endDate: '2027-04-01',
    destination: 'Geographic South Pole (Plateau 2,835m)',
    station: 'Amundsen-Scott South Pole Station (-90.0000° S, 0.0000° E)',
    leadCommander: 'Dr. Robert Mercer (Station Director)',
    teamMemberCount: 38,
    readinessScore: 54,
    requiredResourcesSummary: '35,000 L AN-8 Polar Kerosene, 5,200 High-Altitude Rations, Medical O2 Cylinders',
    requiredEquipmentSummary: 'Elevated Station Hydraulic Jacking Pylons, 2 Cummins QSK60 Gensets, BICEP Telescope',
    transportMethod: 'Ski-equipped LC-130 Hercules flights from McMurdo (Subject to -50°C cold lockout)',
    emergencyPlanSummary: 'SAR Protocol White: Winter flight lockout active below -50°C. Total autonomous survival.',
    checklist: [
      { id: 'CHK-SP1', task: 'Elevated Station Hydraulic Leveling Leg Synchronization', assignedTo: 'Chief Eng. Sven Larson', completed: true, critical: true },
      { id: 'CHK-SP2', task: 'Cummins QSK60 Cold-Air Fuel Pre-Heater Verification', assignedTo: 'Power Tech Alex Wong', completed: true, critical: true },
      { id: 'CHK-SP3', task: 'South Pole Telescope (SPT) Liquid Helium Refill', assignedTo: 'Astrophysicist Linda Zhao', completed: false, critical: true },
      { id: 'CHK-SP4', task: 'Hyperbaric Altitude Chamber Seal & Oxygen Flow Check', assignedTo: 'Dr. Marcus Brody', completed: true, critical: true },
      { id: 'CHK-SP5', task: 'Skiway Marker Flags & Emergency Strobe Batteries', assignedTo: 'Skiway Lead Travis Cole', completed: false, critical: false }
    ]
  },
  inventory: [
    {
      id: 'INV-SP-FUEL-01',
      name: 'Extreme Cryo Arctic Fuel AN-8 (Fuel Depot)',
      category: 'Fuel',
      currentStock: 14200,
      unit: 'Liters',
      threshold: 18000,
      dailyConsumption: 640,
      estimatedDaysRemaining: 22,
      reorderStatus: 'Critical Depletion',
      locationSector: 'Underground Fuel Arch Tank 1',
      lastAudited: 'Today at 02:00 UTC'
    },
    {
      id: 'INV-SP-CRYO-01',
      name: 'Cryogenic Liquid Helium (4.2 Kelvin)',
      category: 'Scientific equipment',
      currentStock: 600,
      unit: 'Liters',
      threshold: 900,
      dailyConsumption: 38,
      estimatedDaysRemaining: 16,
      reorderStatus: 'Critical Depletion',
      locationSector: 'Dark Sector Telescope Lab',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-SP-MED-01',
      name: 'Medical Liquid Oxygen High-Pressure Cylinders',
      category: 'Medical supplies',
      currentStock: 42,
      unit: 'Cylinders',
      threshold: 40,
      dailyConsumption: 3,
      estimatedDaysRemaining: 14,
      reorderStatus: 'Critical Depletion',
      locationSector: 'Station Medical Clinic Arch',
      lastAudited: 'Today'
    },
    {
      id: 'INV-SP-FOOD-01',
      name: 'Extreme Polar Altitude Rations (4800 kcal)',
      category: 'Food',
      currentStock: 5200,
      unit: 'Meals',
      threshold: 2800,
      dailyConsumption: 114,
      estimatedDaysRemaining: 45,
      reorderStatus: 'Nominal',
      locationSector: 'Main Hab Food Lockers',
      lastAudited: '3 days ago'
    }
  ],
  cargo: [
    {
      id: 'CARGO-SP-01',
      description: 'LC-130 Flight Herc-04 carrying 8,000 L AN-8 Fuel',
      category: 'Fuel',
      weightKg: 6400,
      quantity: 1,
      unit: 'Flight',
      origin: 'McMurdo Williams Field',
      destination: 'Amundsen-Scott Skiway',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Delayed at McMurdo (-58°C ski hydraulic lockout)',
      coordinates: [-77.8500, 166.7000],
      expectedArrival: 'Delayed +3d',
      status: 'Delayed',
      delayDays: 3,
      priority: 'CRITICAL'
    },
    {
      id: 'CARGO-SP-02',
      description: 'South Pole Telescope Helium Compressor Replacement Parts',
      category: 'Scientific equipment',
      weightKg: 280,
      quantity: 2,
      unit: 'Crates',
      origin: 'Chicago Astrophysics Lab',
      destination: 'Dark Sector SPT Building',
      transportMode: 'LC-130 Hercules',
      currentLocation: 'Staged at McMurdo Cargo Facility',
      coordinates: [-77.8500, 166.7000],
      expectedArrival: 'Awaiting Flight Herc-04',
      status: 'Delayed',
      delayDays: 3,
      priority: 'CRITICAL'
    }
  ],
  assets: [
    {
      id: 'AST-SP-GEN-01',
      name: 'Cummins QSK60 High-Altitude Diesel Genset (Unit 1)',
      type: 'Primary Diesel Genset',
      locationSector: 'Power Plant Arch',
      conditionPct: 82,
      hoursRun: 6400,
      lastInspection: '2026-11-15',
      nextMaintenance: '2026-12-05',
      status: 'Warning',
      telemetry: {
        tempC: 92,
        powerDrawKw: 320,
        fuelLevelPct: 70,
        loadPct: 78
      }
    },
    {
      id: 'AST-SP-TEL-01',
      name: 'South Pole 10-meter Sub-millimeter Telescope (SPT)',
      type: 'Ice Core Deep Drill',
      locationSector: 'Dark Sector Facility',
      conditionPct: 79,
      hoursRun: 14200,
      lastInspection: '2026-11-17',
      nextMaintenance: '2026-11-28 (Cryo Compressor Due)',
      status: 'Warning',
      telemetry: {
        tempC: -58,
        powerDrawKw: 45,
        loadPct: 85
      }
    },
    {
      id: 'AST-SP-JACK-01',
      name: 'Elevated Station 36-Leg Synchronous Hydraulic Jack System',
      type: 'Primary Diesel Genset',
      locationSector: 'Station Steel Sub-Structure',
      conditionPct: 94,
      hoursRun: 18000,
      lastInspection: '2026-11-10',
      nextMaintenance: '2027-01-15',
      status: 'Operational',
      telemetry: {
        tempC: -45,
        powerDrawKw: 12,
        loadPct: 30
      }
    }
  ],
  personnel: [
    {
      id: 'PER-SP-01',
      name: 'Dr. Robert Mercer',
      role: 'Station Director & Observational Cosmologist',
      team: 'Command Staff',
      currentLocation: 'Elevated Station - B2 Hub',
      coordinates: [-90.0000, 0.0000],
      currentAssignment: 'Managing -58°C extreme cold protocol and fuel conservation directive',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Station Director',
      vitals: { heartRateBpm: 82, bodyTempC: 36.8, spo2Pct: 93 }
    },
    {
      id: 'PER-SP-02',
      name: 'Dr. Marcus Brody',
      role: 'Altitude & Extreme Cold Flight Surgeon',
      team: 'Medical Unit',
      currentLocation: 'Elevated Station - Medical Ward',
      coordinates: [-90.0000, 0.0000],
      currentAssignment: 'Monitoring crew SpO2 saturation at 2,835m effective physiological altitude',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Chief Triage Physician',
      vitals: { heartRateBpm: 76, bodyTempC: 37.1, spo2Pct: 95 }
    },
    {
      id: 'PER-SP-03',
      name: 'Dr. Linda Zhao',
      role: 'Astrophysicist (BICEP & SPT Lead)',
      team: 'Science Lab',
      currentLocation: 'Dark Sector SPT Control Room',
      coordinates: [-89.9980, 0.0020],
      currentAssignment: 'Troubleshooting helium compressor flow oscillation',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Cold Stress Alert',
      emergencyRole: 'Cryogenic Containment Lead',
      vitals: { heartRateBpm: 92, bodyTempC: 36.2, spo2Pct: 91 }
    }
  ],
  alerts: [
    {
      id: 'ALT-SP-01',
      timestamp: '8 min ago',
      title: 'Extreme Low Temperature: -58°C (Ski Lockout Active)',
      description: 'LC-130 ski hydraulic seals cannot operate below -50°C. Resupply flight Herc-04 grounded at McMurdo.',
      severity: 'CRITICAL',
      category: 'Weather',
      acknowledged: false,
      actionRecommendation: 'Enforce emergency heating conservation; restrict outdoor movements to <15 min.'
    },
    {
      id: 'ALT-SP-02',
      timestamp: '30 min ago',
      title: 'AN-8 Fuel Runway Low: 22 Days Remaining',
      description: 'Storage buffer approaching mandatory 20-day winter baseline threshold.',
      severity: 'WARNING',
      category: 'Fuel',
      acknowledged: false,
      relatedEntityId: 'INV-SP-FUEL-01',
      actionRecommendation: 'Lower Dark Sector auxiliary lab heating setpoint by 3°C.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-03',
      title: 'Cryogenic Failure: South Pole Telescope Helium Pressure Venting',
      type: 'Equipment failure',
      locationSector: 'Dark Sector SPT Receiver Cabin',
      coordinates: [-89.9980, 0.0020],
      severity: 'CRITICAL',
      status: 'REPORTED',
      reportedAt: '13:50 UTC',
      nearestTeam: 'Cryo Engineering Response (Linda Zhao + Sven Larson)',
      availableVehicles: ['Enclosed Heated Snowcat 01'],
      requiredEquipment: ['Helium Recovery Manifold', 'Cryo-Gloves & Face Shield', 'Vacuum Gauge'],
      medicalResources: ['Cold Vapor Burn Gel Kit'],
      suggestedResponseTeam: ['Sven Larson (Chief Eng)', 'Linda Zhao (Cryo Specialist)'],
      responseEtaMinutes: 5,
      incidentTimeline: [
        { time: '13:50 UTC', event: 'Receiver cryostat pressure climbed to 1.8 bar; automated vent opened', actor: 'SPT Telemetry System' },
        { time: '13:54 UTC', event: 'Audio alarm sounded in Dark Sector control room', actor: 'Dr. Linda Zhao' }
      ],
      recommendedPlan: 'Drive heated Snowcat to Dark Sector, cycle bypass compressor valve, and verify helium recovery circuit.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-SP-1',
      name: 'Scenario 1: -65°C Polar Lockout Grounding Flights for 14 Days',
      cargoDelayedDays: 14,
      fuelConsumptionIncreasePct: 22,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Class 5 Polar Blizzard',
      description: 'Record cold plateau snap locks out all ski-aircraft; base relies entirely on underground AN-8 fuel reserves.'
    }
  ],
  history: [
    {
      id: 'HIST-SP-2023',
      missionName: 'Pole-Star 24 Overwinter Season',
      season: '2023-2024',
      station: 'Amundsen-Scott South Pole Station',
      commander: 'Dr. K. Higgins',
      outcome: 'Success',
      totalDurationDays: 365,
      totalPersonnel: 39,
      incidentsLogged: 4,
      fuelConsumedLiters: 480000,
      cargoDelaysDays: 11,
      lessonsLearned: [
        'Hydraulic fluid in elevator jacks requires continuous 25W heating jackets below -55°C.',
        'Supplementary medical oxygen significantly reduced sleep apnea incidents at 2,835m.'
      ],
      appliedToCurrent: 'Dedicated heating jackets installed on all 36 foundation stilts for PS-27.'
    }
  ]
};

// ==========================================
// 5. NEUMAYER STATION III DATASET (Ekström)
// ==========================================
const neumayerData: StationDataset = {
  profile: stationProfiles.neumayer,
  expedition: {
    id: 'EXP-NEX-42',
    name: 'Neumayer Expedition XLII - Ekström Shelf Dynamics',
    code: 'NEX-42',
    phase: 'Traverse & Fieldwork',
    progress: 74,
    startDate: '2026-10-10',
    endDate: '2027-03-31',
    destination: 'Ekström Ice Shelf & Atka Bay Sea Ice',
    station: 'Neumayer Station III (-70.6744° S, -8.2742° W)',
    leadCommander: 'Dr. Hannelore Weber (Station Leader)',
    teamMemberCount: 18,
    readinessScore: 74,
    requiredResourcesSummary: '42,000 L Low-Sulfur Polar Gasoil, Helium Sounding Cylinders, Hydraulic Jacking Oil',
    requiredEquipmentSummary: '16 Synchronous Hydraulic Jack Stilts, 2 Scania Cogeneration Gensets, 1 Balloon Shed',
    transportMethod: 'Research Vessel Polarstern Container Offload at Atka Bay Sea Ice Shelf Edge',
    emergencyPlanSummary: 'SAR Protocol Blue: Medevac via Dornier 228 to Troll or Cape Town.',
    checklist: [
      { id: 'CHK-N1', task: 'Hydraulic Synchronous Jacking System Quarterly Lift (+1.1 cm)', assignedTo: 'Hydraulic Eng. Klaus Becker', completed: true, critical: true },
      { id: 'CHK-N2', task: 'Scania DC13 Cogeneration Thermal Recovery Audit (88% SLA)', assignedTo: 'Power Eng. Otto Braun', completed: true, critical: true },
      { id: 'CHK-N3', task: 'Atka Bay Fast-Ice Edge Calving Crack GPR Sonar Survey', assignedTo: 'Geophysicist Astrid Lindholm', completed: false, critical: true },
      { id: 'CHK-N4', task: 'Atmospheric Ozone Sounding Balloon Auto-Launcher Calibration', assignedTo: 'Meteorologist Birgit Wagner', completed: true, critical: false },
      { id: 'CHK-N5', task: 'Atka Bay Marine Acoustic Hydrophone Recording Verification', assignedTo: 'Marine Biologist Lars Fischer', completed: false, critical: false }
    ]
  },
  inventory: [
    {
      id: 'INV-N-FUEL-01',
      name: 'Low-Sulfur Arctic Polar Gasoil (Underground Garage)',
      category: 'Fuel',
      currentStock: 34000,
      unit: 'Liters',
      threshold: 12000,
      dailyConsumption: 650,
      estimatedDaysRemaining: 52,
      reorderStatus: 'Nominal',
      locationSector: 'Under-Platform Fuel Depot Arch',
      lastAudited: 'Today at 05:00 UTC'
    },
    {
      id: 'INV-N-GAS-01',
      name: 'Atmospheric Helium Gas Sounding Bottles',
      category: 'Scientific equipment',
      currentStock: 48,
      unit: 'Bottles',
      threshold: 50,
      dailyConsumption: 3.4,
      estimatedDaysRemaining: 14,
      reorderStatus: 'Reorder Due',
      locationSector: 'Balloon Inflation Hall',
      lastAudited: 'Yesterday'
    },
    {
      id: 'INV-N-HYD-01',
      name: 'Bio-Degradable Extreme-Low-Temp Hydraulic Fluid',
      category: 'Spare parts',
      currentStock: 1200,
      unit: 'Liters',
      threshold: 500,
      dailyConsumption: 12,
      estimatedDaysRemaining: 100,
      reorderStatus: 'Nominal',
      locationSector: 'Hydraulic Jack Sub-Platform',
      lastAudited: '2 days ago'
    },
    {
      id: 'INV-N-FOOD-01',
      name: 'Freeze-Dried Vacuum Rations (AWI Standard)',
      category: 'Food',
      currentStock: 2600,
      unit: 'Meals',
      threshold: 1400,
      dailyConsumption: 54,
      estimatedDaysRemaining: 48,
      reorderStatus: 'Nominal',
      locationSector: 'Station Galley Store',
      lastAudited: '4 days ago'
    }
  ],
  cargo: [
    {
      id: 'CARGO-N-01',
      description: 'RV Polarstern Container Discharge (14.5 Metric Tons)',
      category: 'Spare parts',
      weightKg: 14500,
      quantity: 6,
      unit: 'Containers',
      origin: 'Bremerhaven Port / Cape Town',
      destination: 'Neumayer Station III Garage',
      transportMode: 'Icebreaker Vessel',
      currentLocation: 'Atka Bay Sea Ice Edge (Discharge suspended by storm swell)',
      coordinates: [-70.5200, -8.1500],
      expectedArrival: '2026-11-24 (Delayed +2d)',
      status: 'Delayed',
      delayDays: 2,
      priority: 'HIGH'
    }
  ],
  assets: [
    {
      id: 'AST-N-JACK-01',
      name: '16 Hydraulic Synchronous Jacking Stilts (+4.2 cm/yr)',
      type: 'Primary Diesel Genset',
      locationSector: 'Ice Shelf Platform Foundation',
      conditionPct: 96,
      hoursRun: 14500,
      lastInspection: '2026-11-18',
      nextMaintenance: '2027-02-10',
      status: 'Operational',
      telemetry: {
        tempC: -31,
        powerDrawKw: 18,
        loadPct: 42
      }
    },
    {
      id: 'AST-N-GEN-01',
      name: 'Scania DC13 Cogeneration Power Plant (160 kW)',
      type: 'Primary Diesel Genset',
      locationSector: 'Platform Powerhouse Module',
      conditionPct: 94,
      hoursRun: 5120,
      lastInspection: '2026-11-14',
      nextMaintenance: '2026-12-14',
      status: 'Operational',
      telemetry: {
        tempC: 82,
        powerDrawKw: 145,
        fuelLevelPct: 88,
        loadPct: 65
      }
    },
    {
      id: 'AST-N-GROOM-01',
      name: 'Kässbohrer PistenBully PB300 Polar Groomer',
      type: 'Heavy Traverse Snowcat',
      locationSector: 'Sub-Ice Shelf Garage Ramp',
      conditionPct: 90,
      hoursRun: 1840,
      lastInspection: '2026-11-10',
      nextMaintenance: '2026-12-05',
      status: 'Operational',
      telemetry: {
        tempC: 75,
        powerDrawKw: 0,
        fuelLevelPct: 92,
        loadPct: 35
      }
    }
  ],
  personnel: [
    {
      id: 'PER-N-01',
      name: 'Dr. Hannelore Weber',
      role: 'Station Leader & Marine Geophysicist',
      team: 'Command Staff',
      currentLocation: 'Main Deck Operations Room',
      coordinates: [-70.6744, -8.2742],
      currentAssignment: 'Coordinating RV Polarstern Atka Bay discharge and 42kt storm precautions',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Station Leader Alpha',
      vitals: { heartRateBpm: 72, bodyTempC: 36.9, spo2Pct: 99 }
    },
    {
      id: 'PER-N-02',
      name: 'Klaus Becker',
      role: 'Chief Hydraulic & Structural Engineer',
      team: 'Infrastructure',
      currentLocation: 'Hydraulic Jacking Gallery',
      coordinates: [-70.6748, -8.2740],
      currentAssignment: 'Monitoring synchronous level sensors across all 16 hydraulic pylons',
      availability: 'On Duty',
      contactStatus: 'Local Mesh WiFi',
      safetyStatus: 'Nominal',
      emergencyRole: 'Structural Integrity Officer',
      vitals: { heartRateBpm: 78, bodyTempC: 36.8, spo2Pct: 98 }
    },
    {
      id: 'PER-N-03',
      name: 'Dr. Astrid Lindholm',
      role: 'Sea Ice & Shelf Dynamics Specialist',
      team: 'Science Lab',
      currentLocation: 'Sub-Ice Garage Staging Ramp',
      coordinates: [-70.6740, -8.2750],
      currentAssignment: 'Prepping radar sonar sled to inspect Atka Bay calving crack',
      availability: 'Field Traverse',
      contactStatus: 'VHF Channel 4',
      safetyStatus: 'Extreme Weather Protocol',
      emergencyRole: 'Glaciological SAR Officer',
      vitals: { heartRateBpm: 86, bodyTempC: 36.6, spo2Pct: 97 }
    }
  ],
  alerts: [
    {
      id: 'ALT-N-01',
      timestamp: '14 min ago',
      title: 'Class 4 Gale Warning: 42kt Winds with Zero Visibility',
      description: 'Ekström ice shelf storm front intensifying. Surface blizzard protocol active.',
      severity: 'CRITICAL',
      category: 'Weather',
      acknowledged: false,
      actionRecommendation: 'Secure outer garage ramp; halt all vehicular traverse to Atka Bay.'
    },
    {
      id: 'ALT-N-02',
      timestamp: '50 min ago',
      title: 'Atka Bay Calving Fissure Monitored',
      description: 'Fissure opened 4.2 km North of sea-ice offload ramp; movement rate 0.8 cm/day.',
      severity: 'WARNING',
      category: 'Cargo',
      acknowledged: true,
      actionRecommendation: 'Mark safe bypass corridor with orange bamboo radar reflectors.'
    }
  ],
  incidents: [
    {
      id: 'INC-2026-19',
      title: 'Ice Shelf Hazard: Atka Bay Offload Ramp Fissure Expansion',
      type: 'Extreme weather',
      locationSector: 'Atka Bay Shelf Edge (4.2 km North of Base)',
      coordinates: [-70.6350, -8.2400],
      severity: 'HIGH',
      status: 'REPORTED',
      reportedAt: '16:40 UTC',
      nearestTeam: 'Shelf Dynamics Team (Dr. Astrid Lindholm + Klaus Becker)',
      availableVehicles: ['PistenBully PB300 with GPR Array'],
      requiredEquipment: ['Ground Penetrating Radar', 'Laser Distance Meter', 'Bamboo Route Markers'],
      medicalResources: ['Cold Exposure Hypothermia Kit'],
      suggestedResponseTeam: ['Astrid Lindholm (Glaciologist)', 'Klaus Becker (Hydraulic Eng)'],
      responseEtaMinutes: 10,
      incidentTimeline: [
        { time: '16:40 UTC', event: 'Satellite InSAR alert flagged accelerated fissure displacement at ramp', actor: 'AWI Remote Sensing Center' },
        { time: '16:45 UTC', event: 'Reconnaissance snowcat staged at garage ramp', actor: 'Klaus Becker' }
      ],
      recommendedPlan: 'Deploy GPR snowcat along flagged route to map crevasse boundaries and re-anchor sea-ice discharge ramp.'
    }
  ],
  scenarios: [
    {
      id: 'SCEN-N-1',
      name: 'Scenario 1: Atka Bay Ice Shelf Calving Event',
      cargoDelayedDays: 8,
      fuelConsumptionIncreasePct: 10,
      generatorFailedHours: 0,
      personnelDelta: 0,
      weatherCondition: 'Class 5 Polar Blizzard',
      description: 'A 2 km ice shelf section separates into Atka Bay, severing direct sea-ice access for RV Polarstern.'
    }
  ],
  history: [
    {
      id: 'HIST-N-41',
      missionName: 'Neumayer Expedition XLI',
      season: '2024-2025',
      station: 'Neumayer Station III',
      commander: 'Dr. M. Schultz',
      outcome: 'Success',
      totalDurationDays: 415,
      totalPersonnel: 19,
      incidentsLogged: 4,
      fuelConsumedLiters: 195000,
      cargoDelaysDays: 5,
      lessonsLearned: [
        'Hydraulic lifting cycles performed before heavy snowfall prevented snow drift burial.',
        'Atka Bay Emperor Penguin sanctuary boundaries successfully maintained during resupply operations.'
      ],
      appliedToCurrent: 'Synchronous automated jacking schedule established in NEX-42.'
    }
  ]
};

export const stationsDataset: Record<StationId, StationDataset> = {
  bharati: bharatiData,
  maitri: maitriData,
  mcmurdo: mcmurdoData,
  southpole: southpoleData,
  neumayer: neumayerData
};
