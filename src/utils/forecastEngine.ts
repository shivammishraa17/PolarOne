import { InventoryItem, CargoItem, WhatIfScenario } from '../types';

export interface DailyProjectionPoint {
  day: number;
  date: string;
  fuelA1Current: number;
  fuelA1Simulated?: number;
  polarDieselCurrent: number;
  polarDieselSimulated?: number;
  foodCurrent: number;
  foodSimulated?: number;
  thresholdFuelA1: number;
  resupplyEvent?: string;
}

export interface ForecastSummary {
  resourceName: string;
  currentStock: number;
  currentDailyBurn: number;
  currentRunwayDays: number;
  projectedDepletionDate: string;
  isThresholdBreached: boolean;
  daysToThreshold: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  recommendedAction: string;
}

export interface SimulationResult {
  scenarioName: string;
  projections: DailyProjectionPoint[];
  resourceImpacts: {
    resource: string;
    unit: string;
    currentRunwayDays: number;
    simulatedRunwayDays: number;
    deltaDays: number;
    criticalStatus: 'SAFE' | 'WARNING' | 'CRITICAL DEPLETION';
  }[];
  overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  missionDelayDays: number;
  affectedPersonnel: number;
  affectedAssets: string[];
  inventoryImpactSummary: string;
  recommendedMitigations: string[];
}

