import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Thermometer, 
  Activity, 
  Radio, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { Personnel } from '../../types';

export const PersonnelManagement: React.FC = () => {
  const { personnel, updatePersonnelSafety, setActiveTab } = useMission();

  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('ALL');

  const teams = [
    'ALL',
    ...Array.from(new Set(personnel.map(p => p.team)))
  ];

  const filteredPersonnel = personnel.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.currentLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.currentAssignment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTeam = teamFilter === 'ALL' || p.team === teamFilter;

    return matchesSearch && matchesTeam;
  });

  const onDutyCount = personnel.filter(p => p.availability === 'On Duty').length;
  const fieldCount = personnel.filter(p => p.availability === 'Field Traverse').length;
  const alertCrewCount = personnel.filter(p => p.safetyStatus !== 'Nominal').length;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Personnel Command Roster */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Users className="w-4 h-4" />
              <span>STATION PERSONNEL MUSTER & BIOMETRIC SAFETY ROSTER</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              Expedition Field Operations Roster
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracking {personnel.length} Station Crew & Field Traverse Members • Vitals, Comms & Emergency Standby
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>View On Tactical Map</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Station Compliment</div>
            <div className="mt-1 text-xl font-bold text-white">{personnel.length} Tracked</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% Accounted</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">On Active Duty</div>
            <div className="mt-1 text-xl font-bold text-cyan-400">{onDutyCount} Station Crew</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Shift 1 Operations</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Field Traverse</div>
            <div className="mt-1 text-xl font-bold text-sky-400">{fieldCount} In Deep Ice</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Sector B Ridge Traverse</div>
          </div>

          <div className={`p-3 rounded-xl border ${
            alertCrewCount > 0 ? 'bg-amber-950/40 border-amber-600' : 'bg-[#091530] border-slate-800'
          }`}>
            <div className="text-[10px] text-slate-400 uppercase">Biometric Stress Alerts</div>
            <div className={`mt-1 text-xl font-bold ${alertCrewCount > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
              {alertCrewCount} Alert Active
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {alertCrewCount > 0 
                ? `${personnel.find(p => p.safetyStatus !== 'Nominal')?.name || 'Field Specialist'}: Biometric Alert`
                : 'All vitals within normal limits'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="polar-panel rounded-2xl p-4 border border-polar-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search personnel by name, role, sector or task..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {teams.map(t => (
            <button
              key={t}
              onClick={() => setTeamFilter(t)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                teamFilter === t
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Personnel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPersonnel.map(person => {
          const isAlert = person.safetyStatus !== 'Nominal';
          return (
            <div
              key={person.id}
              className={`polar-card rounded-2xl p-5 border transition-all hover:border-cyan-500/60 ${
                isAlert ? 'border-amber-700 bg-amber-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{person.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 border border-slate-700">
                      {person.team}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{person.role}</div>
                </div>

                <StatusBadge status={person.safetyStatus} size="sm" pulse={isAlert} />
              </div>

              {/* Assignment & Location */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#091530] border border-slate-800 space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Task:</span>
                  <span className="text-white font-semibold truncate max-w-[200px]">{person.currentAssignment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sector Location:</span>
                  <span className="text-cyan-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {person.currentLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Comms Link:</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-cyan-400" /> {person.contactStatus}
                  </span>
                </div>
              </div>

              {/* Biometrics Strip */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400" /> Pulse
                  </div>
                  <div className="mt-1 font-bold text-white text-xs">{person.vitals.heartRateBpm} BPM</div>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 flex items-center justify-center gap-1">
                    <Thermometer className="w-3 h-3 text-sky-400" /> Body Temp
                  </div>
                  <div className={`mt-1 font-bold text-xs ${
                    person.vitals.bodyTempC < 36.0 ? 'text-amber-400 animate-pulse' : 'text-white'
                  }`}>
                    {person.vitals.bodyTempC}°C
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                  <div className="text-slate-400 flex items-center justify-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" /> SpO2
                  </div>
                  <div className="mt-1 font-bold text-white text-xs">{person.vitals.spo2Pct}%</div>
                </div>
              </div>

              {/* Card Footer: Emergency Role & Toggle */}
              <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-slate-400">Emergency Role: </span>
                  <strong className="text-slate-200">{person.emergencyRole}</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  {isAlert ? (
                    <button
                      onClick={() => updatePersonnelSafety(person.id, 'Nominal')}
                      className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-[10px]"
                    >
                      Clear Stress Alert
                    </button>
                  ) : (
                    <button
                      onClick={() => updatePersonnelSafety(person.id, 'Cold Stress Alert')}
                      className="px-2 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-700 font-bold text-[10px]"
                    >
                      Trigger Stress Drill
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
