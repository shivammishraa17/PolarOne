import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
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
  MissionHistoryRecord, 
  UserRole, 
  ConnectivityStatus, 
  SyncMutation,
  CargoStatus,
  AssetOperationalStatus
} from '../types';
import { 
  stationProfiles, 
  stationsDataset, 
  StationDataset 
} from '../data/mockData';

interface MissionContextType {
  // Global Station
  activeStationId: StationId;
  setActiveStationId: (id: StationId) => void;
  activeStation: StationProfile;
  allStations: StationProfile[];

  // User & Connectivity
  role: UserRole;
  setRole: (role: UserRole) => void;
  connectivity: ConnectivityStatus;
  toggleConnectivity: () => void;
  pendingSyncQueue: SyncMutation[];
  syncQueueNow: () => void;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Mission & Checklist
  expedition: Expedition;
  updateExpedition: (exp: Partial<Expedition>) => void;
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (task: string, assignedTo: string, critical: boolean) => void;

  // Inventory
  inventory: InventoryItem[];
  adjustStock: (id: string, delta: number, reason: string) => void;
  setStockDirect: (id: string, newStock: number) => void;

  // Cargo
  cargo: CargoItem[];
  updateCargoStatus: (id: string, newStatus: CargoStatus, delayDays?: number) => void;
  addCargo: (item: CargoItem) => void;

  // Assets
  assets: Asset[];
  updateAssetStatus: (id: string, status: AssetOperationalStatus) => void;
  logMaintenance: (id: string) => void;
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;

  // Personnel
  personnel: Personnel[];
  updatePersonnelSafety: (id: string, safety: Personnel['safetyStatus']) => void;

  // Alerts
  alerts: Alert[];
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => void;

  // Emergencies
  incidents: EmergencyIncident[];
  dispatchIncidentTeam: (id: string, team: string, vehicle: string) => void;
  resolveIncident: (id: string) => void;
  createIncident: (incident: Partial<EmergencyIncident>) => void;

  // Simulator
  scenarios: WhatIfScenario[];
  activeScenario: WhatIfScenario;
  setActiveScenario: (scenario: WhatIfScenario) => void;

  // History
  history: MissionHistoryRecord[];

  // Demo Walkthrough
  demoStep: number;
  setDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  triggerFullDemoWorkflow: () => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global Station selection
  const [activeStationId, setActiveStationIdState] = useState<StationId>('bharati');

  // Complete station dataset state dictionary - preserves edits per station
  const [stationsState, setStationsState] = useState<Record<StationId, StationDataset>>(() => {
    return JSON.parse(JSON.stringify(stationsDataset));
  });

