import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Box, 
  Package, 
  Database, 
  Users, 
  Wrench, 
  TrendingUp, 
  Sliders, 
  AlertOctagon, 
  BarChart3, 
  FileText, 
  BookOpen, 
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { activeTab, setActiveTab, cargo, inventory, assets, incidents, alerts } = useMission();

  const delayedCargoCount = cargo.filter(c => c.status === 'Delayed').length;
  const criticalInventoryCount = inventory.filter(i => i.reorderStatus === 'Critical Depletion').length;
  const warningAssetsCount = assets.filter(a => a.status === 'Warning' || a.status === 'Critical').length;
  const activeEmergencyCount = incidents.filter(i => i.status !== 'RESOLVED').length;

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'expedition', label: 'Expedition Planning', icon: Compass },
    { id: 'digitaltwin', label: '3D Digital Twin', icon: Box, highlight: true },
    { id: 'cargo', label: 'Cargo Tracking', icon: Package, badge: delayedCargoCount ? `${delayedCargoCount} DELAYED` : undefined, badgeType: 'warning' },
    { id: 'inventory', label: 'Inventory Management', icon: Database, badge: criticalInventoryCount ? `${criticalInventoryCount} LOW` : undefined, badgeType: 'danger' },
    { id: 'personnel', label: 'Personnel & Roster', icon: Users },
    { id: 'assets', label: 'Assets & Equipment', icon: Wrench, badge: warningAssetsCount ? `${warningAssetsCount} DUE` : undefined, badgeType: 'warning' },
    { id: 'predictive', label: 'Predictive Intelligence', icon: TrendingUp, highlight: true },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders, highlight: true },
    { id: 'emergency', label: 'Emergency Center', icon: AlertOctagon, badge: activeEmergencyCount ? `${activeEmergencyCount} ACTIVE` : undefined, badgeType: 'danger' },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
    { id: 'reports', label: 'Mission Reports', icon: FileText },
    { id: 'history', label: 'Mission History & Lessons', icon: BookOpen },
    { id: 'settings', label: 'Settings & Cache', icon: Settings },
  ];

  return (
    <aside className={`transition-all duration-300 flex flex-col bg-[#081024] border-r border-polar-border z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Navigation list */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs transition-all relative group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-[#122854] text-cyan-300 border border-cyan-500/50 shadow-md font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0F1D3D]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-400'}`}>
                <Icon className="w-4 h-4" />
              </div>

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      item.badgeType === 'danger'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !item.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
              )}

              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Operational Flow Badge & Collapse Toggle */}
      <div className="p-3 border-t border-slate-800/80 bg-[#060D1E]">
        {!collapsed && (
          <div className="mb-2 p-2.5 rounded-lg bg-[#0F1C3A] border border-cyan-900/40 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>CORE FLOW</span>
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              PLAN ➔ COLLECT ➔ VISUALIZE ➔ PREDICT ➔ SIMULATE ➔ RESPOND ➔ LEARN
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-mono transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span className="ml-2">Collapse Menu</span>}
        </button>
      </div>
    </aside>
  );
};
