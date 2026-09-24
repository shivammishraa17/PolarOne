import React from 'react';
import { 
  Settings, 
  Shield, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  Lock, 
  Radio, 
  HardDrive,
  Sparkles
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { UserRole } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

export const SettingsView: React.FC = () => {
  const { 
    role, 
    setRole, 
    connectivity, 
    toggleConnectivity, 
    pendingSyncQueue, 
    syncQueueNow 
  } = useMission();

  const rolesList: { name: UserRole; desc: string; permissions: string[] }[] = [
    {
      name: 'ADMIN',
      desc: 'Full read-write authority across all polar logistics, assets, and emergency protocols.',
      permissions: ['All Modules', 'System Configuration', 'Role Assignment', 'Emergency Override']
    },
    {
      name: 'MISSION COMMANDER',
      desc: 'Expedition planning, What-If simulation, emergency response dispatch, and resource forecasting.',
      permissions: ['Expedition Planning', 'What-If Simulator', 'Emergency Center', 'Analytics']
    },
    {
      name: 'LOGISTICS MANAGER',
      desc: 'Multi-modal cargo tracking, warehouse inventory auditing, and equipment asset maintenance.',
      permissions: ['Cargo Tracking', 'Inventory Management', 'Asset Fleet', 'Logistics Reports']
    },
    {
      name: 'FIELD OPERATOR',
      desc: 'Overland traverse checklist tasks, personnel muster logs, and field incident reporting.',
      permissions: ['Task Checklist', 'Personnel Roster', 'Report Emergency', 'View Maps']
    },
    {
      name: 'VIEWER',
      desc: 'Read-only access for headquarters observers, government sponsors, and scientific reviewers.',
      permissions: ['Read-only Dashboard', 'Live Map', 'Public Reports']
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Settings Overview */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Settings className="w-4 h-4" />
            <span>PLATFORM SETTINGS, OFFLINE CACHE & ACCESS CONTROL</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            System Preferences & Low-Connectivity Sync
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineered for Extreme Antarctic Environments with Zero High-Bandwidth Satellite Dependency
          </p>
        </div>
      </div>

      {/* Offline Sync Architecture (Section 14) */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>OFFLINE-FIRST ARCHITECTURE & MUTATION QUEUE</span>
          </div>
          <StatusBadge status={connectivity} size="md" pulse={connectivity !== 'ONLINE'} />
        </div>

        <div className="p-4 rounded-xl bg-[#091530] border border-slate-800 space-y-3 font-sans text-xs">
          <p className="text-slate-300 leading-relaxed">
            Antarctic research stations regularly experience ionospheric satellite outages during high-latitude solar flares. 
            POLAR ONE uses local client-side persistence with a conflict-free mutation queue. 
            All cargo updates, inventory logs, and emergency dispatches are cached locally until satellite connectivity returns.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
            <button
              onClick={toggleConnectivity}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                connectivity === 'ONLINE'
                  ? 'bg-amber-600 hover:bg-amber-500 text-black shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              }`}
            >
              {connectivity === 'ONLINE' ? (
                <>
                  <WifiOff className="w-4 h-4" />
                  <span>Simulate Satellite Blackout (Toggle OFFLINE)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Reconnect Satellite Link (Toggle ONLINE)</span>
                </>
              )}
            </button>

            {pendingSyncQueue.length > 0 && (
              <button
                onClick={syncQueueNow}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Force Flush & Sync {pendingSyncQueue.length} Mutation(s)</span>
              </button>
            )}
          </div>
        </div>

        {/* Pending Sync Queue List */}
        <div className="space-y-2 font-mono">
          <div className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Pending Mutations Queue:</span>
            <span>{pendingSyncQueue.length} Items Awaiting Uplink</span>
          </div>

          {pendingSyncQueue.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#0A142D] border border-slate-800 text-slate-400 text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All local transactions synchronized with NCPOR Polar Operations Central Relays.</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {pendingSyncQueue.map(mut => (
                <div key={mut.id} className="p-3 rounded-lg bg-[#0E1A38] border border-amber-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold">{mut.actionType}</span>
                    <span className="text-slate-400 mx-2">•</span>
                    <span className="text-white">{mut.entityType}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{mut.id}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Role-Based Access Control (Section 16) */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          <span className="text-cyan-400 font-bold">Active Role: {role}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolesList.map(r => {
            const isCurrent = role === r.name;
            return (
              <div
                key={r.name}
                onClick={() => setRole(r.name)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent 
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-lg' 
                    : 'border-slate-800 bg-[#091530] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{r.name}</span>
                  {isCurrent && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </div>

                <p className="mt-2 text-[11px] text-slate-300 font-sans leading-relaxed">
                  {r.desc}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap gap-1">
                  {r.permissions.map(perm => (
                    <span key={perm} className="px-1.5 py-0.5 rounded text-[9px] bg-black/40 text-slate-300 border border-slate-700">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Station Operational Parameters & Cache Management */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>STATION CONFIGURATION & SYSTEM RESILIENCE</span>
          </div>
          <span className="text-[11px] text-slate-400">Team CryoNauts • SIH 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
            <label className="text-slate-400 text-[10px] uppercase block mb-1">Station Telemetry Node</label>
            <div className="text-white font-bold text-sm">Bharati Research Station</div>
            <div className="text-[11px] text-cyan-400 mt-0.5">-69.4075° S, 76.1942° E (Larsemann)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
            <label className="text-slate-400 text-[10px] uppercase block mb-1">Safety Threshold Buffer</label>
            <div className="text-white font-bold text-sm">15 Days Pre-Winter Buffer</div>
            <div className="text-[11px] text-amber-400 mt-0.5">Triggers Critical Shortage Alert</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
            <label className="text-slate-400 text-[10px] uppercase block mb-1">Backup Uplink Relay</label>
            <div className="text-white font-bold text-sm">Iridium Burst Node 4</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Automated Solar Storm Failover</div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-slate-400 text-xs">
            Client-Side Cache: <strong className="text-slate-200">1.8 MB Stored in IndexedDB / LocalStorage</strong>
          </div>

          <button
            onClick={() => {
              window.location.reload();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Scenario State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
