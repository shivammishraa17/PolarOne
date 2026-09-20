import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Zap, 
  Clock, 
  Droplet, 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';

export const AnalyticsDashboard: React.FC = () => {
  const { inventory, cargo, assets, personnel } = useMission();

  // Resource Consumption Trends Data (Last 14 Days)
  const consumptionTrends = [
    { day: 'D-14', jetA1: 340, diesel: 410, powerKwh: 5200 },
    { day: 'D-12', jetA1: 350, diesel: 420, powerKwh: 5350 },
    { day: 'D-10', jetA1: 345, diesel: 415, powerKwh: 5280 },
    { day: 'D-08', jetA1: 390, diesel: 480, powerKwh: 6100 }, // Katabatic gale day
    { day: 'D-06', jetA1: 410, diesel: 505, powerKwh: 6400 }, // Storm peak
    { day: 'D-04', jetA1: 360, diesel: 430, powerKwh: 5450 },
    { day: 'D-02', jetA1: 350, diesel: 420, powerKwh: 5320 },
    { day: 'Today', jetA1: 350, diesel: 420, powerKwh: 5300 },
  ];

  // Cargo Transport Mode Performance
  const cargoPerformance = [
    { mode: 'Icebreaker Vessel', onTime: 3, delayed: 2, avgTransitDays: 24 },
    { mode: 'LC-130 Hercules', onTime: 4, delayed: 1, avgTransitDays: 2 },
    { mode: 'Overland Traverse', onTime: 5, delayed: 0, avgTransitDays: 8 },
    { mode: 'Twin Otter Ski-Plane', onTime: 3, delayed: 0, avgTransitDays: 1 },
  ];

  // Inventory Runway Distribution (Days Remaining)
  const inventoryRunwayData = inventory.slice(0, 7).map(item => ({
    name: item.name.split(' ')[0] + ' ' + (item.name.split(' ')[1] || ''),
    days: item.estimatedDaysRemaining,
    threshold: 15,
    category: item.category
  }));

  // Personnel Distribution by Team
  const teamCounts: Record<string, number> = {};
  personnel.forEach(p => {
    teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
  });
  const personnelData = Object.entries(teamCounts).map(([team, count]) => ({
    name: team,
    value: count
  }));

  const COLORS = ['#00E5FF', '#38BDF8', '#818CF8', '#34D399', '#FBBF24', '#F87171'];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Analytics Summary */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <BarChart3 className="w-4 h-4" />
              <span>STATION OPERATIONAL INTELLIGENCE & TELEMETRY ANALYTICS</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              Mission Performance & Resource Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Empirical Trends: Fuel Consumption Rates, Generator Heat Recovery, Supply Chain SLA & Crew Utilization
            </p>
          </div>
        </div>

        {/* Analytics Key Performance Indicators */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Power Output Efficiency</div>
            <div className="mt-1 text-xl font-bold text-cyan-400">3.8 kWh / Liter</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">+12% via Turbo Exhaust Heat Recovery</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Renewable Offset</div>
            <div className="mt-1 text-xl font-bold text-emerald-400">18.4% Clean Wind</div>
            <div className="text-[10px] text-slate-400 mt-0.5">58 kW Peak Ridge Generation</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Cargo On-Time SLA</div>
            <div className="mt-1 text-xl font-bold text-amber-400">71.4% Delivered</div>
            <div className="text-[10px] text-amber-300 mt-0.5">Pack Ice Seasonal Delay Impact</div>
          </div>

          <div className="p-3 rounded-xl bg-[#091530] border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Emergency Response Mean SLA</div>
            <div className="mt-1 text-xl font-bold text-white">09m 14s</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Well within 20m safety standard</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Daily Resource Consumption Trends */}
        <div className="polar-panel rounded-2xl p-5 border border-polar-border">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Droplet className="w-4 h-4 text-cyan-400" />
                <span>DAILY FUEL CONSUMPTION PROFILE (LITERS / DAY)</span>
              </h3>
              <p className="text-[11px] text-slate-400">Historical burn with Katabatic blizzard surge peak</p>
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="anJet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3566" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#091530', borderColor: '#1E3566', color: '#fff' }} />
                <Legend />
                <Area type="monotone" dataKey="diesel" name="Polar Diesel (L/day)" stroke="#38BDF8" fill="#38BDF8" fillOpacity={0.2} />
                <Area type="monotone" dataKey="jetA1" name="Jet A-1 Fuel (L/day)" stroke="#00E5FF" fill="url(#anJet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cargo Logistics Performance */}
        <div className="polar-panel rounded-2xl p-5 border border-polar-border">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>CARGO ON-TIME VS DELAYED BY TRANSPORT MODE</span>
              </h3>
              <p className="text-[11px] text-slate-400">Vessel pack ice delay vs ski-plane air reliability</p>
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cargoPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3566" />
                <XAxis dataKey="mode" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#091530', borderColor: '#1E3566', color: '#fff' }} />
                <Legend />
                <Bar dataKey="onTime" name="On Time Shipments" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" name="Delayed Shipments" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Inventory Runway Distribution */}
        <div className="polar-panel rounded-2xl p-5 border border-polar-border">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>RESOURCE RUNWAY REMAINING (ESTIMATED DAYS)</span>
              </h3>
              <p className="text-[11px] text-slate-400">Comparison across critical station supply categories</p>
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={inventoryRunwayData} margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3566" />
                <XAxis type="number" stroke="#64748B" />
                <YAxis dataKey="name" type="category" stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#091530', borderColor: '#1E3566', color: '#fff' }} />
                <Legend />
                <Bar dataKey="days" name="Days Runway" fill="#00E5FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Personnel Deployment by Team */}
        <div className="polar-panel rounded-2xl p-5 border border-polar-border">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>PERSONNEL DISTRIBUTION ACROSS FUNCTIONAL TEAMS</span>
              </h3>
              <p className="text-[11px] text-slate-400">Total station compliment: {personnel.length} on-ice crew members</p>
            </div>
          </div>

          <div className="w-full h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personnelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {personnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#091530', borderColor: '#1E3566', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
