import React, { useState } from 'react';
import { 
  Compass, 
  Calendar, 
  Users, 
  Wrench, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Layers, 
  Truck, 
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

export const ExpeditionPlanner: React.FC = () => {
  const { 
    expedition, 
    updateExpedition, 
    toggleChecklistItem, 
    addChecklistItem,
    setActiveTab 
  } = useMission();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddChecklistOpen, setIsAddChecklistOpen] = useState(false);

  // New checklist item state
  const [newTask, setNewTask] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [isCritical, setIsCritical] = useState(false);

  // New Mission form state
  const [newMission, setNewMission] = useState({
    id: 'EXP-45-ASRE',
    name: 'Antarctic Deep Interior Continental Traverse 45',
    code: 'ASRE-45',
    destination: 'Dome C & South Pole Transect',
    station: 'Bharati Station Staging Base',
    leadCommander: 'Dr. Vikram Vardhan',
    startDate: '2027-11-01',
    endDate: '2028-03-15',
    teamMemberCount: 18,
    requiredResources: '65,000 L Polar Diesel, 5,500 High-Calorie Rations',
    requiredEquipment: '3 PistenBully Heavy Snowcats, 2 Caterpillar 350 Gensets',
    transportMethod: 'Multi-modal: Icebreaker RV Bharati + LC-130 Ski-Plane',
    emergencyPlan: 'SAR Protocol Alpha: Twin Otter Medevac to McMurdo Station'
  });

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask) return;
    addChecklistItem(newTask, newAssignee || 'Unassigned', isCritical);
    setNewTask('');
    setNewAssignee('');
    setIsCritical(false);
    setIsAddChecklistOpen(false);
  };

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    updateExpedition({
      id: newMission.id,
      name: newMission.name,
      code: newMission.code,
      destination: newMission.destination,
      station: newMission.station,
      leadCommander: newMission.leadCommander,
      startDate: newMission.startDate,
      endDate: newMission.endDate,
      teamMemberCount: Number(newMission.teamMemberCount),
      requiredResourcesSummary: newMission.requiredResources,
      requiredEquipmentSummary: newMission.requiredEquipment,
      transportMethod: newMission.transportMethod,
      emergencyPlanSummary: newMission.emergencyPlan,
      progress: 5
    });
    setIsCreateModalOpen(false);
  };

  const completedChecklistCount = expedition.checklist.filter(c => c.completed).length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Mission Plan Header & Actions */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>EXPEDITION PLANNING & LOGISTICS PROFILE: {expedition.code}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              {expedition.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Mission ID: {expedition.id} • Lead Commander: {expedition.leadCommander} • Base: {expedition.station}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddChecklistOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#142347] hover:bg-[#1C3264] border border-cyan-700/60 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Checklist Task</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Create New Expedition</span>
            </button>
          </div>
        </div>

        {/* Mission Readiness Score Gauge & Factors */}
        <div className="mt-6 p-4 rounded-xl bg-[#091530] border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-slate-800">
              <svg className="w-16 h-16 -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="4"
                  className={`${
                    expedition.readinessScore > 80 ? 'text-emerald-400' :
                    expedition.readinessScore > 65 ? 'text-amber-400' : 'text-rose-400'
                  }`}
                  fill="transparent"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * expedition.readinessScore) / 100}
                />
              </svg>
              <span className="absolute font-mono font-bold text-base text-white">
                {expedition.readinessScore}%
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white">READINESS SCORE</div>
              <div className="text-[11px] font-mono text-slate-400">
                {expedition.readinessScore >= 80 ? 'Safe for Execution' : 'Attention Required'}
              </div>
              <StatusBadge
                status={expedition.readinessScore >= 80 ? 'OPERATIONAL' : 'WARNING'}
                size="sm"
              />
            </div>
          </div>

          <div className="text-xs font-mono border-l border-slate-800 pl-4 space-y-1">
            <div className="text-slate-400">Fuel Runway Margin:</div>
            <div className="text-rose-400 font-bold">12 Days (&lt; 15d Threshold: -15%)</div>
            <button onClick={() => setActiveTab('predictive')} className="text-[10px] text-cyan-400 hover:underline">
              Inspect Fuel Forecast ➔
            </button>
          </div>

          <div className="text-xs font-mono border-l border-slate-800 pl-4 space-y-1">
            <div className="text-slate-400">Cargo On-Time SLA:</div>
            <div className="text-amber-400 font-bold">2 Delayed Shipments (-10%)</div>
            <button onClick={() => setActiveTab('cargo')} className="text-[10px] text-cyan-400 hover:underline">
              Track Pack Ice Delay ➔
            </button>
          </div>

          <div className="text-xs font-mono border-l border-slate-800 pl-4 space-y-1">
            <div className="text-slate-400">Checklist Readiness:</div>
            <div className="text-emerald-400 font-bold">
              {completedChecklistCount} / {expedition.checklist.length} Completed
            </div>
            <div className="text-[10px] text-slate-400">
              {Math.round((completedChecklistCount / expedition.checklist.length) * 100)}% Tasks Verified
            </div>
          </div>
        </div>

        {/* Visual Gantt Milestone Timeline */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>EXPEDITION MILESTONE GANTT TIMELINE (2026 - 2027 SEASON)</span>
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              Austral Summer Window: Oct 15 ➔ Mar 30 (167 Operational Days)
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs bg-[#081228] p-4 rounded-xl border border-slate-800">
            {[
              { phase: '1. Mobilization & Cape Town Staging', start: 'Oct 15', end: 'Nov 10', pct: 100, color: 'bg-emerald-500', status: 'COMPLETED', offset: 'w-[18%]' },
              { phase: '2. Traverse & Fieldwork (Larsemann Transect)', start: 'Nov 11', end: 'Jan 15', pct: 90, color: 'bg-emerald-500', status: 'VERIFIED', offset: 'ml-[18%] w-[32%]' },
              { phase: '3. Sea-Ice Resupply & Fuel Transfer (ACTIVE)', start: 'Jan 16', end: 'Feb 20', pct: 68, color: 'bg-cyan-400 animate-pulse', status: 'IN PROGRESS', offset: 'ml-[48%] w-[26%]' },
              { phase: '4. Pre-Winterization & Station Hardening', start: 'Feb 21', end: 'Mar 15', pct: 15, color: 'bg-amber-500', status: 'STAGED', offset: 'ml-[72%] w-[18%]' },
              { phase: '5. Final De-induction & Winter Isolation', start: 'Mar 16', end: 'Mar 30', pct: 0, color: 'bg-slate-700', status: 'SCHEDULED', offset: 'ml-[88%] w-[12%]' },
            ].map((g, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white font-semibold">{g.phase}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px]">{g.start} - {g.end}</span>
                    <span className="text-cyan-300 font-bold">{g.pct}%</span>
                    <StatusBadge status={g.status} size="sm" />
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden flex">
                  <div className={`h-full rounded-full transition-all ${g.color} ${g.offset}`} />
                </div>
              </div>
            ))}

            {/* Critical Deadlines Marker Strip */}
            <div className="pt-2 mt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
              <span>• Oct 20: RV Bharati Departs Cape Town</span>
              <span>• Nov 05: LC-130 Skiway Inaugurated</span>
              <span className="text-amber-400 font-bold">• Feb 20: Sea-Ice Resupply Window Closes</span>
              <span className="text-rose-400 font-bold">• Mar 31: Full Polar Winter Isolation Lock-In</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Logistics Allocation & Mission Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Required Resources & Operational Equipment */}
        <div className="lg:col-span-1 space-y-4">
          <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>RESOURCE & LOGISTICS PROFILE</span>
            </h3>

            <div>
              <span className="text-slate-400 text-[11px] block uppercase">Required Fuel & Rations:</span>
              <p className="mt-1 text-slate-200 font-sans text-xs bg-[#091530] p-3 rounded-xl border border-slate-800">
                {expedition.requiredResourcesSummary}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px] block uppercase">Required Equipment & Heavy Assets:</span>
              <p className="mt-1 text-slate-200 font-sans text-xs bg-[#091530] p-3 rounded-xl border border-slate-800">
                {expedition.requiredEquipmentSummary}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px] block uppercase">Transport & Supply Modes:</span>
              <p className="mt-1 text-slate-200 font-sans text-xs bg-[#091530] p-3 rounded-xl border border-slate-800">
                {expedition.transportMethod}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px] block uppercase">Emergency SAR Contingency:</span>
              <p className="mt-1 text-rose-300 font-sans text-xs bg-rose-950/40 p-3 rounded-xl border border-rose-800/80">
                {expedition.emergencyPlanSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Checklist & Task Assignments */}
        <div className="lg:col-span-2">
          <div className="polar-panel rounded-2xl p-5 border border-polar-border font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>EXPEDITION READINESS CHECKLIST</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 text-[11px]">
                  {completedChecklistCount} / {expedition.checklist.length}
                </span>
              </h3>

              <button
                onClick={() => setIsAddChecklistOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Item</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {expedition.checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    item.completed 
                      ? 'bg-[#0A1630]/60 border-slate-800 opacity-75' 
                      : 'bg-[#0E1B3D] border-slate-700 hover:border-cyan-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {}} // handled by div click
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className={`font-semibold text-xs ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {item.task}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Assigned to: <strong className="text-slate-300">{item.assignedTo}</strong></span>
                        {item.critical && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                            MISSION CRITICAL
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <StatusBadge status={item.completed ? 'COMPLETED' : 'PENDING'} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Checklist Task */}
      <Modal
        isOpen={isAddChecklistOpen}
        onClose={() => setIsAddChecklistOpen(false)}
        title="ADD MISSION CHECKLIST ITEM"
        subtitle="Assign critical operational task before polar traverse"
      >
        <form onSubmit={handleAddChecklist} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">TASK DESCRIPTION</label>
            <input
              type="text"
              required
              placeholder="e.g. Verify Ice-Drill emergency power cable continuity"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">ASSIGNED PERSONNEL / SPECIALIST</label>
            <input
              type="text"
              placeholder="e.g. Chief Eng. Rajesh Nair"
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="crit-check"
              checked={isCritical}
              onChange={(e) => setIsCritical(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 cursor-pointer"
            />
            <label htmlFor="crit-check" className="text-slate-300 cursor-pointer">
              Mark as Mission Critical (Blocks Expedition Departure if incomplete)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddChecklistOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-md"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Create New Expedition */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="CREATE NEW POLAR EXPEDITION"
        subtitle="Initialize operational logistics charter for upcoming season"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateMission} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">EXPEDITION NAME</label>
              <input
                type="text"
                required
                value={newMission.name}
                onChange={(e) => setNewMission({ ...newMission, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">MISSION CODE / ID</label>
              <input
                type="text"
                required
                value={newMission.code}
                onChange={(e) => setNewMission({ ...newMission, code: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">RESEARCH STATION / BASE</label>
              <input
                type="text"
                value={newMission.station}
                onChange={(e) => setNewMission({ ...newMission, station: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">LEAD COMMANDER</label>
              <input
                type="text"
                value={newMission.leadCommander}
                onChange={(e) => setNewMission({ ...newMission, leadCommander: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">START DATE</label>
              <input
                type="date"
                value={newMission.startDate}
                onChange={(e) => setNewMission({ ...newMission, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">END DATE</label>
              <input
                type="date"
                value={newMission.endDate}
                onChange={(e) => setNewMission({ ...newMission, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">PERSONNEL COUNT</label>
              <input
                type="number"
                value={newMission.teamMemberCount}
                onChange={(e) => setNewMission({ ...newMission, teamMemberCount: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">REQUIRED RESOURCES SUMMARY</label>
            <input
              type="text"
              value={newMission.requiredResources}
              onChange={(e) => setNewMission({ ...newMission, requiredResources: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">EMERGENCY CONTINGENCY PROTOCOL</label>
            <input
              type="text"
              value={newMission.emergencyPlan}
              onChange={(e) => setNewMission({ ...newMission, emergencyPlan: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-lg"
            >
              Initialize Expedition
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
