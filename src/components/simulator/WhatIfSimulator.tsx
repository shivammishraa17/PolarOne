import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  Sliders, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Wrench, 
  Droplet, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMission } from '../../context/MissionContext';
import { runWhatIfSimulation } from '../../utils/forecastEngine';
import { StatusBadge } from '../common/StatusBadge';
import { WhatIfScenario } from '../../types';

export const WhatIfSimulator: React.FC = () => {
  const { 
    scenarios, 
    activeScenario, 
    setActiveScenario, 
    inventory, 
    cargo, 
    adjustStock,
    setActiveTab 
  } = useMission();

  // Custom scenario sliders state
  const [cargoDelay, setCargoDelay] = useState<number>(activeScenario.cargoDelayedDays);
  const [fuelSurge, setFuelSurge] = useState<number>(activeScenario.fuelConsumptionIncreasePct);
  const [genOutage, setGenOutage] = useState<number>(activeScenario.generatorFailedHours);
  const [crewDelta, setCrewDelta] = useState<number>(activeScenario.personnelDelta);
  const [weatherCond, setWeatherCond] = useState(activeScenario.weatherCondition);
  const [mitigationApplied, setMitigationApplied] = useState<boolean>(false);

  // Sync sliders whenever active scenario changes
  useEffect(() => {
    setCargoDelay(activeScenario.cargoDelayedDays);
    setFuelSurge(activeScenario.fuelConsumptionIncreasePct);
    setGenOutage(activeScenario.generatorFailedHours);
    setCrewDelta(activeScenario.personnelDelta);
    setWeatherCond(activeScenario.weatherCondition);
    setMitigationApplied(false);
  }, [activeScenario]);

  // Sync sliders when active preset changes
  const handleSelectPreset = (scn: WhatIfScenario) => {
    setActiveScenario(scn);
    setCargoDelay(scn.cargoDelayedDays);
    setFuelSurge(scn.fuelConsumptionIncreasePct);
    setGenOutage(scn.generatorFailedHours);
    setCrewDelta(scn.personnelDelta);
    setWeatherCond(scn.weatherCondition);
    setMitigationApplied(false);
  };

  // Compile active simulation parameters
  const currentScenarioConfig: WhatIfScenario = {
    id: activeScenario.id,
    name: activeScenario.name,
    cargoDelayedDays: cargoDelay,
    fuelConsumptionIncreasePct: fuelSurge,
    generatorFailedHours: genOutage,
    personnelDelta: crewDelta,
    weatherCondition: weatherCond,
    description: activeScenario.description
  };

  const simResult = runWhatIfSimulation(currentScenarioConfig, inventory, cargo);

  const handleApplyMitigation = () => {
    const fuelItem = inventory.find(i => i.category === 'Fuel') || inventory[0];
    if (fuelItem) {
      adjustStock(fuelItem.id, +600, 'Conserved via non-essential heating load-shedding');
    }
    setMitigationApplied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Simulator Header */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
              <Sliders className="w-4 h-4" />
              <span>WHAT-IF MISSION CRISIS & RESILIENCE SIMULATOR</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              Mission Contingency Modeling
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Simulate compound disruptions: sea-ice cargo delay, blizzard surge, power loss & crew flux
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setCargoDelay(0);
                setFuelSurge(0);
                setGenOutage(0);
                setCrewDelta(0);
                setWeatherCond('Normal Arctic Air');
                setMitigationApplied(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline</span>
            </button>
          </div>
        </div>

        {/* 5 Preset Scenario Tabs (Prompt Requirements: Scenario 1 through 5) */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
          <span className="text-slate-400 text-[11px] whitespace-nowrap">Scenarios:</span>
          {scenarios.map((scn, idx) => (
            <button
              key={scn.id}
              onClick={() => handleSelectPreset(scn)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
                activeScenario.id === scn.id
                  ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-md'
                  : 'bg-[#0A142D] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Scenario {idx + 1}: {scn.name.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Parameter Control Sliders */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border font-mono text-xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          SIMULATION WORKBENCH: ADJUST STRESS PARAMETERS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Cargo Delayed:</span>
              <span className="text-amber-400 font-bold">+{cargoDelay} Days</span>
            </div>
            <input
              type="range"
              min={0}
              max={15}
              step={1}
              value={cargoDelay}
              onChange={(e) => {
                setCargoDelay(Number(e.target.value));
                setMitigationApplied(false);
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-1">Prydz Bay pack ice</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Fuel Burn Surge:</span>
              <span className="text-cyan-400 font-bold">+{fuelSurge}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={fuelSurge}
              onChange={(e) => {
                setFuelSurge(Number(e.target.value));
                setMitigationApplied(false);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-1">Heating & genset load</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Genset Outage:</span>
              <span className="text-rose-400 font-bold">{genOutage} Hours</span>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              step={3}
              value={genOutage}
              onChange={(e) => {
                setGenOutage(Number(e.target.value));
                setMitigationApplied(false);
              }}
              className="w-full accent-rose-400 cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-1">CAT 350 failover trip</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Crew Count Delta:</span>
              <span className="text-white font-bold">{crewDelta > 0 ? `+${crewDelta}` : crewDelta}</span>
            </div>
            <input
              type="range"
              min={-6}
              max={12}
              step={2}
              value={crewDelta}
              onChange={(e) => {
                setCrewDelta(Number(e.target.value));
                setMitigationApplied(false);
              }}
              className="w-full accent-white cursor-pointer"
            />
            <div className="text-[10px] text-slate-500 mt-1">Base station 26 crew</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1">Weather Condition:</div>
            <select
              value={weatherCond}
              onChange={(e) => {
                setWeatherCond(e.target.value as any);
                setMitigationApplied(false);
              }}
              className="w-full px-2 py-1 rounded bg-[#0A142D] border border-slate-700 text-white text-xs"
            >
              <option value="Normal Arctic Air">Normal Polar Air</option>
              <option value="Katabatic Gale">Katabatic Gale</option>
              <option value="Class 5 Polar Blizzard">Class 5 Blizzard</option>
            </select>
            <div className="text-[10px] text-slate-500 mt-1">Thermal multiplier</div>
          </div>
        </div>
      </div>

      {/* CURRENT PLAN vs SIMULATED PLAN Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dual Chart Comparison */}
        <div className="lg:col-span-2 polar-panel rounded-2xl p-5 border border-polar-border">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <span>CURRENT PLAN vs SIMULATED PLAN: FUEL RUNWAY</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Solid Cyan: Baseline Plan | Dashed Amber: Simulated Disruption Trajectory
              </p>
            </div>
            <StatusBadge status={simResult.overallRisk} size="md" pulse={simResult.overallRisk === 'CRITICAL'} />
          </div>

          <div className="w-full h-[320px] font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simResult.projections} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3566" />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#091530', 
                    borderColor: '#1E3566',
                    borderRadius: '12px',
                    color: '#fff',
                    fontFamily: 'monospace'
                  }} 
                />
                <Legend />
                <ReferenceLine 
                  y={5250} 
                  stroke="#EF4444" 
                  strokeDasharray="4 4" 
                  label={{ value: '15d Min Safety Threshold', fill: '#EF4444', fontSize: 10, position: 'top' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="fuelA1Current" 
                  name="Current Plan (Jet A-1 L)" 
                  stroke="#00E5FF" 
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="fuelA1Simulated" 
                  name="Simulated Plan (Jet A-1 L)" 
                  stroke="#F59E0B" 
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Breakdown & Mitigation Action Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="polar-panel rounded-2xl p-5 border border-polar-border font-mono text-xs space-y-4">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>CRISIS IMPACT SUMMARY</span>
              <span className="text-amber-400 font-bold">+{simResult.missionDelayDays}d Delay</span>
            </h3>

            <div className="space-y-2.5">
              {simResult.resourceImpacts.map((res, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#091530] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{res.resource}</div>
                    <div className="text-[10px] text-slate-400">
                      Current: {res.currentRunwayDays}d ➔ <span className="text-amber-400 font-bold">Sim: {res.simulatedRunwayDays}d</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-400 font-bold text-xs">{res.deltaDays} Days</span>
                    <StatusBadge status={res.criticalStatus} size="sm" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Affected Personnel:</span>
                <span className="text-white font-bold">{simResult.affectedPersonnel} Specialists</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Stressed Assets:</span>
                <span className="text-white font-bold truncate max-w-[160px]">{simResult.affectedAssets.length} Critical Units</span>
              </div>
            </div>

            {/* Recommended Mitigation Action Panel */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> RECOMMENDED MITIGATION STRATEGY
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300 font-sans list-disc list-inside">
                {simResult.recommendedMitigations.slice(0, 2).map((mit, idx) => (
                  <li key={idx} className="leading-tight">{mit}</li>
                ))}
              </ul>

              {!mitigationApplied ? (
                <button
                  onClick={handleApplyMitigation}
                  className="w-full mt-3 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Execute Mitigation Plan (+600L Buffer)</span>
                </button>
              ) : (
                <div className="w-full mt-3 py-2.5 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Mitigation Active: 600L Buffer Recovered</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