  const [role, setRole] = useState<UserRole>('ADMIN');
  const [connectivity, setConnectivity] = useState<ConnectivityStatus>('ONLINE');
  const [pendingSyncQueue, setPendingSyncQueue] = useState<SyncMutation[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState<number>(0);

  // Active dataset for currently selected station
  const currentDataset = stationsState[activeStationId];

  // Active scenario for currently selected station
  const [activeScenario, setActiveScenario] = useState<WhatIfScenario>(
    stationsDataset.bharati.scenarios[0]
  );

  // Switch station handler
  const setActiveStationId = (newId: StationId) => {
    setActiveStationIdState(newId);
    setSelectedAssetId(null);
    const stationData = stationsState[newId];
    if (stationData && stationData.scenarios.length > 0) {
      setActiveScenario(stationData.scenarios[0]);
    }
  };

  // Helper to update active station's state
  const updateActiveStationData = (updater: (prev: StationDataset) => StationDataset) => {
    setStationsState(prev => ({
      ...prev,
      [activeStationId]: updater(prev[activeStationId])
    }));
  };

  // Record mutation to offline queue if offline
  const recordMutation = (actionType: string, entityType: string, payload: any) => {
    if (connectivity === 'OFFLINE') {
      const mutation: SyncMutation = {
        id: 'MUT-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        actionType,
        entityType,
        payload: { stationId: activeStationId, ...payload }
      };
      setPendingSyncQueue(prev => [...prev, mutation]);
    }
  };

  const toggleConnectivity = () => {
    if (connectivity === 'ONLINE') {
      setConnectivity('OFFLINE');
    } else if (connectivity === 'OFFLINE') {
      syncQueueNow();
    }
  };

  const syncQueueNow = () => {
    setConnectivity('SYNCING');
    setTimeout(() => {
      setConnectivity('ONLINE');
      setPendingSyncQueue([]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.1 }
      });
    }, 1200);
  };

  // Connected logic: recalculate readiness score for active station
  useEffect(() => {
    if (!currentDataset) return;
    let score = 100;

    // Check critical fuel or lowest runway item
    const criticalItems = currentDataset.inventory.filter(i => i.currentStock < i.threshold);
    score -= criticalItems.length * 12;

    // Check cargo delays
    const delayedCargo = currentDataset.cargo.filter(c => c.status === 'Delayed');
    score -= delayedCargo.length * 6;

    // Check warning assets
    const warningAssets = currentDataset.assets.filter(a => a.status === 'Warning' || a.status === 'Critical');
    score -= warningAssets.length * 5;

    // Check active emergencies
    const activeEmergencies = currentDataset.incidents.filter(i => i.status !== 'RESOLVED');
    score -= activeEmergencies.length * 10;

    score = Math.max(30, Math.min(100, score));

    if (currentDataset.expedition.readinessScore !== score) {
      updateActiveStationData(st => ({
        ...st,
        profile: { ...st.profile, readinessScore: score },
        expedition: { ...st.expedition, readinessScore: score }
      }));
    }
  }, [
    activeStationId, 
    currentDataset.inventory, 
    currentDataset.cargo, 
    currentDataset.assets, 
    currentDataset.incidents
  ]);

  // Mission functions
  const updateExpedition = (exp: Partial<Expedition>) => {
    updateActiveStationData(st => ({
      ...st,
      expedition: { ...st.expedition, ...exp }
    }));
    recordMutation('UPDATE', 'EXPEDITION', exp);
  };

  const toggleChecklistItem = (id: string) => {
    updateActiveStationData(st => ({
      ...st,
      expedition: {
        ...st.expedition,
        checklist: st.expedition.checklist.map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      }
    }));
    recordMutation('TOGGLE_CHECKLIST', 'EXPEDITION', { id });
  };

  const addChecklistItem = (task: string, assignedTo: string, critical: boolean) => {
    const newItem = {
      id: 'CHK-' + (currentDataset.expedition.checklist.length + 1),
      task,
      assignedTo,
      completed: false,
      critical
    };
    updateActiveStationData(st => ({
      ...st,
      expedition: {
        ...st.expedition,
        checklist: [...st.expedition.checklist, newItem]
      }
    }));
    recordMutation('ADD_CHECKLIST', 'EXPEDITION', newItem);
  };

  // Inventory functions
  const adjustStock = (id: string, delta: number, reason: string) => {
    updateActiveStationData(st => ({
      ...st,
      inventory: st.inventory.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, item.currentStock + delta);
          const days = Math.floor(newStock / Math.max(1, item.dailyConsumption));
          let reorderStatus = item.reorderStatus;
          if (newStock < item.threshold) {
            reorderStatus = 'Critical Depletion';
          } else if (newStock < item.threshold * 1.3) {
            reorderStatus = 'Reorder Due';
          } else {
            reorderStatus = 'Nominal';
          }
          return {
            ...item,
            currentStock: newStock,
            estimatedDaysRemaining: days,
            reorderStatus,
            lastAudited: `Adjusted (${reason})`
          };
        }
        return item;
      })
    }));
    recordMutation('ADJUST_STOCK', 'INVENTORY', { id, delta, reason });
  };

  const setStockDirect = (id: string, newStock: number) => {
    updateActiveStationData(st => ({
      ...st,
      inventory: st.inventory.map(item => {
        if (item.id === id) {
          const days = Math.floor(newStock / Math.max(1, item.dailyConsumption));
          return {
            ...item,
            currentStock: newStock,
            estimatedDaysRemaining: days,
            reorderStatus: newStock < item.threshold ? 'Critical Depletion' : 'Nominal'
          };
        }
        return item;
      })
    }));
  };

  // Cargo functions
  const updateCargoStatus = (id: string, newStatus: CargoStatus, delayDays?: number) => {
    updateActiveStationData(st => ({
      ...st,
      cargo: st.cargo.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            delayDays: delayDays !== undefined ? delayDays : item.delayDays
          };
        }
        return item;
      })
    }));

    if (newStatus === 'Delayed') {
      addAlert({
        title: `Cargo Alert: Shipment ${id} Delayed`,
        description: `Shipment delayed by ${delayDays || 5} days. Station runway impacted.`,
        severity: 'WARNING',
        category: 'Cargo',
        actionRecommendation: 'Test resupply buffer in What-If Simulator.'
      });
    }
    recordMutation('UPDATE_CARGO', 'CARGO', { id, newStatus, delayDays });
  };

  const addCargo = (item: CargoItem) => {
    updateActiveStationData(st => ({
      ...st,
      cargo: [item, ...st.cargo]
    }));
    addAlert({
      title: `Cargo Manifested: ${item.id}`,
      description: `${item.description} added to transport schedule.`,
      severity: 'INFO',
      category: 'Cargo',
      actionRecommendation: 'Monitor departure window from staging port.'
    });
    recordMutation('ADD_CARGO', 'CARGO', item);
  };

  // Asset functions
  const updateAssetStatus = (id: string, status: AssetOperationalStatus) => {
    updateActiveStationData(st => ({
      ...st,
      assets: st.assets.map(a => a.id === id ? { ...a, status } : a)
    }));
    recordMutation('UPDATE_ASSET_STATUS', 'ASSET', { id, status });
  };

  const logMaintenance = (id: string) => {
    updateActiveStationData(st => ({
      ...st,
      assets: st.assets.map(a => {
        if (a.id === id) {
          return {
            ...a,
            conditionPct: Math.min(100, a.conditionPct + 15),
            status: 'Operational',
            lastInspection: new Date().toISOString().split('T')[0],
            nextMaintenance: 'Scheduled in 30 days'
          };
        }
        return a;
      })
    }));
    confetti({ particleCount: 30, spread: 50 });
    recordMutation('LOG_MAINTENANCE', 'ASSET', { id });
  };

  // Personnel functions
  const updatePersonnelSafety = (id: string, safety: Personnel['safetyStatus']) => {
    updateActiveStationData(st => ({
      ...st,
      personnel: st.personnel.map(p => p.id === id ? { ...p, safetyStatus: safety } : p)
    }));
    recordMutation('UPDATE_SAFETY', 'PERSONNEL', { id, safety });
  };

  // Alert functions
  const acknowledgeAlert = (id: string) => {
    updateActiveStationData(st => ({
      ...st,
      alerts: st.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
    }));
  };

  const dismissAlert = (id: string) => {
    updateActiveStationData(st => ({
      ...st,
      alerts: st.alerts.filter(a => a.id !== id)
    }));
  };

  const addAlert = (newAlert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => {
    const alert: Alert = {
      ...newAlert,
      id: 'ALT-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      timestamp: 'Just now',
      acknowledged: false
    };
    updateActiveStationData(st => ({
      ...st,
      alerts: [alert, ...st.alerts]
    }));
  };

  // Incident functions
  const dispatchIncidentTeam = (id: string, team: string, vehicle: string) => {
    updateActiveStationData(st => ({
      ...st,
      incidents: st.incidents.map(inc => {
        if (inc.id === id) {
          const updatedTimeline = [
            ...inc.incidentTimeline,
            {
              time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
              event: `Dispatched: ${team} utilizing ${vehicle}. ETA: ${inc.responseEtaMinutes} mins.`,
              actor: `${role} Command Dispatch`
            }
          ];
          return {
            ...inc,
            status: 'DISPATCHED',
            incidentTimeline: updatedTimeline
          };
        }
        return inc;
      })
    }));

    addAlert({
      title: `Emergency Dispatched: Incident ${id}`,
      description: `${team} deployed with ${vehicle}. ETA: ${currentDataset.incidents.find(i => i.id === id)?.responseEtaMinutes || 8} minutes.`,
      severity: 'CRITICAL',
      category: 'Medical'
    });
    confetti({ particleCount: 40, spread: 70 });
    recordMutation('DISPATCH_EMERGENCY', 'INCIDENT', { id, team, vehicle });
  };

  const resolveIncident = (id: string) => {
    updateActiveStationData(st => ({
      ...st,
      incidents: st.incidents.map(inc => {
        if (inc.id === id) {
          return {
            ...inc,
            status: 'RESOLVED',
            incidentTimeline: [
              ...inc.incidentTimeline,
              {
                time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
                event: 'Field incident stabilized and resolved. Incident closed.',
                actor: `${role} Officer`
              }
            ]
          };
        }
        return inc;
      })
    }));
    recordMutation('RESOLVE_INCIDENT', 'INCIDENT', { id });
  };

  const createIncident = (partial: Partial<EmergencyIncident>) => {
    const newInc: EmergencyIncident = {
      id: 'INC-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      title: partial.title || 'Reported Field Incident',
      type: partial.type || 'Equipment failure',
      locationSector: partial.locationSector || `${currentDataset.profile.name} Perimeter`,
      coordinates: partial.coordinates || currentDataset.profile.coordinates,
      severity: partial.severity || 'HIGH',
      status: 'REPORTED',
      reportedAt: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
      nearestTeam: partial.nearestTeam || 'Rapid Response Unit',
      availableVehicles: partial.availableVehicles || [currentDataset.assets[0]?.name || 'Polar Snowcat'],
      requiredEquipment: partial.requiredEquipment || ['Rescue Ropes', 'Emergency Shelter'],
      medicalResources: partial.medicalResources || ['First Aid Kit'],
      suggestedResponseTeam: partial.suggestedResponseTeam || [currentDataset.personnel[0]?.name || 'Response Lead'],
      responseEtaMinutes: 10,
      incidentTimeline: [
        {
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' UTC',
          event: 'Incident logged via Polar Station Radio',
          actor: role
        }
      ],
      recommendedPlan: partial.recommendedPlan || 'Dispatch nearest tracked vehicle and secure perimeter.'
    };

    updateActiveStationData(st => ({
      ...st,
      incidents: [newInc, ...st.incidents]
    }));

    addAlert({
      title: `Emergency Logged: ${newInc.title}`,
      description: `Location: ${newInc.locationSector}. Immediate triage required.`,
      severity: 'CRITICAL',
      category: 'Medical'
    });
  };

  // Demo walkthrough steps (11-step complete tour for hackathon judges)
  const demoStepsList = [
    { tab: 'dashboard', label: '1. Mission Overview & Command Center' },
    { tab: 'cargo', label: '2. Cargo Tracking & Vessels' },
    { tab: 'inventory', label: '3. Inventory & Fuel Depletion' },
    { tab: 'digitaltwin', label: '4. 3D Digital Twin Inspection' },
    { tab: 'predictive', label: '5. Predictive Fuel Runway Alert' },
    { tab: 'cargo', label: '6. Resupply Delayed by Pack Ice' },
    { tab: 'simulator', label: '7. What-If Simulator Scenario' },
    { tab: 'simulator', label: '8. Apply Mitigation Strategy' },
    { tab: 'emergency', label: '9. Sector B Medical Emergency' },
    { tab: 'emergency', label: '10. Automated 1-Click Dispatch' },
    { tab: 'dashboard', label: '11. Updated Mission Readiness Score' }
  ];

  const nextDemoStep = () => {
    if (demoStep < demoStepsList.length - 1) {
      const nextIdx = demoStep + 1;
      setDemoStep(nextIdx);
      setActiveTab(demoStepsList[nextIdx].tab);
      executeStepAutomation(nextIdx);
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 0) {
      const prevIdx = demoStep - 1;
      setDemoStep(prevIdx);
      setActiveTab(demoStepsList[prevIdx].tab);
    }
  };

  const executeStepAutomation = (stepIdx: number) => {
    if (stepIdx === 5 && currentDataset.cargo.length > 0) {
      updateCargoStatus(currentDataset.cargo[0].id, 'Delayed', 5);
    } else if (stepIdx === 6 && currentDataset.scenarios.length > 0) {
      setActiveScenario(currentDataset.scenarios[0]);
    } else if (stepIdx === 7 && currentDataset.inventory.length > 0) {
      adjustStock(currentDataset.inventory[0].id, +600, 'Conserved via non-essential heating shutdown');
      confetti({ particleCount: 60, spread: 60 });
    } else if (stepIdx === 9 && currentDataset.incidents.length > 0) {
      const inc = currentDataset.incidents[0];
      dispatchIncidentTeam(inc.id, inc.nearestTeam, inc.availableVehicles[0] || 'Rescue Vehicle');
    }
  };

  const triggerFullDemoWorkflow = () => {
    setDemoStep(0);
    setActiveTab('dashboard');
  };

  return (
    <MissionContext.Provider
      value={{
        activeStationId,
        setActiveStationId,
        activeStation: currentDataset.profile,
        allStations: Object.values(stationProfiles),

        role,
        setRole,
        connectivity,
        toggleConnectivity,
        pendingSyncQueue,
        syncQueueNow,
        activeTab,
        setActiveTab,

        expedition: currentDataset.expedition,
        updateExpedition,
        toggleChecklistItem,
        addChecklistItem,

        inventory: currentDataset.inventory,
        adjustStock,
        setStockDirect,

        cargo: currentDataset.cargo,
        updateCargoStatus,
        addCargo,

        assets: currentDataset.assets,
        updateAssetStatus,
        logMaintenance,
        selectedAssetId,
        setSelectedAssetId,

        personnel: currentDataset.personnel,
        updatePersonnelSafety,

        alerts: currentDataset.alerts,
        acknowledgeAlert,
        dismissAlert,
        addAlert,

        incidents: currentDataset.incidents,
        dispatchIncidentTeam,
        resolveIncident,
        createIncident,

        scenarios: currentDataset.scenarios,
        activeScenario,
        setActiveScenario,

        history: currentDataset.history,

        demoStep,
        setDemoStep,
        nextDemoStep,
        prevDemoStep,
        triggerFullDemoWorkflow
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = (): MissionContextType => {
  const ctx = useContext(MissionContext);
  if (!ctx) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return ctx;
};
