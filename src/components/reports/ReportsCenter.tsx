import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Compass, 
  Package, 
  Database, 
  Users, 
  Wrench, 
  ShieldAlert, 
  TrendingUp 
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { exportToCSV, printFormattedReport } from '../../utils/exportUtils';
import { Modal } from '../common/Modal';

export const ReportsCenter: React.FC = () => {
  const { expedition, cargo, inventory, personnel, assets, incidents } = useMission();
  const [previewContent, setPreviewContent] = useState<{ title: string; html: string } | null>(null);

  const reports = [
    {
      id: 'REP-MISSION',
      title: `Mission Expedition Summary (${expedition.code})`,
      description: `Expedition ${expedition.code} (${expedition.name}) objectives, phase timeline, readiness score & milestone checklist.`,
      icon: Compass,
      recordsCount: expedition.checklist.length,
      category: 'Command',
      onExportCSV: () => {
        exportToCSV(`Mission_Expedition_${expedition.code.replace(/[^a-zA-Z0-9_-]/g, '_')}_Summary`, [
          {
            MissionCode: expedition.code,
            Name: expedition.name,
            Phase: expedition.phase,
            ReadinessScore: `${expedition.readinessScore}%`,
            Station: expedition.station,
            Commander: expedition.leadCommander,
            ChecklistTotal: expedition.checklist.length,
            ChecklistCompleted: expedition.checklist.filter(c => c.completed).length
          }
        ]);
      },
      onPrint: () => {
        const body = `
          <h2>EXPEDITION OVERVIEW: ${expedition.name}</h2>
          <p><strong>Code:</strong> ${expedition.code} | <strong>Lead:</strong> ${expedition.leadCommander}</p>
          <p><strong>Phase:</strong> ${expedition.phase} | <strong>Readiness Score:</strong> ${expedition.readinessScore}%</p>
          <p><strong>Target Base:</strong> ${expedition.station}</p>
          <h3>OPERATIONAL READINESS CHECKLIST</h3>
          <table>
            <tr><th>Task</th><th>Assigned Specialist</th><th>Critical</th><th>Status</th></tr>
            ${expedition.checklist.map(c => `
              <tr>
                <td>${c.task}</td>
                <td>${c.assignedTo}</td>
                <td>${c.critical ? 'YES' : 'NO'}</td>
                <td>${c.completed ? 'VERIFIED' : 'PENDING'}</td>
              </tr>
            `).join('')}
          </table>
        `;
        printFormattedReport(`Expedition ${expedition.code} Mission Summary`, body);
      }
    },
    {
      id: 'REP-CARGO',
      title: 'Cargo Supply Chain & Logistics Manifest',
      description: 'Detailed consignment records, transport modes, pack-ice delays & GPS tracking coordinates.',
      icon: Package,
      recordsCount: cargo.length,
      category: 'Logistics',
      onExportCSV: () => {
        exportToCSV('Cargo_Supply_Chain_Manifest', cargo.map(c => ({
          CargoID: c.id,
          Description: c.description,
          Category: c.category,
          Quantity: `${c.quantity} ${c.unit}`,
          WeightKg: c.weightKg,
          TransportMode: c.transportMode,
          Location: c.currentLocation,
          ExpectedArrival: c.expectedArrival,
          Status: c.status,
          DelayDays: c.delayDays
        })));
      },
      onPrint: () => {
        const body = `
          <h2>POLAR LOGISTICS SUPPLY CHAIN MANIFEST</h2>
          <p>Total Consignments: ${cargo.length} | Net Mass: ${(cargo.reduce((a, c) => a + c.weightKg, 0) / 1000).toFixed(1)} Metric Tons</p>
          <table>
            <tr><th>Cargo ID</th><th>Description</th><th>Category</th><th>Payload</th><th>Transport Mode</th><th>Arrival ETA</th><th>Status</th></tr>
            ${cargo.map(c => `
              <tr>
                <td><strong>${c.id}</strong></td>
                <td>${c.description}</td>
                <td>${c.category}</td>
                <td>${c.quantity} ${c.unit} (${c.weightKg}kg)</td>
                <td>${c.transportMode}</td>
                <td>${c.expectedArrival}</td>
                <td>${c.status}</td>
              </tr>
            `).join('')}
          </table>
        `;
        printFormattedReport('Cargo Supply Chain Manifest', body);
      }
    },
    {
      id: 'REP-INV',
      title: 'Station Inventory & Depletion Runway Audit',
      description: 'Stock levels, consumption rates, zero-date projections, and critical replenishment alerts.',
      icon: Database,
      recordsCount: inventory.length,
      category: 'Consumables',
      onExportCSV: () => {
        exportToCSV('Station_Inventory_Runway_Audit', inventory.map(i => ({
          ItemID: i.id,
          ItemName: i.name,
          Category: i.category,
          CurrentStock: `${i.currentStock} ${i.unit}`,
          DailyBurn: `${i.dailyConsumption} ${i.unit}/day`,
          EstimatedRunwayDays: i.estimatedDaysRemaining,
          Threshold: `${i.threshold} ${i.unit}`,
          Status: i.reorderStatus,
          DepotLocation: i.locationSector
        })));
      },
      onPrint: () => {
        const body = `
          <h2>STATION INVENTORY & RUNWAY AUDIT</h2>
          <table>
            <tr><th>Item Name</th><th>Category</th><th>Current Stock</th><th>Daily Burn</th><th>Runway</th><th>Threshold</th><th>Status</th></tr>
            ${inventory.map(i => `
              <tr>
                <td><strong>${i.name}</strong></td>
                <td>${i.category}</td>
                <td>${i.currentStock.toLocaleString()} ${i.unit}</td>
                <td>${i.dailyConsumption} ${i.unit}/d</td>
                <td>${i.estimatedDaysRemaining} Days</td>
                <td>${i.threshold} ${i.unit}</td>
                <td>${i.reorderStatus}</td>
              </tr>
            `).join('')}
          </table>
        `;
        printFormattedReport('Station Inventory Audit', body);
      }
    },
    {
      id: 'REP-PERSONNEL',
      title: 'Personnel Muster, Safety & Biometric Log',
      description: 'Station compliment roster, radio channels, shift assignments & biometric telemetry.',
      icon: Users,
      recordsCount: personnel.length,
      category: 'Crew',
      onExportCSV: () => {
        exportToCSV('Personnel_Muster_Safety_Log', personnel.map(p => ({
          ID: p.id,
          Name: p.name,
          Role: p.role,
          Team: p.team,
          Location: p.currentLocation,
          Task: p.currentAssignment,
          Availability: p.availability,
          Comms: p.contactStatus,
          SafetyStatus: p.safetyStatus,
          HeartRate: p.vitals.heartRateBpm,
          BodyTemp: p.vitals.bodyTempC,
          SpO2: `${p.vitals.spo2Pct}%`
        })));
      },
      onPrint: () => {
        const body = `
          <h2>PERSONNEL MUSTER & VITAL TELEMETRY</h2>
          <table>
            <tr><th>Name</th><th>Role</th><th>Team</th><th>Location</th><th>Availability</th><th>Comms</th><th>Vitals</th><th>Safety</th></tr>
            ${personnel.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.role}</td>
                <td>${p.team}</td>
                <td>${p.currentLocation}</td>
                <td>${p.availability}</td>
                <td>${p.contactStatus}</td>
                <td>${p.vitals.heartRateBpm}bpm | ${p.vitals.bodyTempC}°C | ${p.vitals.spo2Pct}%</td>
                <td>${p.safetyStatus}</td>
              </tr>
            `).join('')}
          </table>
        `;
        printFormattedReport('Personnel Muster Log', body);
      }
    },
    {
      id: 'REP-ASSET',
      title: 'Equipment Fleet Health & Telemetry Audit',
      description: 'Heavy vehicles, diesel generators, wind turbines, operating hours & maintenance schedules.',
      icon: Wrench,
      recordsCount: assets.length,
      category: 'Engineering',
      onExportCSV: () => {
        exportToCSV('Asset_Fleet_Health_Audit', assets.map(a => ({
          AssetID: a.id,
          Name: a.name,
          Type: a.type,
          Sector: a.locationSector,
          ConditionPct: `${a.conditionPct}%`,
          HoursRun: a.hoursRun,
          CoreTemp: `${a.telemetry.tempC}°C`,
          PowerLoad: `${a.telemetry.powerDrawKw} kW`,
          LastInspection: a.lastInspection,
          NextMaintenance: a.nextMaintenance,
          OperationalStatus: a.status
        })));
      },
      onPrint: () => {
        const body = `
          <h2>ASSET FLEET & TELEMETRY AUDIT</h2>
          <table>
            <tr><th>Asset ID</th><th>Name</th><th>Sector</th><th>Condition</th><th>Hours</th><th>Load/Temp</th><th>Next Maintenance</th><th>Status</th></tr>
            ${assets.map(a => `
              <tr>
                <td><strong>${a.id}</strong></td>
                <td>${a.name}</td>
                <td>${a.locationSector}</td>
                <td>${a.conditionPct}%</td>
                <td>${a.hoursRun} hrs</td>
                <td>${a.telemetry.powerDrawKw}kW | ${a.telemetry.tempC}°C</td>
                <td>${a.nextMaintenance}</td>
                <td>${a.status}</td>
              </tr>
            `).join('')}
          </table>
        `;
        printFormattedReport('Asset Fleet Audit', body);
      }
    },
    {
      id: 'REP-EMERGENCY',
      title: 'Emergency Incident After-Action Report (AAR)',
      description: 'Incident logs, dispatched teams, timeline chronological debriefs and response SLAs.',
      icon: ShieldAlert,
      recordsCount: incidents.length,
      category: 'Emergency',
      onExportCSV: () => {
        exportToCSV('Emergency_Incident_After_Action_Log', incidents.map(inc => ({
          IncidentID: inc.id,
          Title: inc.title,
          Type: inc.type,
          Sector: inc.locationSector,
          Severity: inc.severity,
          Status: inc.status,
          ReportedAt: inc.reportedAt,
          NearestTeam: inc.nearestTeam,
          ResponseEtaMins: inc.responseEtaMinutes,
          TimelineEventsCount: inc.incidentTimeline.length
        })));
      },
      onPrint: () => {
        const body = `
          <h2>EMERGENCY INCIDENT AFTER-ACTION REPORT (AAR)</h2>
          ${incidents.map(inc => `
            <h3>${inc.id}: ${inc.title}</h3>
            <p><strong>Type:</strong> ${inc.type} | <strong>Location:</strong> ${inc.locationSector} | <strong>Severity:</strong> ${inc.severity} | <strong>Status:</strong> ${inc.status}</p>
            <p><strong>Directive:</strong> ${inc.recommendedPlan}</p>
            <table>
              <tr><th>Time</th><th>Actor</th><th>Event Description</th></tr>
              ${inc.incidentTimeline.map(ev => `
                <tr><td>${ev.time}</td><td>${ev.actor}</td><td>${ev.event}</td></tr>
              `).join('')}
            </table>
          `).join('<hr/>')}
        `;
        printFormattedReport('Emergency After-Action Report', body);
      }
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Reports Center */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <FileText className="w-4 h-4" />
            <span>OFFICIAL EXPEDITION AUDITING & DOCUMENT EXPORT CENTER</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Mission Documentation & Reports
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compliant with Antarctic Treaty Environmental Protection Protocol & Smart India Hackathon Standards
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map(rep => {
          const Icon = rep.icon;
          return (
            <div
              key={rep.id}
              className="polar-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-[#091530] border border-cyan-800/50 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                    {rep.category}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm mt-3">{rep.title}</h3>
                <p className="text-[11px] text-slate-400 font-sans mt-1 leading-relaxed">
                  {rep.description}
                </p>

                <div className="mt-3 text-[10px] text-cyan-300">
                  <span>{rep.recordsCount} Active Records Compiled</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={rep.onExportCSV}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={rep.onPrint}
                  className="flex-1 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
