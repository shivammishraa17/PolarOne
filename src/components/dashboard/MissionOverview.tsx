import React from 'react';
import { 
  Compass, 
  Users, 
  Box, 
  Package, 
  Droplet, 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  ShieldAlert, 
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import { LiveMissionMap } from './LiveMissionMap';
import { AlertsPanel } from './AlertsPanel';

export const MissionOverview: React.FC = () => {
  const { 
    activeStation,
    expedition, 
    inventory, 
    cargo, 
    personnel, 
    assets, 
    incidents, 
    alerts, 
    setActiveTab 
  } = useMission();

  const primaryFuel = inventory.find(i => i.category === 'Fuel') || inventory[0];
  const delayedCargoCount = cargo.filter(c => c.status === 'Delayed').length;
  const activeEmergencies = incidents.filter(i => i.status !== 'RESOLVED').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length;

  const phases = [
    'Mobilization',
    'Traverse & Fieldwork',
    'Resupply & Station Support',
    'Winterization',
    'De-induction'
  ];

  const currentPhaseIndex = phases.indexOf(expedition.phase);

  return (
    <div className="space-y-6">
      {/* Top Banner: Mission Status & Phase Stepper */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>ACTIVE EXPEDITION: {expedition.code}</span>
              <span>•</span>
              <span className="text-slate-300">LEAD: {expedition.leadCommander}</span>
              <span>•</span>
              <span className="text-amber-400">{activeStation.flagEmoji} {activeStation.name}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              {expedition.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Sector: {activeStation.region} ({activeStation.coordinates[0]}° S, {activeStation.coordinates[1]}° E) | Elevation: {activeStation.elevationM}m | Mission Timeline: {expedition.startDate} to {expedition.endDate}
            </p>
          </div>

          {/* Readiness Score Card */}
          <div className="flex items-center gap-4 bg-[#0A142D] border border-cyan-500/30 p-3.5 rounded-xl">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border-4 border-slate-800">
              <svg className="w-14 h-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4"
                  className={`${
                    expedition.readinessScore > 80 ? 'text-emerald-500' :
                    expedition.readinessScore > 65 ? 'text-amber-500' : 'text-rose-500'
                  }`}
                  fill="transparent"
                  strokeDasharray="138"
                  strokeDashoffset={138 - (138 * expedition.readinessScore) / 100}
                />
              </svg>
              <span className="absolute font-mono font-bold text-sm text-white">
                {expedition.readinessScore}%
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Mission Readiness Score
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {expedition.readinessScore >= 80 ? 'Optimal Operations' :
                 expedition.readinessScore >= 65 ? 'Degraded Margin' : 'Critical Resource Warning'}
              </div>
              <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                Weighted: {activeStation.shortName} Fuel + Crew + Cargo
              </div>
            </div>
          </div>
        </div>

        {/* Phase Stepper */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>EXPEDITION TRAJECTORY: {expedition.progress}% COMPLETE</span>
            <span className="text-cyan-400 font-bold">Current Phase: {expedition.phase}</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {phases.map((phase, idx) => {
              const isPast = idx < currentPhaseIndex;
              const isCurrent = idx === currentPhaseIndex;
              return (
                <div key={phase} className="space-y-1.5">
                  <div className={`h-2 rounded-full transition-all ${
                    isPast ? 'bg-emerald-500' :
                    isCurrent ? 'bg-cyan-400 animate-pulse' : 'bg-slate-800'
                  }`} />
                  <div className={`text-[10px] font-mono truncate ${
                    isCurrent ? 'text-cyan-300 font-bold' :
                    isPast ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {idx + 1}. {phase}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          label="Research Station"
          value={activeStation.shortName.toUpperCase()}
          subtext={`${activeStation.coordinates[0]}° S, ${activeStation.coordinates[1]}° E`}
          icon={Compass}
          trendText={activeStation.region.split(',')[0]}
          onClick={() => setActiveTab('digitaltwin')}
        />

        <MetricCard
          label="Personnel On-Ice"
          value={`${expedition.teamMemberCount}`}
          subtext={`${personnel.length} Tracked Roster`}
          icon={Users}
          trend="up"
          trendText="100% Accounted"
          onClick={() => setActiveTab('personnel')}
        />

        <MetricCard
          label="Tracked Assets"
          value={`${assets.length}`}
          subtext={`${assets.filter(a => a.status === 'Operational').length} Optimal • ${assets.filter(a => a.status !== 'Operational').length} Notice`}
          icon={Box}
          trend={assets.some(a => a.status === 'Warning' || a.status === 'Critical') ? 'down' : 'up'}
          trendText={assets[0]?.name.slice(0, 18) || 'Machinery Online'}
          onClick={() => setActiveTab('assets')}
        />

        <MetricCard
          label="Cargo In-Transit"
          value={`${cargo.length}`}
          subtext={`${delayedCargoCount} Delayed • ${cargo.filter(c => c.status === 'In Transit').length} En Route`}
          icon={Package}
          trend={delayedCargoCount > 0 ? 'critical' : 'up'}
          trendText={delayedCargoCount > 0 ? `${delayedCargoCount} Delayed` : 'On Schedule'}
          onClick={() => setActiveTab('cargo')}
        />

        <MetricCard
          label={`${primaryFuel ? primaryFuel.name.split(' ')[0] : 'Fuel'} Runway`}
          value={primaryFuel ? `${primaryFuel.estimatedDaysRemaining}d` : '30d'}
          subtext={`Stock: ${primaryFuel ? primaryFuel.currentStock.toLocaleString() : '0'}${primaryFuel?.unit === 'Liters' ? 'L' : ''}`}
          icon={Droplet}
          trend={primaryFuel && primaryFuel.estimatedDaysRemaining < 15 ? 'critical' : primaryFuel && primaryFuel.estimatedDaysRemaining < 30 ? 'down' : 'up'}
          trendText={primaryFuel && primaryFuel.estimatedDaysRemaining < 15 ? '< 15d Threshold' : 'Nominal Margin'}
          onClick={() => setActiveTab('predictive')}
        />

        <MetricCard
          label="Emergencies"
          value={`${activeEmergencies}`}
          subtext={incidents[0] ? incidents[0].title.slice(0, 22) + '...' : 'No Active Incidents'}
          icon={AlertTriangle}
          trend={activeEmergencies > 0 ? 'critical' : 'up'}
          trendText={incidents[0] ? `ETA ${incidents[0].responseEtaMinutes}m` : 'Safe Sector'}
          onClick={() => setActiveTab('emergency')}
        />
      </div>

      {/* Connected Intelligence Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('digitaltwin')}
          className="p-3.5 rounded-xl polar-card text-left transition-all hover:border-cyan-500 hover:bg-[#152750] group flex items-start justify-between"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
              <Box className="w-3.5 h-3.5" /> 3D Digital Twin
            </div>
            <div className="mt-1 font-bold text-xs text-white">Inspect {activeStation.shortName} 3D Assets</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Telemetric heatmaps, structures & sensors</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => setActiveTab('predictive')}
          className="p-3.5 rounded-xl polar-card text-left transition-all hover:border-cyan-500 hover:bg-[#152750] group flex items-start justify-between"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Predictive Intelligence
            </div>
            <div className="mt-1 font-bold text-xs text-white">Resource Depletion Curves</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Forecast {primaryFuel ? `${primaryFuel.estimatedDaysRemaining}-day ${primaryFuel.name.split(' ')[0]}` : 'stock'} zero date</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className="p-3.5 rounded-xl polar-card text-left transition-all hover:border-cyan-500 hover:bg-[#152750] group flex items-start justify-between"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" /> What-If Simulator
            </div>
            <div className="mt-1 font-bold text-xs text-white">Test Mission Scenarios</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Simulate disruptions for {activeStation.shortName}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className="p-3.5 rounded-xl polar-card text-left transition-all hover:border-rose-500 hover:bg-[#201024] group flex items-start justify-between border-rose-900/60"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Emergency Center
            </div>
            <div className="mt-1 font-bold text-xs text-white">Sector Rapid Triage</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {incidents[0] ? `1-click dispatch: ${incidents[0].title.slice(0, 20)}...` : 'Ready standby for field SAR'}
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Command Center Grid: Live Map & Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveMissionMap />
        </div>
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};
