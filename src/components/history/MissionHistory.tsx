import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Package, 
  Users, 
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';

export const MissionHistory: React.FC = () => {
  const { history, setActiveTab } = useMission();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(h => {
    return (
      h.missionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.commander.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.lessonsLearned.some(l => l.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Mission Knowledge Archive */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>ANTARCTIC HISTORICAL KNOWLEDGE BASE & LESSONS LEARNED</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              Mission Archive & Institutional Memory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Empirical Learnings: Extreme Weather Resupply Closures, Fuel Burn Surges & Generator Cold-Start Post-Mortems
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search historical seasons, commander names, equipment failures or lessons learned..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#091530] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
          />
        </div>
      </div>

      {/* Historical Expedition Records Grid */}
      <div className="space-y-4">
        {filteredHistory.map(rec => (
          <div
            key={rec.id}
            className="polar-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-4"
          >
            {/* Record Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-sm">{rec.missionName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                    SEASON {rec.season}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Commander: <strong className="text-white">{rec.commander}</strong> • Base: {rec.station}
                </div>
              </div>

              <StatusBadge status={rec.outcome} size="sm" />
            </div>

            {/* Empirical Telemetry Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                <div className="text-[10px] text-slate-400">Total Duration</div>
                <div className="mt-1 font-bold text-white text-xs">{rec.totalDurationDays} Days</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                <div className="text-[10px] text-slate-400">Expedition Crew</div>
                <div className="mt-1 font-bold text-white text-xs">{rec.totalPersonnel} On-Ice</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                <div className="text-[10px] text-slate-400">Fuel Consumed</div>
                <div className="mt-1 font-bold text-cyan-400 text-xs">{(rec.fuelConsumedLiters / 1000).toFixed(0)}k Liters</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                <div className="text-[10px] text-slate-400">Cargo Delays</div>
                <div className="mt-1 font-bold text-amber-400 text-xs">{rec.cargoDelaysDays} Days Pack Ice</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#091530] border border-slate-800">
                <div className="text-[10px] text-slate-400">Incidents Logged</div>
                <div className="mt-1 font-bold text-rose-400 text-xs">{rec.incidentsLogged} Emergencies</div>
              </div>
            </div>

            {/* Lessons Learned Bullets */}
            <div>
              <div className="text-slate-300 font-bold text-[11px] mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>KEY OPERATIONAL LESSONS LEARNED:</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 font-sans text-xs list-disc list-inside">
                {rec.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="leading-relaxed">{lesson}</li>
                ))}
              </ul>
            </div>

            {/* Applied to Current ASRE-44 Mission */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/80 text-[11px] text-cyan-300 font-sans flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-cyan-400 text-[10px] uppercase">
                  ACTIVE RULE ADAPTED TO CURRENT EXPEDITION ASRE-44:
                </strong>
                <p className="mt-0.5">{rec.appliedToCurrent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
