import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Eye, 
  EyeOff, 
  Radio, 
  Wind, 
  Plane, 
  Ship, 
  Truck, 
  AlertTriangle, 
  Crosshair,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { StationId } from '../../types';

export const LiveMissionMap: React.FC = () => {
  const { 
    activeStationId,
    setActiveStationId,
    activeStation,
    allStations,
    personnel, 
    cargo, 
    assets, 
    incidents, 
    setActiveTab, 
    setSelectedAssetId 
  } = useMission();

  const [layers, setLayers] = useState({
    stations: true,
    personnel: true,
    cargo: true,
    hazards: true,
    radar: true
  });

  const [selectedPin, setSelectedPin] = useState<{
    id: string;
    type: 'STATION' | 'PERSONNEL' | 'CARGO' | 'EMERGENCY';
    stationId?: StationId;
    name: string;
    details: string;
    status: string;
    coords: string;
  } | null>(null);

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeIncident = incidents.find(i => i.status !== 'RESOLVED');

  return (
    <div className="polar-panel rounded-2xl overflow-hidden flex flex-col border border-polar-border">
      {/* Map Header Toolbar */}
      <div className="px-4 py-3 border-b border-slate-800 bg-[#0C1733] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-700/50 text-cyan-400">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <span>LIVE POLAR TACTICAL MISSION MAP</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-900/60 text-cyan-300 border border-cyan-600">
                {activeStation.shortName.toUpperCase()} SECTOR
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Projection: South Polar Stereographic | Grid: {activeStation.coordinates[0]}° S, {activeStation.coordinates[1]}° E
            </p>
          </div>
        </div>

        {/* Quick Station Switcher on Map */}
        <div className="flex items-center gap-1 bg-[#070D1E] p-1 rounded-lg border border-slate-800">
          {allStations.map(st => (
            <button
              key={st.id}
              onClick={() => setActiveStationId(st.id)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors flex items-center gap-1 ${
                st.id === activeStationId
                  ? 'bg-cyan-600 text-black font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{st.flagEmoji}</span>
              <span>{st.shortName}</span>
            </button>
          ))}
        </div>

        {/* Map Layer Filter Toggles */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-slate-400 text-[11px] mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Layers:
          </span>

          <button
            onClick={() => toggleLayer('stations')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              layers.stations 
                ? 'bg-blue-950 text-blue-300 border-blue-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Stations
          </button>

          <button
            onClick={() => toggleLayer('personnel')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              layers.personnel 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Personnel
          </button>

          <button
            onClick={() => toggleLayer('cargo')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              layers.cargo 
                ? 'bg-amber-950 text-amber-300 border-amber-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Cargo
          </button>

          <button
            onClick={() => toggleLayer('hazards')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              layers.hazards 
                ? 'bg-rose-950 text-rose-300 border-rose-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Hazards
          </button>

          <button
            onClick={() => toggleLayer('radar')}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              layers.radar 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Radar
          </button>
        </div>
      </div>

      {/* Interactive Tactical Map Surface */}
      <div className="relative w-full h-[420px] bg-[#060D1E] overflow-hidden select-none">
        {/* Polar Grid Lines Background */}
        <div className="absolute inset-0 polar-grid-bg opacity-30" />

        {/* Concentric Polar Range Rings & Tactical Flight Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <circle cx="50%" cy="50%" r="90" fill="none" stroke="#1E3566" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50%" cy="50%" r="180" fill="none" stroke="#1E3566" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="280" fill="none" stroke="#1E3566" strokeWidth="1" strokeDasharray="5 5" />
          
          {/* Compass Crosshairs */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1E3566" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1E3566" strokeWidth="1" strokeOpacity="0.4" />

          {/* Station-specific tactical transit routes */}
          {layers.cargo && activeStationId === 'bharati' && (
            <>
              <path d="M 120 180 Q 280 230 460 210 T 640 260" fill="none" stroke="#00E5FF" strokeWidth="2.5" strokeDasharray="6 4" className="animate-pulse" />
              <path d="M 520 40 Q 560 120 540 180" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />
              <path d="M 220 360 Q 380 300 500 220" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />
            </>
          )}

          {layers.cargo && activeStationId === 'maitri' && (
            <>
              {/* Novolazarevskaya Airfield to Maitri */}
              <path d="M 620 100 Q 550 160 460 210" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5 4" className="animate-pulse" />
              {/* Kamenev Bight Sea-Ice Traverse to Maitri */}
              <path d="M 380 50 Q 420 120 460 210" fill="none" stroke="#00E5FF" strokeWidth="2" strokeDasharray="6 4" />
              {/* Lake Priyadarshini water pipeline trace */}
              <path d="M 460 210 L 490 270" fill="none" stroke="#10B981" strokeWidth="3" />
            </>
          )}

          {layers.cargo && activeStationId === 'mcmurdo' && (
            <>
              {/* Christchurch C-17 corridor from North */}
              <path d="M 460 30 L 460 210" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="8 4" className="animate-pulse" />
              {/* USCGC Polar Star Icebreaker maritime channel */}
              <path d="M 320 60 Q 380 140 460 210" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 3" />
              {/* South Pole Overland Traverse highway heading South */}
              <path d="M 460 210 L 460 380" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" />
            </>
          )}

          {layers.cargo && activeStationId === 'southpole' && (
            <>
              {/* LC-130 Hercules Skiway approach line */}
              <path d="M 200 120 L 460 210" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="6 4" className="animate-pulse" />
              {/* Overland traverse road from McMurdo */}
              <path d="M 460 40 L 460 210" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" />
              {/* Dark Sector buried signal cables */}
              <path d="M 460 210 L 600 290" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="3 3" />
            </>
          )}

          {layers.cargo && activeStationId === 'neumayer' && (
            <>
              {/* RV Polarstern maritime channel from Atka Bay */}
              <path d="M 460 40 Q 480 120 460 210" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" className="animate-pulse" />
              {/* Blue bamboo flagged garage ramp */}
              <path d="M 460 210 L 410 320" fill="none" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 4" />
            </>
          )}
        </svg>

        {/* Radar Sweep Effect */}
        {layers.radar && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none overflow-hidden opacity-25">
            <div className="w-full h-full rounded-full border border-cyan-500/40 animate-radar bg-gradient-to-tr from-transparent via-cyan-500/20 to-transparent" />
          </div>
        )}

        {/* Dynamic Hazards per Station */}
        {layers.hazards && activeStationId === 'bharati' && (
          <>
            <div className="absolute top-[55%] left-[25%] p-2 rounded-xl bg-rose-950/40 border border-rose-700/60 border-dashed text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>UNSTABLE CREVASSE FIELD - SECTOR B</span>
            </div>
            <div className="absolute top-[15%] right-[10%] p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/60 text-[10px] font-mono text-amber-200 flex items-center gap-2">
              <Wind className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <div className="font-bold">KATABATIC WIND CORRIDOR</div>
                <div className="text-[9px] text-amber-300/80">35-55kt Winds | Whiteout Risk</div>
              </div>
            </div>
          </>
        )}

        {layers.hazards && activeStationId === 'maitri' && (
          <>
            <div className="absolute top-[20%] right-[15%] p-2 rounded-xl bg-cyan-950/50 border border-cyan-700/60 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              <span>NOVOLAZAREVSKAYA BLUE-ICE AIRSTRIP (ACTIVE)</span>
            </div>
            <div className="absolute bottom-[22%] left-[48%] p-2 rounded-xl bg-emerald-950/40 border border-emerald-600/60 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>LAKE PRIYADARSHINI (FRESHWATER INTAKE)</span>
            </div>
          </>
        )}

        {layers.hazards && activeStationId === 'mcmurdo' && (
          <>
            <div className="absolute top-[15%] right-[22%] p-2.5 rounded-xl bg-rose-950/50 border border-rose-600 text-[10px] font-mono text-rose-200 flex items-center gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <div>
                <div className="font-bold">MOUNT EREBUS (ACTIVE VOLCANO)</div>
                <div className="text-[9px] text-rose-300/80">Ash Plume Warning Sector</div>
              </div>
            </div>
            <div className="absolute bottom-[18%] left-[25%] p-2 rounded-xl bg-sky-950/50 border border-sky-600 text-[10px] font-mono text-sky-300 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>PHOENIX ICE RUNWAY & PEGASUS CORRIDOR</span>
            </div>
          </>
        )}

        {layers.hazards && activeStationId === 'southpole' && (
          <>
            <div className="absolute bottom-[20%] right-[18%] p-2.5 rounded-xl bg-purple-950/50 border border-purple-600 text-[10px] font-mono text-purple-200 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-purple-400" />
              <div>
                <div className="font-bold">DARK SECTOR (CLEAN AIR ZONE)</div>
                <div className="text-[9px] text-purple-300/80">SPT & BICEP Array • No RF Emissions</div>
              </div>
            </div>
            <div className="absolute top-[18%] left-[18%] p-2 rounded-xl bg-rose-950/50 border border-rose-700 text-[10px] font-mono text-rose-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-rose-400" />
              <span>-58°C COLD SNAP • HYDRAULIC LOCKOUT ACTIVE</span>
            </div>
          </>
        )}

        {layers.hazards && activeStationId === 'neumayer' && (
          <>
            <div className="absolute top-[14%] right-[20%] p-2 rounded-xl bg-amber-950/50 border border-amber-600 text-[10px] font-mono text-amber-200 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>ATKA BAY ICE SHELF CALVING FISSURE</span>
            </div>
            <div className="absolute bottom-[20%] left-[20%] p-2 rounded-xl bg-emerald-950/50 border border-emerald-600 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>EMPEROR PENGUIN SANCTUARY (NO-FLY ZONE)</span>
            </div>
          </>
        )}

        {/* Active Station Central Hub Beacon */}
        {layers.stations && (
          <div
            onClick={() => setSelectedPin({
              id: `STN-${activeStation.id.toUpperCase()}`,
              type: 'STATION',
              stationId: activeStation.id,
              name: activeStation.name,
              details: `${activeStation.region} • ${activeStation.operator} • Temp: ${activeStation.weather.tempC}°C`,
              status: activeStation.statusBadge,
              coords: `${activeStation.coordinates[0]}° S, ${activeStation.coordinates[1]}° E`
            })}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute h-10 w-10 rounded-full bg-cyan-400 opacity-50" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-white flex items-center justify-center text-black font-bold text-xs shadow-[0_0_20px_#00e5ff]">
                {activeStation.flagEmoji}
              </div>
            </div>
            <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 border border-cyan-400 text-[11px] font-mono text-cyan-300 font-bold group-hover:scale-110 transition-transform shadow-lg">
              {activeStation.shortName.toUpperCase()} BASE (ACTIVE HQ)
            </div>
          </div>
        )}

        {/* Surrounding Other Stations (allowing direct click-to-switch) */}
        {layers.stations && allStations.filter(s => s.id !== activeStationId).map((st, idx) => {
          // Calculate positions around the perimeter
          const positions = [
            { top: '22%', left: '15%' },
            { top: '22%', right: '15%' },
            { bottom: '22%', left: '15%' },
            { bottom: '22%', right: '15%' }
          ];
          const pos = positions[idx % positions.length];

          return (
            <div
              key={st.id}
              style={pos}
              onClick={() => setSelectedPin({
                id: `STN-${st.id.toUpperCase()}`,
                type: 'STATION',
                stationId: st.id,
                name: st.name,
                details: `${st.region} • ${st.weather.tempC}°C • ${st.readinessScore}% Ready`,
                status: 'OPERATIONAL',
                coords: `${st.coordinates[0]}° S, ${st.coordinates[1]}° E`
              })}
              className="absolute cursor-pointer group z-20"
            >
              <div className="h-5 w-5 rounded-full bg-slate-800 border border-slate-500 hover:border-cyan-400 flex items-center justify-center text-[10px] shadow-md transition-all group-hover:scale-125">
                {st.flagEmoji}
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/80 border border-slate-700 text-[9px] font-mono text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500">
                {st.shortName}
              </div>
            </div>
          );
        })}

        {/* Station-specific Personnel Markers */}
        {layers.personnel && personnel.slice(0, 4).map((p, idx) => {
          const offsets = [
            { top: '42%', left: '55%' },
            { top: '58%', left: '44%' },
            { top: '48%', left: '38%' },
            { top: '62%', left: '56%' }
          ];
          const off = offsets[idx];
          return (
            <div
              key={p.id}
              style={off}
              onClick={() => setSelectedPin({
                id: p.id,
                type: 'PERSONNEL',
                name: `${p.name} (${p.role})`,
                details: `Assignment: ${p.currentAssignment} • Comms: ${p.contactStatus}`,
                status: p.safetyStatus,
                coords: `${p.coordinates[0]}° S, ${p.coordinates[1]}° E`
              })}
              className="absolute cursor-pointer group z-20"
            >
              <div className={`h-3 w-3 rounded-full border border-black shadow ${
                p.safetyStatus === 'Cold Stress Alert' ? 'bg-rose-500 animate-ping' :
                p.safetyStatus === 'Extreme Weather Protocol' ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
              <div className="hidden group-hover:block absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 text-[9px] font-mono text-white border border-slate-700 z-30">
                {p.name.split(' ')[0]} ({p.vitals.bodyTempC}°C)
              </div>
            </div>
          );
        })}

        {/* Cargo Shipping Node */}
        {layers.cargo && cargo[0] && (
          <div
            onClick={() => setSelectedPin({
              id: cargo[0].id,
              type: 'CARGO',
              name: cargo[0].description,
              details: `Transport: ${cargo[0].transportMode} • Weight: ${cargo[0].weightKg} kg`,
              status: cargo[0].status === 'Delayed' ? `DELAYED +${cargo[0].delayDays}d` : cargo[0].status.toUpperCase(),
              coords: `${cargo[0].coordinates[0]}° S, ${cargo[0].coordinates[1]}° E`
            })}
            className="absolute top-[28%] left-[68%] cursor-pointer group z-20"
          >
            <div className={`p-1 rounded-md border flex items-center justify-center text-black font-bold shadow-lg ${
              cargo[0].status === 'Delayed' 
                ? 'bg-amber-400 border-amber-200 animate-bounce' 
                : 'bg-cyan-400 border-white'
            }`}>
              <Ship className="w-3.5 h-3.5" />
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/80 border border-amber-500/70 text-[9px] font-mono text-amber-300">
              {cargo[0].transportMode.split(' ')[0]}: {cargo[0].status}
            </div>
          </div>
        )}

        {/* Active Emergency Distress Beacon */}
        {activeIncident && (
          <div
            onClick={() => setSelectedPin({
              id: activeIncident.id,
              type: 'EMERGENCY',
              name: activeIncident.title,
              details: `Triage: ${activeIncident.nearestTeam} • Dynamic ETA: ${activeIncident.responseEtaMinutes} mins`,
              status: activeIncident.status,
              coords: `${activeIncident.coordinates[0]}° S, ${activeIncident.coordinates[1]}° E`
            })}
            className="absolute top-[68%] left-[62%] cursor-pointer group z-30 animate-pulse"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute h-8 w-8 rounded-full bg-rose-500 opacity-75" />
              <div className="h-6 w-6 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-white shadow-[0_0_15px_#ff0055]">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-rose-950 border border-rose-500 text-[10px] font-mono font-bold text-rose-200">
              SOS: {activeIncident.id}
            </div>
          </div>
        )}

        {/* Bottom Legend */}
        <div className="absolute bottom-2 left-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-3 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Active Base</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Crew Nominal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Cargo Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Active Alert / Incident</span>
          </div>
        </div>
      </div>

      {/* Selected Entity Inspector Tray */}
      {selectedPin && (
        <div className="px-4 py-3 bg-[#0A1329] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl text-black font-bold text-xs ${
              selectedPin.type === 'EMERGENCY' ? 'bg-rose-500' :
              selectedPin.type === 'CARGO' ? 'bg-amber-400' :
              selectedPin.type === 'PERSONNEL' ? 'bg-cyan-400' : 'bg-blue-400'
            }`}>
              {selectedPin.type === 'EMERGENCY' ? <AlertTriangle className="w-4 h-4 text-white" /> :
               selectedPin.type === 'CARGO' ? <Ship className="w-4 h-4" /> :
               selectedPin.type === 'PERSONNEL' ? <MapPin className="w-4 h-4" /> : <Navigation className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">{selectedPin.name}</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedPin.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{selectedPin.details}</p>
              <p className="text-[10px] text-cyan-400 font-mono mt-0.5">GPS: {selectedPin.coords}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedPin.stationId && selectedPin.stationId !== activeStationId && (
              <button
                onClick={() => {
                  setActiveStationId(selectedPin.stationId!);
                  setSelectedPin(null);
                }}
                className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-mono font-bold flex items-center gap-1 transition-colors"
              >
                <span>Switch to this Station</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {selectedPin.type === 'EMERGENCY' && (
              <button
                onClick={() => setActiveTab('emergency')}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-colors"
              >
                Open Emergency Center
              </button>
            )}
            
            <button
              onClick={() => setSelectedPin(null)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
