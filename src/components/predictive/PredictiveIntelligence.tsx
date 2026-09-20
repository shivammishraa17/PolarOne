import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
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
  TrendingUp, 
  Droplet, 
  AlertTriangle, 
  Sliders, 
  Sparkles, 
  Calendar, 
  Wind, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { generateForecastTimeline } from '../../utils/forecastEngine';
import { StatusBadge } from '../common/StatusBadge';

export const PredictiveIntelligence: React.FC = () => {
  const { inventory, cargo, setActiveTab } = useMission();

  const [forecastHorizon, setForecastHorizon] = useState<number>(45);
  const [weatherCondition, setWeatherCondition] = useState<'Normal Arctic Air' | 'Katabatic Gale' | 'Class 5 Polar Blizzard'>('Normal Arctic Air');
  const [personnelDelta, setPersonnelDelta] = useState<number>(0);
  const [simulatedFuelBurnSurge, setSimulatedFuelBurnSurge] = useState<number>(0);
  const [selectedRiskId, setSelectedRiskId] = useState<string>('R1');

  const polarRisks = [
    {
      id: 'R1',
      title: 'Jet A-1 Fuel Depletion',
      probability: 'Almost Certain',
      probIndex: 4,
      severity: 'Major',
      sevIndex: 3,
      level: 'EXTREME',
      impact: 'Station heating & power generators trip if resupply delayed beyond 12 days.',
      mitigation: 'Load-shed non-essential science lab heating; request LC-130 air-drop bladder.'
    },
    {
      id: 'R2',
      title: 'Katabatic Blizzard Traverse Block',
      probability: 'Likely',
      probIndex: 3,
      severity: 'Moderate',
      sevIndex: 2,
      level: 'HIGH',
      impact: 'Crevasse field whiteout halts overland traverse convoys for up to 6 days.',
      mitigation: 'Stage emergency survival shelters and satellite beacon trackers along mile markers.'
    },
    {
      id: 'R3',
      title: 'Primary CAT 350 Genset Turbo Seizure',
      probability: 'Unlikely',
      probIndex: 1,
      severity: 'Catastrophic',
      sevIndex: 4,
      level: 'HIGH',
      impact: 'Loss of central 240kW baseline generation; requires immediate switch to battery banks.',
      mitigation: 'Keep Cummins 250 auxiliary genset on warm pre-heat cycle with spare injector nozzles.'
    },
    {
      id: 'R4',
      title: 'Prydz Bay Sea-Ice Resupply Window Closure',
      probability: 'Likely',
      probIndex: 3,
      severity: 'Major',
      sevIndex: 3,
      level: 'EXTREME',
      impact: 'Rapid multi-year freeze-up traps vessel RV Bharati 180 km offshore.',
      mitigation: 'Deploy helicopter / skiway aerial transshipment before March sea-ice lock-in.'
    },
    {
      id: 'R5',
      title: 'High-Latitude Geomagnetic Comms Blackout',
      probability: 'Possible',
      probIndex: 2,
      severity: 'Minor',
      sevIndex: 1,
      level: 'MODERATE',
      impact: 'HF radio propagation degrades during solar storm.',
      mitigation: 'Auto-failover to Iridium low-earth-orbit satellite constellation verified.'
    }
  ];

  const selectedRisk = polarRisks.find(r => r.id === selectedRiskId) || polarRisks[0];

  // Generate projections using the transparent mathematical forecasting model
  const { projections, summaries } = generateForecastTimeline(
    inventory, 
    cargo, 
    forecastHorizon,
    {
      id: 'CUSTOM-PRED',
      name: 'Real-time Predictive Sandbox',
      cargoDelayedDays: 5,
      fuelConsumptionIncreasePct: simulatedFuelBurnSurge,
      generatorFailedHours: 0,
      personnelDelta,
      weatherCondition,
      description: 'Predictive calculation sandbox'
    }
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Predictive Intelligence Overview */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>PREDICTIVE RESOURCE DEPLETION & INTELLIGENCE ENGINE</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              Multi-Horizon Resource Forecast
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Transparent Forecasting Algorithm: Factors Base Burn, Katabatic Wind Chill, Crew Count & Resupply Drops
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Open What-If Mission Simulator</span>
            </button>
          </div>
        </div>

        {/* Algorithm Transparency Callout Box (as requested in Section 7) */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#081228] border border-cyan-800/50 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>TRANSPARENT FORECASTING METHODOLOGY</span>
          </div>
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold text-cyan-300">Daily Burn(t) = Base Daily Burn × (1 + Δ_Weather) × (1 + Δ_Crew / 26)</span>
            <span className="block mt-1">Calculates intersection of remaining stock with 15-day emergency threshold. Step replenishment function accounts for delayed vessel arrival.</span>
          </div>
        </div>
      </div>

      {/* Interactive Forecast Horizon & Variable Sliders */}
      <div className="polar-panel rounded-2xl p-4 border border-polar-border font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-slate-400 block mb-1">FORECAST HORIZON</label>
            <div className="flex items-center gap-1">
              {[30, 45, 60].map(h => (
                <button
                  key={h}
                  onClick={() => setForecastHorizon(h)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    forecastHorizon === h ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {h} Days
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">WEATHER CONDITION MULTIPLIER</label>
            <select
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            >
              <option value="Normal Arctic Air">Normal Polar Air (1.0x Burn)</option>
              <option value="Katabatic Gale">Katabatic Gale (+18% Heating)</option>
              <option value="Class 5 Polar Blizzard">Class 5 Blizzard (+35% Heating)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">FUEL SURGE: +{simulatedFuelBurnSurge}%</label>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={simulatedFuelBurnSurge}
              onChange={(e) => setSimulatedFuelBurnSurge(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">CREW COUNT DELTA: {personnelDelta > 0 ? `+${personnelDelta}` : personnelDelta}</label>
            <input
              type="range"
              min={-6}
              max={12}
              step={2}
              value={personnelDelta}
              onChange={(e) => setPersonnelDelta(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Depletion Forecast Chart */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <span>ARCTIC JET A-1 FUEL & DIESEL DEPLETION TRAJECTORY</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Red horizontal line indicates 15-day safety threshold (5,250 Liters)
            </p>
          </div>
        </div>

        <div className="w-full h-[340px] font-mono text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projections} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorA1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDiesel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
                label={{ value: '15d Emergency Threshold (5,250 L)', fill: '#EF4444', fontSize: 11, position: 'top' }} 
              />
              <Area 
                type="monotone" 
                dataKey="fuelA1Current" 
                name="Jet A-1 Fuel (Liters)" 
                stroke="#00E5FF" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorA1)" 
              />
              <Area 
                type="monotone" 
                dataKey="polarDieselCurrent" 
                name="Polar Diesel (Liters)" 
                stroke="#38BDF8" 
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#colorDiesel)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource Depletion Analysis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {summaries.map((summary, idx) => {
          const isCritical = summary.riskLevel === 'CRITICAL';
          const isWarning = summary.riskLevel === 'MODERATE';
          return (
            <div
              key={idx}
              className={`polar-card rounded-2xl p-4 border transition-all ${
                isCritical ? 'border-rose-700 bg-rose-950/20' :
                isWarning ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{summary.resourceName}</h4>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Burn: {summary.currentDailyBurn} units/day
                  </div>
                </div>
                <StatusBadge status={summary.riskLevel} size="sm" pulse={isCritical} />
              </div>

              <div className="mt-4 flex items-baseline justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Current Stock</div>
                  <div className="text-xl font-bold text-white">{summary.currentStock.toLocaleString()}</div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[10px] uppercase">Est. Depletion Runway</div>
                  <div className={`text-xl font-bold ${isCritical ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    {summary.currentRunwayDays} Days
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-300 font-sans">
                <strong className="text-cyan-400 font-mono text-[10px] uppercase block mb-0.5">Automated Recommendation:</strong>
                {summary.recommendedAction}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Zero Stock Date:</span>
                <span className="font-bold text-white">{summary.projectedDepletionDate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5x5 Polar Operational Risk Matrix */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>5x5 POLAR EXPEDITION OPERATIONAL RISK MATRIX</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Probability vs. Consequence Severity Matrix for Antarctic Operations
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low (1-4)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Moderate (5-9)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High (10-14)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Extreme (15-25)</span>
          </div>
        </div>

        {/* Matrix Grid Surface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 overflow-x-auto">
            <div className="min-w-[480px]">
              <div className="grid grid-cols-6 gap-1.5 text-center font-mono text-[11px]">
                {/* Header Row */}
                <div className="p-2 text-slate-500 font-bold">PROBABILITY \ SEVERITY</div>
                <div className="p-2 bg-slate-900/80 text-slate-300 rounded font-semibold">1. Negligible</div>
                <div className="p-2 bg-slate-900/80 text-slate-300 rounded font-semibold">2. Minor</div>
                <div className="p-2 bg-slate-900/80 text-slate-300 rounded font-semibold">3. Moderate</div>
                <div className="p-2 bg-slate-900/80 text-slate-300 rounded font-semibold">4. Major</div>
                <div className="p-2 bg-slate-900/80 text-slate-300 rounded font-semibold">5. Catastrophic</div>

                {/* 5 Probability Rows: 5 Almost Certain down to 1 Rare */}
                {[
                  { label: '5. Almost Certain', pIdx: 4 },
                  { label: '4. Likely', pIdx: 3 },
                  { label: '3. Possible', pIdx: 2 },
                  { label: '2. Unlikely', pIdx: 1 },
                  { label: '1. Rare', pIdx: 0 },
                ].map(pRow => (
                  <React.Fragment key={pRow.label}>
                    <div className="p-2 bg-slate-900/60 text-slate-400 font-semibold text-[10px] flex items-center justify-center rounded">
                      {pRow.label}
                    </div>
                    {[0, 1, 2, 3, 4].map(sIdx => {
                      const score = (pRow.pIdx + 1) * (sIdx + 1);
                      const isExtreme = score >= 15;
                      const isHigh = score >= 10 && score < 15;
                      const isMod = score >= 5 && score < 10;

                      let cellBg = 'bg-emerald-950/30 border-emerald-900/40 text-emerald-300';
                      if (isExtreme) cellBg = 'bg-rose-950/50 border-rose-800/80 text-rose-300';
                      else if (isHigh) cellBg = 'bg-amber-950/40 border-amber-800/70 text-amber-300';
                      else if (isMod) cellBg = 'bg-yellow-950/30 border-yellow-800/60 text-yellow-300';

                      // Find risks mapped here
                      const cellRisks = [
                        { id: 'R1', title: 'Jet A-1 Depletion', p: 4, s: 3 },
                        { id: 'R2', title: 'Blizzard Block', p: 3, s: 2 },
                        { id: 'R3', title: 'CAT 350 Trip', p: 1, s: 4 },
                        { id: 'R4', title: 'Sea-Ice Closure', p: 3, s: 3 },
                        { id: 'R5', title: 'Comms Storm', p: 2, s: 1 },
                      ].filter(r => r.p === pRow.pIdx && r.s === sIdx);

                      return (
                        <div
                          key={sIdx}
                          className={`p-2 rounded border min-h-[52px] flex flex-col items-center justify-center relative transition-all ${cellBg}`}
                        >
                          <span className="text-[9px] opacity-40 absolute top-1 right-1">{score}</span>
                          {cellRisks.map(r => (
                            <button
                              key={r.id}
                              onClick={() => setSelectedRiskId(r.id)}
                              className="px-1.5 py-0.5 rounded bg-black/70 border border-current text-[10px] font-extrabold hover:scale-110 transition-transform shadow"
                            >
                              {r.id}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Detail Inspector */}
          <div className="lg:col-span-1 p-4 rounded-xl bg-[#08132B] border border-cyan-800/60 font-mono text-xs space-y-3">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              SELECTED RISK INTELLIGENCE DOSSIER
            </div>

            {selectedRisk ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {selectedRisk.id}: {selectedRisk.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedRisk.level === 'EXTREME' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
                    selectedRisk.level === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                    'bg-yellow-950 text-yellow-300 border border-yellow-700'
                  }`}>
                    {selectedRisk.level} RISK
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1 text-[11px]">
                  <div>Probability: <strong className="text-slate-200">{selectedRisk.probability}</strong></div>
                  <div>Consequence Severity: <strong className="text-slate-200">{selectedRisk.severity}</strong></div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase block mb-0.5">Mission Impact:</span>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {selectedRisk.impact}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-700/60 text-cyan-300 font-sans text-xs">
                  <strong className="text-cyan-400 font-mono text-[10px] uppercase block mb-1">
                    Automated Proactive Mitigation:
                  </strong>
                  {selectedRisk.mitigation}
                </div>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center justify-center gap-1.5 text-xs shadow-md"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simulate This Risk in Workbench</span>
                </button>
              </div>
            ) : (
              <div className="text-slate-400 text-xs py-8 text-center">
                Click any risk badge (R1 - R5) in the matrix to inspect empirical consequences and proactive mitigations.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

