import React, { useState } from 'react';
import { 
  Wrench, 
  Box, 
  Truck, 
  Zap, 
  Radio, 
  Microscope, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Thermometer,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { AssetInspectorModal } from '../digitaltwin/AssetInspectorModal';

export const AssetManagement: React.FC = () => {
  const { assets, logMaintenance, setSelectedAssetId, setActiveTab } = useMission();

  const [filterType, setFilterType] = useState('ALL');
  const [inspectAssetId, setInspectAssetId] = useState<string | null>(null);

  const filteredAssets = assets.filter(a => {
    if (filterType === 'ALL') return true;
    if (filterType === 'Vehicles') return a.type.includes('Snowcat') || a.type.includes('Carrier') || a.type.includes('Snowmobile');
    if (filterType === 'Power') return a.type.includes('Genset') || a.type.includes('Turbine');
    if (filterType === 'Comms') return a.type.includes('Radome') || a.type.includes('Weather');
    if (filterType === 'Science') return a.type.includes('Drill') || a.type.includes('Medical');
    return true;
  });

  const operationalCount = assets.filter(a => a.status === 'Operational').length;
  const warningCount = assets.filter(a => a.status === 'Warning' || a.status === 'Critical').length;

  const handleInspectInTwin = (id: string) => {
    setSelectedAssetId(id);
    setActiveTab('digitaltwin');
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Asset Telemetry Hub */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Wrench className="w-4 h-4" />
              <span>STATION ASSET TELEMETRY & PREDICTIVE MAINTENANCE LOG</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              Mission Critical Equipment Fleet
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Sensor Telemetry: Core Temperature, Power Load, Fuel Level & Running Hours
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('digitaltwin')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
            >
              <Box className="w-4 h-4" />
              <span>Inspect Assets in 3D Digital Twin</span>
            </button>
          </div>
        </div>

        {/* Quick Fleet Metrics */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Tracked Fleet Units</div>
            <div className="mt-1 text-xl font-bold text-white">{assets.length} Units</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Continuous telemetry stream</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Operational Readiness</div>
            <div className="mt-1 text-xl font-bold text-emerald-400">{operationalCount} Online</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Meeting expedition SLA</div>
          </div>

          <div className={`p-3 rounded-xl border ${
            warningCount > 0 ? 'bg-amber-950/40 border-amber-600' : 'bg-[#091530] border-slate-800'
          }`}>
            <div className="text-[10px] text-slate-400 uppercase">Maintenance Overdue / Due</div>
            <div className={`mt-1 text-xl font-bold ${warningCount > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
              {warningCount} Attention Required
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {warningCount > 0 
                ? (assets.find(a => a.status === 'Warning' || a.status === 'Critical')?.name || 'Maintenance log')
                : 'All units nominal'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Fleet Avg Health</div>
            <div className="mt-1 text-xl font-bold text-cyan-400">
              {Math.round(assets.reduce((acc, a) => acc + a.conditionPct, 0) / assets.length)}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Across all sectors</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="polar-panel rounded-2xl p-2.5 border border-polar-border flex items-center gap-2 overflow-x-auto">
        {(['ALL', 'Vehicles', 'Power', 'Comms', 'Science'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              filterType === tab
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab === 'ALL' ? 'ALL ASSETS' : tab}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.map(asset => {
          const isWarning = asset.status === 'Warning';
          const isCritical = asset.status === 'Critical';

          return (
            <div
              key={asset.id}
              className={`polar-card rounded-2xl p-5 border transition-all hover:border-cyan-500/60 ${
                isCritical ? 'border-rose-700 bg-rose-950/20' :
                isWarning ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{asset.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    ID: {asset.id} • Type: <strong className="text-slate-300">{asset.type}</strong>
                  </div>
                </div>

                <StatusBadge status={asset.status} size="sm" pulse={isWarning || isCritical} />
              </div>

              {/* Sensor Telemetry Strip */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Thermometer className="w-3 h-3 text-sky-400" /> Temperature
                  </div>
                  <div className="mt-1 font-bold text-white text-xs">
                    {asset.telemetry.tempC > 0 ? `+${asset.telemetry.tempC}°C` : `${asset.telemetry.tempC}°C`}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> Power Load
                  </div>
                  <div className="mt-1 font-bold text-white text-xs">
                    {asset.telemetry.powerDrawKw} kW
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Total Hours
                  </div>
                  <div className="mt-1 font-bold text-white text-xs">
                    {asset.hoursRun.toLocaleString()} hrs
                  </div>
                </div>
              </div>

              {/* Condition Bar */}
              <div className="mt-3.5 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Mechanical Condition Health:</span>
                  <span className="text-cyan-400 font-bold">{asset.conditionPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      asset.conditionPct < 70 ? 'bg-amber-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${asset.conditionPct}%` }}
                  />
                </div>
              </div>

              {/* Maintenance Schedule & Location */}
              <div className="mt-3.5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Operating Sector:</span>
                  <span className="text-white font-semibold">{asset.locationSector}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Inspected:</span>
                  <span className="text-slate-300">{asset.lastInspection}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Maintenance:</span>
                  <span className={asset.nextMaintenance.includes('Overdue') ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                    {asset.nextMaintenance}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => logMaintenance(asset.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Log Service</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectAssetId(asset.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#0F1D40] hover:bg-[#182C60] text-cyan-300 border border-cyan-800 text-[11px]"
                  >
                    Telemetry Sensors
                  </button>

                  <button
                    onClick={() => handleInspectInTwin(asset.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-[11px] flex items-center gap-1 shadow-md"
                  >
                    <Box className="w-3 h-3" />
                    <span>View 3D</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Asset Inspector Modal */}
      <AssetInspectorModal
        assetId={inspectAssetId}
        onClose={() => setInspectAssetId(null)}
      />
    </div>
  );
};
