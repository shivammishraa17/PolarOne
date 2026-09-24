export type StationId = 'bharati' | 'maitri' | 'himadri';

export interface StationProfile {
  id: StationId;
  name: string;
  shortName: string;
  region: string;
  country: string;
  operator: string;
  flagEmoji: string;
  coordinates: [number, number]; // [lat, lng]
  elevationM: number;
  utcOffsetHours: number;
  weather: {
    tempC: number;
    windKt: number;
    windDir: string;
    daylight: string;
    condition: string;
  };
  readinessScore: number;
  statusBadge: string;
  tagline: string;
}

export type UserRole = 
  | 'ADMIN'
  | 'MISSION COMMANDER'
  | 'LOGISTICS MANAGER'
  | 'FIELD OPERATOR'
  | 'VIEWER';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type AlertCategory = 
  | 'Fuel' 
  | 'Cargo' 
  | 'Generator' 
  | 'Personnel' 
  | 'Medical' 
  | 'Weather' 
  | 'Comms';

export interface Alert {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: AlertCategory;
  acknowledged: boolean;
  relatedEntityId?: string;
  actionRecommendation?: string;
}

export type MissionPhase = 
  | 'Mobilization' 
  | 'Traverse & Fieldwork' 
  | 'Resupply & Station Support' 
  | 'Winterization' 
  | 'De-induction';

export interface MissionChecklistItem {
  id: string;
  task: string;
  assignedTo: string;
  completed: boolean;
  critical: boolean;
}

export interface Expedition {
  id: string;
  name: string;
  code: string;
  phase: MissionPhase;
  progress: number;
  startDate: string;
  endDate: string;
  destination: string;
  station: string;
  leadCommander: string;
  teamMemberCount: number;
  readinessScore: number; // 0 to 100
  requiredResourcesSummary: string;
  requiredEquipmentSummary: string;
  transportMethod: string;
  emergencyPlanSummary: string;
  checklist: MissionChecklistItem[];
}

export type CargoCategory = 
  | 'Fuel' 
  | 'Food' 
  | 'Medical supplies' 
  | 'Spare parts' 
  | 'Scientific equipment' 
  | 'Batteries' 
  | 'Safety equipment';

export type CargoStatus = 
  | 'Planned' 
  | 'Packed' 
  | 'In Transit' 
  | 'At Station' 
  | 'Delivered' 
  | 'Delayed';

export type TransportMode = 
  | 'Icebreaker Vessel' 
  | 'LC-130 Hercules' 
  | 'PistenBully Traverse' 
  | 'Twin Otter Ski-Plane';

export interface CargoItem {
  id: string;
  description: string;
  category: CargoCategory;
  weightKg: number;
  quantity: number;
  unit: string;
  origin: string;
  destination: string;
  transportMode: TransportMode;
  currentLocation: string;
  coordinates: [number, number]; // [lat, lng]
  expectedArrival: string;
  status: CargoStatus;
  delayDays: number;
  priority: 'ROUTINE' | 'HIGH' | 'CRITICAL';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: CargoCategory;
  currentStock: number;
  unit: string;
  threshold: number;
  dailyConsumption: number;
  estimatedDaysRemaining: number;
  reorderStatus: 'Nominal' | 'Reorder Due' | 'Critical Depletion' | 'Resupply In-Transit';
  locationSector: string;
  lastAudited: string;
}

export type AssetCondition = 'OPTIMAL' | 'FAIR' | 'ATTENTION' | 'CRITICAL';
export type AssetOperationalStatus = 'Operational' | 'Warning' | 'Critical';

export interface Asset {
  id: string;
  name: string;
  type: 
    | 'Heavy Traverse Snowcat'
    | 'Tracked Personnel Carrier'
    | 'Skidoo Snowmobile'
    | 'Primary Diesel Genset'
    | 'Backup Diesel Genset'
    | 'Wind Micro-Turbine Farm'
    | 'Iridium Satellite Radome'
    | 'Ice Core Deep Drill'
    | 'Automated Weather Station'
    | 'Cryo-Medical Unit';
  locationSector: string;
  conditionPct: number;
  hoursRun: number;
  lastInspection: string;
  nextMaintenance: string;
  status: AssetOperationalStatus;
  telemetry: {
    tempC: number;
    powerDrawKw: number;
    fuelLevelPct?: number;
    loadPct?: number;
  };
}

export interface Personnel {
  id: string;
  name: string;
  role: string;
  team: string;
  currentLocation: string;
  coordinates: [number, number];
  currentAssignment: string;
  availability: 'On Duty' | 'Resting' | 'Field Traverse' | 'Emergency Standby';
  contactStatus: 'VHF Channel 4' | 'Iridium Satellite' | 'Local Mesh WiFi' | 'Offline / Deep Ice';
  safetyStatus: 'Nominal' | 'Cold Stress Alert' | 'Extreme Weather Protocol' | 'Fatigue Warning';
  emergencyRole: string;
  vitals: {
    heartRateBpm: number;
    bodyTempC: number;
    spo2Pct: number;
  };
}

export type EmergencyType = 
  | 'Medical emergency'
  | 'Equipment failure'
  | 'Fire'
  | 'Extreme weather'
  | 'Vehicle failure'
  | 'Communication failure'
  | 'Personnel missing';

export interface IncidentTimelineEvent {
  time: string;
  event: string;
  actor: string;
}

export interface EmergencyIncident {
  id: string;
  title: string;
  type: EmergencyType;
  locationSector: string;
  coordinates: [number, number];
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'REPORTED' | 'DISPATCHED' | 'RESOLVING' | 'RESOLVED';
  reportedAt: string;
  nearestTeam: string;
  availableVehicles: string[];
  requiredEquipment: string[];
  medicalResources: string[];
  suggestedResponseTeam: string[];
  responseEtaMinutes: number;
  incidentTimeline: IncidentTimelineEvent[];
  recommendedPlan: string;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  cargoDelayedDays: number;
  fuelConsumptionIncreasePct: number;
  generatorFailedHours: number;
  personnelDelta: number;
  weatherCondition: 'Normal Arctic Air' | 'Katabatic Gale' | 'Class 5 Polar Blizzard';
  description: string;
}

export interface MissionHistoryRecord {
  id: string;
  missionName: string;
  season: string;
  station: string;
  commander: string;
  outcome: 'Success' | 'Partial Success' | 'Aborted / Evacuated';
  totalDurationDays: number;
  totalPersonnel: number;
  incidentsLogged: number;
  fuelConsumedLiters: number;
  cargoDelaysDays: number;
  lessonsLearned: string[];
  appliedToCurrent: string;
}

export type ConnectivityStatus = 'ONLINE' | 'OFFLINE' | 'SYNCING';

export interface SyncMutation {
  id: string;
  timestamp: string;
  actionType: string;
  entityType: string;
  payload: any;
}