export function generateForecastTimeline(
  inventory: InventoryItem[],
  cargo: CargoItem[],
  horizonDays: number = 60,
  scenario?: WhatIfScenario
): { projections: DailyProjectionPoint[]; summaries: ForecastSummary[] } {
  const fuelA1 = inventory.find(i => i.category === 'Fuel') || inventory[0];
  const polarDiesel = inventory.filter(i => i.category === 'Fuel')[1] || inventory[1] || fuelA1;
  const rations = inventory.find(i => i.category === 'Food') || inventory[2] || inventory[0];

  const weatherBurnMultiplier = scenario?.weatherCondition === 'Class 5 Polar Blizzard' 
    ? 1.35 
    : scenario?.weatherCondition === 'Katabatic Gale' 
    ? 1.18 
    : 1.0;

  const simFuelMultiplier = 1 + (scenario?.fuelConsumptionIncreasePct || 0) / 100;
  const personnelFactor = 1 + (scenario?.personnelDelta || 0) / 26;

  // Base daily burns
  const baseFuelA1Burn = fuelA1.dailyConsumption;
  const simFuelA1Burn = baseFuelA1Burn * simFuelMultiplier * weatherBurnMultiplier;

  const baseDieselBurn = polarDiesel.dailyConsumption;
  const simDieselBurn = baseDieselBurn * simFuelMultiplier * weatherBurnMultiplier;

  const baseFoodBurn = rations.dailyConsumption;
  const simFoodBurn = baseFoodBurn * personnelFactor;

  // Resupply deliveries
  // Scheduled Vessel RV Bharati (12000L Fuel) on Day 5 base, or Day 10 if delayed 5 days
  const baseCargoDelay = 5; // already delayed 5 in mock
  const addedDelay = scenario?.cargoDelayedDays || 0;
  const resupplyDayCurrent = baseCargoDelay;
  const resupplyDaySimulated = baseCargoDelay + addedDelay;

  let currentA1 = fuelA1.currentStock;
  let simulatedA1 = fuelA1.currentStock;

  let currentDiesel = polarDiesel.currentStock;
  let simulatedDiesel = polarDiesel.currentStock;

  let currentFood = rations.currentStock;
  let simulatedFood = rations.currentStock;

  const projections: DailyProjectionPoint[] = [];

  const now = new Date();

  for (let d = 0; d <= horizonDays; d++) {
    const projDate = new Date(now);
    projDate.setDate(projDate.getDate() + d);
    const dateStr = projDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Handle Current Plan Resupply
    let resupplyNote: string | undefined = undefined;
    if (d === resupplyDayCurrent) {
      currentA1 += 4000;
      currentDiesel += 8000;
      currentFood += 2000;
      resupplyNote = 'Ship RV Bharati Delivery (Current)';
    }

    // Handle Simulated Resupply
    if (scenario && d === resupplyDaySimulated) {
      simulatedA1 += 4000;
      simulatedDiesel += 8000;
      simulatedFood += 2000;
      resupplyNote = resupplyNote 
        ? `${resupplyNote} | Sim Delivery` 
        : `Simulated Ship Resupply (Day +${resupplyDaySimulated})`;
    }

    projections.push({
      day: d,
      date: dateStr,
      fuelA1Current: Math.max(0, Math.round(currentA1)),
      fuelA1Simulated: scenario ? Math.max(0, Math.round(simulatedA1)) : undefined,
      polarDieselCurrent: Math.max(0, Math.round(currentDiesel)),
      polarDieselSimulated: scenario ? Math.max(0, Math.round(simulatedDiesel)) : undefined,
      foodCurrent: Math.max(0, Math.round(currentFood)),
      foodSimulated: scenario ? Math.max(0, Math.round(simulatedFood)) : undefined,
      thresholdFuelA1: fuelA1.threshold,
      resupplyEvent: resupplyNote
    });

    // Burn for next day
    currentA1 -= baseFuelA1Burn;
    currentDiesel -= baseDieselBurn;
    currentFood -= baseFoodBurn;

    if (scenario) {
      simulatedA1 -= simFuelA1Burn;
      simulatedDiesel -= simDieselBurn;
      simulatedFood -= simFoodBurn;
    }
  }

  // Calculate summaries for key resources
  const summaries: ForecastSummary[] = [
    {
      resourceName: 'Arctic Jet A-1 Fuel',
      currentStock: fuelA1.currentStock,
      currentDailyBurn: baseFuelA1Burn,
      currentRunwayDays: Math.floor(fuelA1.currentStock / baseFuelA1Burn),
      projectedDepletionDate: new Date(Date.now() + 12 * 86400000).toLocaleDateString(),
      isThresholdBreached: fuelA1.currentStock < fuelA1.threshold,
      daysToThreshold: 0, // already breached
      riskLevel: 'CRITICAL',
      recommendedAction: 'Immediate 15% non-essential turbine load shedding; re-route LC-130 air delivery.'
    },
    {
      resourceName: 'Polar Grade Diesel (-50°C)',
      currentStock: polarDiesel.currentStock,
      currentDailyBurn: baseDieselBurn,
      currentRunwayDays: Math.floor(polarDiesel.currentStock / baseDieselBurn),
      projectedDepletionDate: new Date(Date.now() + 44 * 86400000).toLocaleDateString(),
      isThresholdBreached: false,
      daysToThreshold: 22,
      riskLevel: 'LOW',
      recommendedAction: 'Monitor primary CAT 350 genset fuel-to-kWh heat recovery loop.'
    },
    {
      resourceName: 'Freeze-Dried Expedition Meals',
      currentStock: rations.currentStock,
      currentDailyBurn: baseFoodBurn,
      currentRunwayDays: Math.floor(rations.currentStock / baseFoodBurn),
      projectedDepletionDate: new Date(Date.now() + 43 * 86400000).toLocaleDateString(),
      isThresholdBreached: false,
      daysToThreshold: 17,
      riskLevel: 'MODERATE',
      recommendedAction: 'Conserve emergency traverse rations; ensure hydroponics supplemental vitamins.'
    }
  ];

  return { projections, summaries };
}

