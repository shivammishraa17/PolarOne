import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Bell, 
  AlertTriangle, 
  Shield, 
  Sun, 
  Thermometer, 
  Wind, 
  ChevronDown,
  MapPin,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { UserRole, StationId } from '../../types';

interface HeaderProps {
  onToggleNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onToggleNotifications, unreadCount }) => {
  const { 
    activeStationId,
    setActiveStationId,
    activeStation,
    allStations,
    role, 
    setRole, 
    connectivity, 
    toggleConnectivity, 
    pendingSyncQueue, 
    syncQueueNow,
    setActiveTab,
    alerts
  } = useMission();

  const [utcTime, setUtcTime] = useState('');
  const [stationTime, setStationTime] = useState('');
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsStationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update clocks dynamically using activeStation.utcOffsetHours
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
      const offset = activeStation.utcOffsetHours;
      const stnDate = new Date(now.getTime() + offset * 3600000);
      const sign = offset >= 0 ? '+' : '';
      setStationTime(`${stnDate.toTimeString().slice(0, 8)} LST (UTC${sign}${offset})`);
    };
    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, [activeStation.utcOffsetHours]);

  const criticalAlertsCount = alerts.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0A1329]/95 backdrop-blur-md border-b border-polar-border px-4 py-2.5 flex items-center justify-between gap-3 shadow-xl">
      {/* Left: Brand & Station Selector */}
      <div className="flex items-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Radio className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute -inset-0.5 rounded-xl border border-cyan-400/50 pointer-events-none" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-widest text-lg font-mono text-white">POLAR<span className="text-cyan-400">ONE</span></span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">v2.4 OPS</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span>TEAM <strong className="text-cyan-300">CryoNauts</strong></span>
            </div>
          </div>
        </div>

        <div className="h-7 w-px bg-slate-800 hidden sm:block" />

        {/* Global Station Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsStationMenuOpen(prev => !prev)}
            title="Switch active polar station / operational sector"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0F1B38] hover:bg-[#162750] border border-cyan-500/40 hover:border-cyan-400 text-left transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)] group"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-base">
              {activeStation.flagEmoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {activeStation.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${isStationMenuOpen ? 'rotate-180' : ''}`} />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="text-cyan-300 font-semibold">{activeStation.region}</span>
                <span>•</span>
                <span>{activeStation.coordinates[0]}° S</span>
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isStationMenuOpen && (
            <div className="absolute left-0 mt-2 w-80 rounded-xl bg-[#081024] border border-cyan-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Compass className="w-3.5 h-3.5" />
                  Select Antarctic Research Station
                </span>
                <span className="text-slate-500">5 Active Sectors</span>
              </div>
              <div className="py-1 max-h-[380px] overflow-y-auto divide-y divide-slate-800/40">
                {allStations.map(st => {
                  const isSelected = st.id === activeStationId;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setActiveStationId(st.id);
                        setIsStationMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 text-left flex items-start gap-2.5 transition-colors ${
                        isSelected 
                          ? 'bg-cyan-950/60 text-white' 
                          : 'hover:bg-[#122044] text-slate-300'
                      }`}
                    >
                      <span className="text-xl mt-0.5">{st.flagEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                            {st.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 truncate">
                          {st.region}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-400">
                          <span className="px-1 py-0.2 rounded bg-slate-900 border border-slate-700 text-sky-300">
                            {st.weather.tempC}°C
                          </span>
                          <span className="text-slate-400">
                            {st.coordinates[0]}° S, {st.coordinates[1]}° E
                          </span>
                          <span className={`ml-auto font-bold ${
                            st.readinessScore >= 80 ? 'text-emerald-400' : st.readinessScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                            {st.readinessScore}% Ready
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Mission Clocks & Weather HUD */}
      <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 rounded-xl bg-[#0F1B38]/90 border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-400">ZULU:</span>
          <span className="text-cyan-300 font-bold tracking-wider">{utcTime}</span>
        </div>
        <div className="h-3 w-px bg-slate-700" />
        <div className="text-slate-300">
          <span className="text-slate-400">STN:</span> {stationTime}
        </div>
        <div className="h-3 w-px bg-slate-700" />
        <div className="flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1 text-sky-300">
            <Thermometer className="w-3.5 h-3.5" />
            <span className="font-bold">{activeStation.weather.tempC}°C</span>
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <Wind className="w-3.5 h-3.5" />
            <span>{activeStation.weather.windKt}kt {activeStation.weather.windDir}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-300">
            <Sun className="w-3.5 h-3.5" />
            <span>{activeStation.weather.daylight}</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Connectivity, Role, Notifications, SOS */}
      <div className="flex items-center gap-2.5">
        {/* Connectivity Toggle / Sync */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleConnectivity}
            title={connectivity === 'ONLINE' ? 'Click to simulate low-connectivity satellite blackout (OFFLINE)' : 'Click to reconnect & sync'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
              connectivity === 'ONLINE' 
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60' 
                : connectivity === 'OFFLINE'
                ? 'bg-amber-950/70 border-amber-600 text-amber-300 hover:bg-amber-900/70 animate-pulse'
                : 'bg-cyan-950/70 border-cyan-600 text-cyan-300'
            }`}
          >
            {connectivity === 'ONLINE' ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>ONLINE</span>
              </>
            ) : connectivity === 'OFFLINE' ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFLINE</span>
                {pendingSyncQueue.length > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-600 text-black font-bold">
                    {pendingSyncQueue.length} QUEUED
                  </span>
                )}
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>SYNCING...</span>
              </>
            )}
          </button>

          {connectivity === 'OFFLINE' && pendingSyncQueue.length > 0 && (
            <button
              onClick={syncQueueNow}
              title="Force sync local mutations to headquarters"
              className="p-1.5 rounded-lg bg-cyan-900/50 hover:bg-cyan-800 border border-cyan-600 text-cyan-300 text-xs font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Role Switcher */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F1B38] border border-slate-700">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-mono font-semibold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ADMIN" className="bg-[#0B132B]">ADMIN</option>
            <option value="MISSION COMMANDER" className="bg-[#0B132B]">MISSION COMMANDER</option>
            <option value="LOGISTICS MANAGER" className="bg-[#0B132B]">LOGISTICS MANAGER</option>
            <option value="FIELD OPERATOR" className="bg-[#0B132B]">FIELD OPERATOR</option>
            <option value="VIEWER" className="bg-[#0B132B]">VIEWER</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2 rounded-lg bg-[#0F1B38] hover:bg-[#182952] border border-slate-700 text-slate-300 transition-colors"
          title="Open Notifications Drawer"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-black font-mono">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Quick SOS Trigger */}
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shadow-lg ${
            criticalAlertsCount > 0 
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50 animate-pulse'
              : 'bg-rose-900/60 hover:bg-rose-800 border border-rose-700 text-rose-200'
          }`}
          title="Jump directly to Emergency Response Center"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SOS / EMERGENCIES</span>
          <span className="sm:hidden">SOS</span>
          {criticalAlertsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-white text-rose-700 text-[10px]">
              {criticalAlertsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
