import React, { useState } from 'react';
import { 
  Package, 
  Ship, 
  Plane, 
  Truck, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { CargoCategory, CargoStatus, TransportMode } from '../../types';

export const CargoTracking: React.FC = () => {
  const { 
    activeStationId, 
    activeStation, 
    cargo, 
    updateCargoStatus, 
    addCargo,
    setActiveTab 
  } = useMission();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedCargoId, setSelectedCargoId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'corridor'>('table');

  // New cargo item form state
  const [newCargo, setNewCargo] = useState({
    id: 'CRG-AIR-15',
    description: 'Emergency Micro-Turbine Bearing Replacements',
    category: 'Spare parts' as CargoCategory,
    weightKg: 180,
    quantity: 6,
    unit: 'Assemblies',
    origin: 'Cape Town Air Depot',
    destination: `${activeStation.name} Terminal`,
    transportMode: 'LC-130 Hercules' as TransportMode,
    currentLocation: 'Staged at Departure Terminal',
    expectedArrival: '2026-10-26',
    status: 'Planned' as CargoStatus,
    priority: 'HIGH' as const
  });

  const filteredCargo = cargo.filter(item => {
    const matchesSearch = 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalWeight = cargo.reduce((acc, c) => acc + c.weightKg, 0);
  const delayedCount = cargo.filter(c => c.status === 'Delayed').length;
  const inTransitCount = cargo.filter(c => c.status === 'In Transit').length;

  const handleSimulateDelay = (id: string) => {
    updateCargoStatus(id, 'Delayed', 5);
  };

  const handleMarkDelivered = (id: string) => {
    updateCargoStatus(id, 'Delivered', 0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Overview & Summary Metrics */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Package className="w-4 h-4" />
              <span>POLAR CARGO LOGISTICS & SUPPLY CHAIN MANIFEST</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              Multi-Modal Cargo Operations
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Tracking Maritime Vessels, Ski-Planes, Air-Drops & Overland Traverse Convoys
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-3.5 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-600 text-amber-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Simulate Cargo Delays</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Register Consignment</span>
            </button>
          </div>
        </div>

        {/* Cargo Metrics Grid */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Total Consignments</div>
            <div className="mt-1 text-xl font-bold text-white">{cargo.length} Manifested</div>
            <div className="text-[10px] text-slate-400 mt-0.5">All transport corridors</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Total Payload Mass</div>
            <div className="mt-1 text-xl font-bold text-cyan-400">{(totalWeight / 1000).toFixed(1)} Metric Tons</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{totalWeight.toLocaleString()} kg net payload</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-400 uppercase">In-Transit Shipments</div>
            <div className="mt-1 text-xl font-bold text-sky-400">{inTransitCount} En Route</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Vessel + LC-130 + Snowcat</div>
          </div>

          <div className={`p-3 rounded-xl border font-mono ${
            delayedCount > 0 ? 'bg-rose-950/40 border-rose-800' : 'bg-[#091530] border-slate-800'
          }`}>
            <div className="text-[10px] text-slate-400 uppercase">Delayed by Sea-Ice</div>
            <div className={`mt-1 text-xl font-bold ${delayedCount > 0 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
              {delayedCount} Delayed
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Prydz Bay Multi-Year Pack Ice</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="polar-panel rounded-2xl p-4 border border-polar-border flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cargo by ID, description, coordinates or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0A142D] border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#0A142D] px-2.5 py-1.5 rounded-xl border border-slate-700">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-[#0B132B]">ALL CATEGORIES</option>
              <option value="Fuel" className="bg-[#0B132B]">Fuel</option>
              <option value="Food" className="bg-[#0B132B]">Food</option>
              <option value="Medical supplies" className="bg-[#0B132B]">Medical supplies</option>
              <option value="Spare parts" className="bg-[#0B132B]">Spare parts</option>
              <option value="Scientific equipment" className="bg-[#0B132B]">Scientific equipment</option>
              <option value="Batteries" className="bg-[#0B132B]">Batteries</option>
              <option value="Safety equipment" className="bg-[#0B132B]">Safety equipment</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0A142D] px-2.5 py-1.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[11px]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-[#0B132B]">ALL STATUSES</option>
              <option value="In Transit" className="bg-[#0B132B]">In Transit</option>
              <option value="Delayed" className="bg-[#0B132B]">Delayed</option>
              <option value="At Station" className="bg-[#0B132B]">At Station</option>
              <option value="Delivered" className="bg-[#0B132B]">Delivered</option>
              <option value="Planned" className="bg-[#0B132B]">Planned</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#0A142D] p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table Manifest
            </button>
            <button
              onClick={() => setViewMode('corridor')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                viewMode === 'corridor' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Route Corridor</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Switching: Table Manifest vs Route Corridor Map */}
      {viewMode === 'table' ? (
        <div className="polar-panel rounded-2xl overflow-hidden border border-polar-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#091530] text-slate-400 border-b border-slate-800 uppercase text-[11px]">
                <tr>
                  <th className="px-4 py-3">Cargo ID & Item</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Payload</th>
                  <th className="px-4 py-3">Mode & Origin</th>
                  <th className="px-4 py-3">Current Location / GPS</th>
                  <th className="px-4 py-3">Expected Arrival</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCargo.map((item) => {
                  const isDelayed = item.status === 'Delayed';
                  return (
                    <tr 
                      key={item.id}
                      className={`hover:bg-[#0E1C3D]/60 transition-colors ${isDelayed ? 'bg-rose-950/15' : ''}`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white">{item.id}</div>
                        <div className="text-[11px] text-slate-300 font-sans mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white">{item.quantity.toLocaleString()} {item.unit}</div>
                        <div className="text-[10px] text-slate-400">{item.weightKg.toLocaleString()} kg</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                          {item.transportMode === 'Icebreaker Vessel' && <Ship className="w-3.5 h-3.5" />}
                          {item.transportMode === 'LC-130 Hercules' && <Plane className="w-3.5 h-3.5" />}
                          {item.transportMode === 'Twin Otter Ski-Plane' && <Plane className="w-3.5 h-3.5" />}
                          {item.transportMode === 'PistenBully Traverse' && <Truck className="w-3.5 h-3.5" />}
                          <span>{item.transportMode}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.origin}</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span className="truncate max-w-[160px]">{item.currentLocation}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.coordinates[0].toFixed(2)}° S, {item.coordinates[1].toFixed(2)}° E
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className={`flex items-center gap-1 font-semibold ${isDelayed ? 'text-rose-400' : 'text-slate-200'}`}>
                          <Calendar className="w-3 h-3" />
                          <span>{item.expectedArrival}</span>
                        </div>
                        {isDelayed && (
                          <div className="text-[10px] text-rose-300 font-bold mt-0.5">
                            Delayed by +{item.delayDays} Days
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <StatusBadge status={item.status} size="sm" pulse={isDelayed} />
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isDelayed && item.status !== 'Delivered' && (
                            <button
                              onClick={() => handleSimulateDelay(item.id)}
                              className="px-2 py-1 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-300 text-[11px] font-bold"
                              title="Simulate 5-day pack ice delay"
                            >
                              Delay +5d
                            </button>
                          )}

                          {item.status !== 'Delivered' ? (
                            <button
                              onClick={() => handleMarkDelivered(item.id)}
                              className="px-2 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-[11px] font-bold"
                              title="Confirm receipt at station"
                            >
                              Delivered
                            </button>
                          ) : (
                            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Stored
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tactical Route Corridor Map */
        <div className="polar-panel rounded-2xl p-5 border border-polar-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Ship className="w-4 h-4 text-cyan-400" />
                <span>
                  {activeStationId === 'bharati' && 'SOUTHERN OCEAN & PRYDZ BAY SUPPLY CORRIDOR'}
                  {activeStationId === 'maitri' && 'QUEEN MAUD LAND & NOVO BLUE-ICE SUPPLY CORRIDOR'}
                  {activeStationId === 'himadri' && 'SVALBARD & KONGSFJORDEN ARCTIC SUPPLY CORRIDOR'}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeStationId === 'bharati' && 'Multi-Modal Route: Cape Town Port ➔ Screaming 50s ➔ Prydz Bay Pack Ice ➔ Bharati Station'}
                {activeStationId === 'maitri' && 'Multi-Modal Route: Cape Town Airfield ➔ Novolazarevskaya Skiway ➔ Kamenev Bight Traverse ➔ Maitri'}
                {activeStationId === 'himadri' && 'Multi-Modal Route: Oslo / Tromsø Hub ➔ Longyearbyen Hangar ➔ Dornier 228 / MS Norbjørn ➔ Himadri'}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-bold font-mono">
              LIVE SATELLITE AIS ACTIVE
            </span>
          </div>

          {/* Tactical Waypoint Track Canvas */}
          <div className="relative w-full h-[400px] rounded-xl bg-[#060D1E] overflow-hidden border border-slate-800 font-mono text-xs">
            <div className="absolute inset-0 polar-grid-bg opacity-30" />

            {/* Route SVG lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 160 50 Q 280 180 440 280 T 680 340"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="3"
                strokeDasharray="8 4"
                className="animate-pulse"
              />
              <path
                d="M 160 50 Q 320 140 680 340"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 680 340 L 780 370 L 860 350"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
            </svg>

            {/* Waypoint 1: Origin Hub */}
            <div className="absolute top-[8%] left-[12%] p-2.5 rounded-xl bg-[#091530] border border-cyan-500/60 shadow-xl">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {activeStationId === 'himadri' ? 'TROMSØ / LONGYEARBYEN AIR STAGING' : 'CAPE TOWN SUPPLY HUB'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {activeStationId === 'himadri' ? '78.2° N, 15.6° E • Svalbard Gateway Hangar' : '-33.9° S, 18.6° E • Departure Wharf'}
              </div>
              <div className="mt-1 text-[10px] text-emerald-400 font-bold">
                {activeStationId === 'himadri' ? 'Dornier 228 (Kings Bay AS) Staged' : 'LC-130 HERC-09 Staged'}
              </div>
            </div>

            {/* Waypoint 2: Mid-Route Weather Front / Terrain Pass */}
            <div className="absolute top-[42%] left-[34%] p-2 rounded-xl bg-amber-950/60 border border-amber-600/70">
              <div className="text-[10px] font-bold text-amber-300">
                {activeStationId === 'himadri' ? 'BARENTS SEA ARCTIC FRONT' : 'SCREAMING 50s WAVE FRONT'}
              </div>
              <div className="text-[9px] text-slate-400">
                {activeStationId === 'himadri' ? '74.5° N • 32kt Gale • Sea Spray Icing' : '-52.0° S • 6.2m Swell • 42kt Winds'}
              </div>
            </div>

            {/* Waypoint 3: Resupply Chokepoint / Pack Ice / Transfer */}
            <div className="absolute top-[65%] left-[55%] p-3 rounded-xl bg-rose-950/80 border border-rose-500 shadow-2xl animate-pulse">
              <div className="flex items-center gap-1.5 text-rose-200 font-bold text-xs">
                {activeStationId === 'himadri' ? <Plane className="w-4 h-4 text-cyan-300" /> : <Ship className="w-4 h-4 text-rose-300" />}
                <span>
                  {activeStationId === 'bharati' && 'RV BHARATI (DELAYED +5d)'}
                  {activeStationId === 'maitri' && 'NOVOLAZAREVSKAYA SKIWAY'}
                  {activeStationId === 'himadri' && 'NY-ÅLESUND HAMNERABBEN RUNWAY'}
                </span>
              </div>
              <div className="text-[10px] text-rose-300 mt-0.5">
                {activeStationId === 'himadri' ? 'Crosswind 22 kts • Runway Friction Check Nominal' :
                 activeStationId === 'maitri' ? 'Blue Ice Runway Groomed for Basler BT-67' : 'Pack Ice: 1.8m Multi-Year • Speed: 2.4 kts'}
              </div>
              <div className="text-[10px] text-white font-bold mt-1">
                {activeStationId === 'himadri' ? 'Payload: IndARC Mooring Electronics & 24,000L AG-75' :
                 activeStationId === 'maitri' ? 'Payload: 14,500 kg Polar Fuel Drums' : 'Payload: 12,000L Jet A-1 & 3,500 Rations'}
              </div>
            </div>

            {/* Waypoint 4: Destination Station */}
            <div className="absolute bottom-[10%] right-[18%] p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 shadow-2xl">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{activeStation.name.toUpperCase()}</span>
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">{activeStation.coordinates[0] >= 0 ? `${activeStation.coordinates[0]}° N` : `${Math.abs(activeStation.coordinates[0])}° S`}, {activeStation.coordinates[1] >= 0 ? `${activeStation.coordinates[1]}° E` : `${Math.abs(activeStation.coordinates[1])}° W`}</div>
              <div className="text-[10px] text-cyan-300 font-bold mt-1">
                {activeStation.statusBadge}
              </div>
            </div>

            {/* Waypoint 5: Local Field Traverse */}
            <div className="absolute bottom-[4%] right-[3%] p-2 rounded-xl bg-cyan-950/80 border border-cyan-600">
              <div className="text-[10px] font-bold text-cyan-300">LOCAL TRAVERSE</div>
              <div className="text-[9px] text-slate-400">
                {activeStationId === 'himadri' ? 'Polarcirkel Workboat • Lynx Snowmobiles' : 'PistenBully Traverse Convoy'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Consignment */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="REGISTER NEW CARGO CONSIGNMENT"
        subtitle="Schedule supply shipment into Indian polar logistics pipeline"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCargo({
              ...newCargo,
              id: newCargo.id || `CRG-${Date.now().toString().slice(-4)}`,
              coordinates: activeStation.coordinates,
              delayDays: 0
            });
            setIsAddModalOpen(false);
          }}
          className="space-y-4 font-mono text-xs"
        >
          <div>
            <label className="block text-slate-400 mb-1">CONSIGNMENT ID</label>
            <input
              type="text"
              value={newCargo.id}
              onChange={(e) => setNewCargo({ ...newCargo, id: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">DESCRIPTION & MANIFEST</label>
            <input
              type="text"
              value={newCargo.description}
              onChange={(e) => setNewCargo({ ...newCargo, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">CATEGORY</label>
              <select
                value={newCargo.category}
                onChange={(e) => setNewCargo({ ...newCargo, category: e.target.value as CargoCategory })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              >
                <option value="Fuel">Fuel</option>
                <option value="Food">Food</option>
                <option value="Medical supplies">Medical supplies</option>
                <option value="Spare parts">Spare parts</option>
                <option value="Scientific equipment">Scientific equipment</option>
                <option value="Batteries">Batteries</option>
                <option value="Safety equipment">Safety equipment</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">TRANSPORT MODE</label>
              <select
                value={newCargo.transportMode}
                onChange={(e) => setNewCargo({ ...newCargo, transportMode: e.target.value as TransportMode })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              >
                <option value="Icebreaker Vessel">Icebreaker Vessel</option>
                <option value="LC-130 Hercules">LC-130 Hercules</option>
                <option value="PistenBully Traverse">PistenBully Traverse</option>
                <option value="Twin Otter Ski-Plane">Twin Otter Ski-Plane</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">QUANTITY</label>
              <input
                type="number"
                value={newCargo.quantity}
                onChange={(e) => setNewCargo({ ...newCargo, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">WEIGHT (KG)</label>
              <input
                type="number"
                value={newCargo.weightKg}
                onChange={(e) => setNewCargo({ ...newCargo, weightKg: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-md"
            >
              Register Shipment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