export function runWhatIfSimulation(
  scenario: WhatIfScenario,
  inventory: InventoryItem[],
  cargo: CargoItem[]
): SimulationResult {
  const { projections } = generateForecastTimeline(inventory, cargo, 45, scenario);

  const fuelA1 = inventory.find(i => i.category === 'Fuel') || inventory[0];
  const polarDiesel = inventory.filter(i => i.category === 'Fuel')[1] || inventory[1] || fuelA1;
  const rations = inventory.find(i => i.category === 'Food') || inventory[2] || inventory[0];

  const weatherBurnMultiplier = scenario.weatherCondition === 'Class 5 Polar Blizzard' 
    ? 1.35 
    : scenario.weatherCondition === 'Katabatic Gale' 
    ? 1.18 
    : 1.0;
  const simFuelBurn = fuelA1.dailyConsumption * (1 + scenario.fuelConsumptionIncreasePct / 100) * weatherBurnMultiplier;
  const simDieselBurn = polarDiesel.dailyConsumption * (1 + scenario.fuelConsumptionIncreasePct / 100) * weatherBurnMultiplier;
  const simFoodBurn = rations.dailyConsumption * (1 + scenario.personnelDelta / 26);

  const curA1Days = Math.floor(fuelA1.currentStock / fuelA1.dailyConsumption);
  const simA1Days = Math.max(1, Math.floor(fuelA1.currentStock / simFuelBurn));

  const curDieselDays = Math.floor(polarDiesel.currentStock / polarDiesel.dailyConsumption);
  const simDieselDays = Math.max(1, Math.floor(polarDiesel.currentStock / simDieselBurn));

  const curFoodDays = Math.floor(rations.currentStock / rations.dailyConsumption);
  const simFoodDays = Math.max(1, Math.floor(rations.currentStock / simFoodBurn));

  const totalAddedDelay = scenario.cargoDelayedDays + (scenario.weatherCondition === 'Class 5 Polar Blizzard' ? 4 : 0);

  const isExtreme = simA1Days <= 8 || totalAddedDelay >= 7 || scenario.generatorFailedHours >= 12;
  const isWarning = simA1Days <= 12 || totalAddedDelay >= 4;

  const overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = isExtreme 
    ? 'CRITICAL' 
    : isWarning 
    ? 'HIGH' 
    : 'MODERATE';

  return {
    scenarioName: scenario.name,
    projections,
    resourceImpacts: [
      {
        resource: 'Arctic Jet A-1 Fuel',
        unit: 'Liters',
        currentRunwayDays: curA1Days,
        simulatedRunwayDays: simA1Days,
        deltaDays: simA1Days - curA1Days,
        criticalStatus: simA1Days < 10 ? 'CRITICAL DEPLETION' : simA1Days < 15 ? 'WARNING' : 'SAFE'
      },
      {
        resource: 'Polar Diesel (-50°C)',
        unit: 'Liters',
        currentRunwayDays: curDieselDays,
        simulatedRunwayDays: simDieselDays,
        deltaDays: simDieselDays - curDieselDays,
        criticalStatus: simDieselDays < 20 ? 'WARNING' : 'SAFE'
      },
      {
        resource: 'High-Calorie Rations',
        unit: 'Meals',
        currentRunwayDays: curFoodDays,
        simulatedRunwayDays: simFoodDays,
        deltaDays: simFoodDays - curFoodDays,
        criticalStatus: simFoodDays < 20 ? 'WARNING' : 'SAFE'
      }
    ],
    overallRisk,
    missionDelayDays: totalAddedDelay,
    affectedPersonnel: 26 + scenario.personnelDelta,
    affectedAssets: [
      'Caterpillar 350kVA Primary Genset',
      'PistenBully 600 Heavy Snowcat',
      'Sector B Habitat Heating Loop'
    ],
    inventoryImpactSummary: `Fuel runway contracts by ${Math.abs(simA1Days - curA1Days)} days. Resupply buffer eliminated before sea-ice closure.`,
    recommendedMitigations: [
      'Activate Level 2 Conservation: Shut down non-essential deep-ice spectrometer heating coils (saves 42 L/day).',
      'Deploy emergency Twin Otter flight to transfer 1,500 L fuel bladder from Maitri Station.',
      'Transition station habitat to communal bunking mode to halve domestic heating volume.',
      'Throttle Caterpillar genset baseline to 180kW with wind-turbine battery supplement.'
    ]
  };
}
