import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, 
  MapPin, 
  Users, 
  Truck, 
  Wrench, 
  HeartPulse, 
  Clock, 
  Send, 
  CheckCircle2, 
  Plus, 
  ShieldAlert, 
  Radio, 
  AlertTriangle,
  Compass
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { EmergencyType, EmergencyIncident } from '../../types';

export const EmergencyCenter: React.FC = () => {
  const { incidents, dispatchIncidentTeam, resolveIncident, createIncident } = useMission();

  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(incidents[0]?.id || '');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    if (incidents.length > 0 && !incidents.some(i => i.id === selectedIncidentId)) {
      setSelectedIncidentId(incidents[0].id);
    }
  }, [incidents, selectedIncidentId]);

  // New incident form state
  const [newIncident, setNewIncident] = useState({
    title: 'Vehicle Track Seizure in Crevasse Field',
    type: 'Vehicle failure' as EmergencyType,
    locationSector: 'Sector B - Mile 4.2 Transect',
    coordinatesLat: -69.4180,
    coordinatesLng: 76.2350,
    severity: 'HIGH' as const,
    nearestTeam: 'Heavy Mechanical Recovery Unit',
    recommendedPlan: 'Deploy PistenBully 600 with hydraulic winches and thermal shelter tent.'
  });

  const activeIncident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createIncident({
      title: newIncident.title,
      type: newIncident.type,
      locationSector: newIncident.locationSector,
      coordinates: [newIncident.coordinatesLat, newIncident.coordinatesLng],
      severity: newIncident.severity,
      nearestTeam: newIncident.nearestTeam,
      recommendedPlan: newIncident.recommendedPlan,
      availableVehicles: ['PistenBully 600 Polar', 'Hägglunds BV-206'],
      requiredEquipment: ['Winch Kit', 'Recovery Bridle', 'Thermal Bivouac'],
      medicalResources: ['First Aid Trauma Kit'],
      suggestedResponseTeam: ['Marcus Lind (Tech)', 'Jean-Luc (Field Guide)']
    });
    setIsReportModalOpen(false);
  };

  const isDispatched = activeIncident?.status === 'DISPATCHED';
  const isResolved = activeIncident?.status === 'RESOLVED';

  return (
    <div className="space-y-6">
      {/* Top Banner: Emergency Command Hub */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>POLAR CRISIS MANAGEMENT & RAPID DISPATCH HUB</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              Emergency Response Center
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Automated 8-Step Triage: Location ➔ Nearest Team ➔ Vehicle ➔ Gear ➔ Meds ➔ ETA ➔ Dispatch ➔ Debrief
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center gap-1.5 animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Emergency Incident</span>
            </button>
          </div>
        </div>

        {/* Active Incident Quick Selector Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
          <span className="text-slate-400 text-[11px] whitespace-nowrap">Incidents:</span>
          {incidents.map(inc => (
            <button
              key={inc.id}
              onClick={() => setSelectedIncidentId(inc.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border flex items-center gap-2 ${
                activeIncident?.id === inc.id
                  ? 'bg-rose-950 border-rose-500 text-white font-bold shadow-md'
                  : 'bg-[#0A142D] border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                inc.status === 'RESOLVED' ? 'bg-emerald-400' :
                inc.status === 'DISPATCHED' ? 'bg-amber-400 animate-ping' : 'bg-rose-500 animate-pulse'
              }`} />
              <span>{inc.id}: {inc.type}</span>
              <StatusBadge status={inc.status} size="sm" />
            </button>
          ))}
        </div>
      </div>

      {activeIncident ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
          {/* Main 8-Step Triage Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-5">
              {/* Incident Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={activeIncident.severity} size="sm" pulse={!isResolved} />
                    <span className="text-[11px] text-slate-400">{activeIncident.type}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[11px] text-slate-400">Reported at {activeIncident.reportedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{activeIncident.title}</h3>
                </div>

                <StatusBadge status={activeIncident.status} size="md" pulse={isDispatched} />
              </div>

              {/* 8-Step Response Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Location */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>1. INCIDENT LOCATION</span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.locationSector}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Coordinates: {activeIncident.coordinates[0].toFixed(4)}° S, {activeIncident.coordinates[1].toFixed(4)}° E
                  </div>
                </div>

                {/* 2. Nearest Team */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>2. NEAREST CAPABLE TEAM</span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.nearestTeam}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Triage Surgeon & Polar Guide</div>
                </div>

                {/* 3. Available Vehicles */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>3. AVAILABLE VEHICLES</span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.availableVehicles.join(', ')}</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">Fuel & Battery: 88% Capacity</div>
                </div>

                {/* 4. Required Equipment */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>4. REQUIRED GEAR</span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.requiredEquipment.join(', ')}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Staged at Emergency Locker</div>
                </div>

                {/* 5. Medical Resources */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>5. MEDICAL RESOURCES</span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.medicalResources.join(', ')}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Checked by Chief Medical Officer</div>
                </div>

                {/* 6 & 7. Response Team & Dynamic ETA */}
                <div className="p-3.5 rounded-xl bg-[#091530] border border-cyan-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>6 & 7. TEAM & DYNAMIC ETA</span>
                    </div>
                    <span className="text-rose-400 font-extrabold text-sm animate-pulse">
                      ETA: {activeIncident.responseEtaMinutes} MIN
                    </span>
                  </div>
                  <div className="text-white font-bold">{activeIncident.suggestedResponseTeam.join(' & ')}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Terrain Speed: 24 km/h in Snowcat</div>
                </div>
              </div>

              {/* Step 8: Incident Timeline */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs mb-3">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>8. INCIDENT TELEMETRY & DISPATCH TIMELINE</span>
                </div>

                <div className="space-y-2 border-l-2 border-slate-800 pl-3 ml-2">
                  {activeIncident.incidentTimeline.map((ev, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-300 font-bold">{ev.time}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">{ev.actor}</span>
                      </div>
                      <div className="text-slate-200 font-sans text-xs mt-0.5">{ev.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Response Action Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>RECOMMENDED RESPONSE</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                  CRISIS PROTOCOL
                </span>
              </div>

              {/* Protocol Summary Box */}
              <div className="p-3.5 rounded-xl bg-[#09142D] border border-slate-700 font-sans space-y-2 text-xs">
                <div className="font-mono text-cyan-400 font-bold text-[11px] uppercase">
                  OPERATIONAL DIRECTIVE:
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {activeIncident.recommendedPlan}
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                  Assigned Team: <strong className="text-white">{activeIncident.suggestedResponseTeam[0]}</strong>
                </div>
              </div>

              {/* Dispatch / Resolution Controls */}
              <div className="pt-2 space-y-2.5">
                {!isDispatched && !isResolved && (
                  <button
                    onClick={() => dispatchIncidentTeam(
                      activeIncident.id, 
                      activeIncident.suggestedResponseTeam.join(' & '), 
                      activeIncident.availableVehicles[0]
                    )}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 animate-pulse"
                  >
                    <Send className="w-4 h-4" />
                    <span>1-CLICK DISPATCH TEAM (ETA {activeIncident.responseEtaMinutes}m)</span>
                  </button>
                )}

                {isDispatched && (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-600 text-amber-200 font-bold text-center animate-pulse">
                      TEAM DISPATCHED • EN ROUTE TO SECTOR B
                    </div>
                    <button
                      onClick={() => resolveIncident(activeIncident.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Patient Stabilized & Resolve</span>
                    </button>
                  </div>
                )}

                {isResolved && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>INCIDENT RESOLVED & FILED</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-500 font-mono text-sm">
          No emergency incidents active. All stations and traverse personnel reporting nominal telemetry.
        </div>
      )}

      {/* Modal: Report Emergency Incident */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="REPORT EMERGENCY INCIDENT"
        subtitle="Broadcast field incident into POLAR ONE crisis dispatch"
      >
        <form onSubmit={handleReportSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">INCIDENT TITLE</label>
            <input
              type="text"
              required
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">EMERGENCY TYPE</label>
              <select
                value={newIncident.type}
                onChange={(e) => setNewIncident({ ...newIncident, type: e.target.value as EmergencyType })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              >
                <option value="Medical emergency">Medical emergency</option>
                <option value="Equipment failure">Equipment failure</option>
                <option value="Fire">Fire</option>
                <option value="Extreme weather">Extreme weather</option>
                <option value="Vehicle failure">Vehicle failure</option>
                <option value="Communication failure">Communication failure</option>
                <option value="Personnel missing">Personnel missing</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">SEVERITY LEVEL</label>
              <select
                value={newIncident.severity}
                onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">LOCATION & SECTOR</label>
            <input
              type="text"
              value={newIncident.locationSector}
              onChange={(e) => setNewIncident({ ...newIncident, locationSector: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">TACTICAL RESPONSE DIRECTIVE</label>
            <input
              type="text"
              value={newIncident.recommendedPlan}
              onChange={(e) => setNewIncident({ ...newIncident, recommendedPlan: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-500 shadow-md"
            >
              Broadcast Incident
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
