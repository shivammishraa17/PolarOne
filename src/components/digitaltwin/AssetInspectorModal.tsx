import React from 'react';
import { 
  Box, 
  Wrench, 
  Thermometer, 
  Zap, 
  Droplet, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Users 
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

interface AssetInspectorModalProps {
  assetId: string | null;
  onClose: () => void;
}

export const AssetInspectorModal: React.FC<AssetInspectorModalProps> = ({ assetId, onClose }) => {
  const { assets, inventory, personnel, alerts, logMaintenance, updateAssetStatus } = useMission();

  if (!assetId) return null;

  const asset = assets.find(a => a.id === assetId);
  if (!asset) return null;

  // Find linked inventory or personnel
  const linkedAlerts = alerts.filter(a => a.relatedEntityId === asset.id);
  const linkedPersonnel = personnel.filter(p => p.currentLocation.toLowerCase().includes(asset.locationSector.toLowerCase().split(' ')[0]));

  return (
    <Modal
      isOpen={!!assetId}
      onClose={onClose}
      title={`DIGITAL TWIN TELEMETRY: ${asset.id}`}
      subtitle={`${asset.name} • ${asset.locationSector}`}
      maxWidth="xl"
    >
      <div className="space-y-5 font-mono text-xs">
        {/* Status & Condition Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#091530] border border-slate-700">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Operational Telemetry Status</div>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={asset.status} size="md" pulse={asset.status !== 'Operational'} />
              <span className="text-white font-bold">{asset.type}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Health Condition</div>
            <div className="mt-1 text-lg font-bold text-cyan-400">{asset.conditionPct}%</div>
          </div>
        </div>

        {/* Live Telemetry Sensors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-[#0E1A38] border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Thermometer className="w-3.5 h-3.5 text-sky-400" />
              <span>CORE TEMP</span>
            </div>
            <div className="mt-1.5 text-base font-bold text-white">
              {asset.telemetry.tempC > 0 ? `+${asset.telemetry.tempC}°C` : `${asset.telemetry.tempC}°C`}
            </div>
            <div className="text-[10px] text-slate-400">Thermal Nominal</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1A38] border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>POWER LOAD</span>
            </div>
            <div className="mt-1.5 text-base font-bold text-white">
              {asset.telemetry.powerDrawKw} kW
            </div>
            <div className="text-[10px] text-slate-400">{asset.telemetry.loadPct ? `${asset.telemetry.loadPct}% capacity` : 'Direct grid'}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1A38] border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>TOTAL HOURS</span>
            </div>
            <div className="mt-1.5 text-base font-bold text-white">
              {asset.hoursRun.toLocaleString()} hrs
            </div>
            <div className="text-[10px] text-slate-400">Since Commission</div>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1A38] border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              <span>FUEL / OIL</span>
            </div>
            <div className="mt-1.5 text-base font-bold text-white">
              {asset.telemetry.fuelLevelPct ? `${asset.telemetry.fuelLevelPct}%` : 'N/A'}
            </div>
            <div className="text-[10px] text-slate-400">Aviation Jet A-1</div>
          </div>
        </div>

        {/* Maintenance Log & Schedule */}
        <div className="p-3.5 rounded-xl bg-[#0B1736] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5 text-[11px]">
              <Wrench className="w-3.5 h-3.5" /> MAINTENANCE LOG
            </span>
            <span className="text-[10px] text-slate-400">Last Inspection: {asset.lastInspection}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-400">Next Scheduled Maintenance: </span>
              <span className={asset.nextMaintenance.includes('Overdue') ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                {asset.nextMaintenance}
              </span>
            </div>

            <button
              onClick={() => logMaintenance(asset.id)}
              className="px-3 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors shadow-md flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Perform Service & Reset</span>
            </button>
          </div>
        </div>

        {/* Linked Alerts */}
        {linkedAlerts.length > 0 && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-300 font-bold text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>ACTIVE ASSET ALERTS</span>
            </div>
            {linkedAlerts.map(alt => (
              <div key={alt.id} className="text-[11px] text-slate-300 font-sans">
                • <strong>{alt.title}</strong>: {alt.description}
              </div>
            ))}
          </div>
        )}

        {/* Status Override Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Manual Status Override:</span>
            {(['Operational', 'Warning', 'Critical'] as const).map(st => (
              <button
                key={st}
                onClick={() => updateAssetStatus(asset.id, st)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  asset.status === st 
                    ? 'bg-cyan-500 text-black border-cyan-400' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </Modal>
  );
};
