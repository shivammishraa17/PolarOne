import React, { useState } from 'react';
import { 
  Database, 
  Droplet, 
  Utensils, 
  HeartPulse, 
  Wrench, 
  Microscope, 
  BatteryCharging, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  Plus, 
  Minus, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import { CargoCategory } from '../../types';

export const InventoryManagement: React.FC = () => {
  const { inventory, adjustStock, setActiveTab } = useMission();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [adjustModalItem, setAdjustModalItem] = useState<{ id: string; name: string; unit: string; current: number } | null>(null);
  const [adjustDelta, setAdjustDelta] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>('Routine Daily Burn');

  const categories = [
    'ALL',
    'Fuel',
    'Food',
    'Medical supplies',
    'Spare parts',
    'Scientific equipment',
    'Batteries',
    'Safety equipment'
  ];

  const filteredInventory = inventory.filter(item => {
    if (categoryFilter === 'ALL') return true;
    return item.category === categoryFilter;
  });

  const criticalItems = inventory.filter(i => i.reorderStatus === 'Critical Depletion');
  const warningItems = inventory.filter(i => i.reorderStatus === 'Reorder Due');

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalItem) return;
    adjustStock(adjustModalItem.id, adjustDelta, adjustReason);
    setAdjustModalItem(null);
    setAdjustDelta(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Inventory Control Center */}
      <div className="polar-panel rounded-2xl p-5 border border-polar-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Database className="w-4 h-4" />
              <span>STATION INVENTORY & RESOURCE RUNWAY AUDIT</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-white mt-1">
              Antarctic Consumables & Material Reserves
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Automated Runway Projection: Current Stock ÷ Daily Burn = Days Remaining
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab('predictive')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Predictive Intelligence Engine</span>
            </button>
          </div>
        </div>

        {/* Critical Depletion Callout Banner (Prompt Example: Fuel 4,200L, 12 days, threshold 15 days) */}
        {criticalItems.length > 0 && (
          <div className="mt-5 p-4 rounded-xl bg-rose-950/40 border border-rose-600/80 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-900 text-white">
                <AlertTriangle className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <div className="text-rose-200 font-bold text-sm">
                  CRITICAL REPLENISHMENT RECOMMENDED: {criticalItems[0].name}
                </div>
                <div className="text-rose-300 text-xs mt-1">
                  Current Stock: <strong>{criticalItems[0].currentStock.toLocaleString()} {criticalItems[0].unit}</strong> • 
                  Daily Burn: <strong>{criticalItems[0].dailyConsumption} {criticalItems[0].unit}/day</strong> • 
                  Estimated Remaining: <strong>{criticalItems[0].estimatedDaysRemaining} Days</strong> • 
                  Minimum Threshold: <strong>{criticalItems[0].threshold.toLocaleString()} {criticalItems[0].unit} (15 Days)</strong>
                </div>
                <div className="text-rose-200 text-[11px] mt-0.5">
                  Action: Resupply vessel RV Bharati is delayed +5 days. Recommend 15% load rationing.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('simulator')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors whitespace-nowrap"
              >
                Test in What-If Simulator
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="polar-panel rounded-2xl p-2.5 border border-polar-border flex items-center gap-1.5 overflow-x-auto font-mono text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              categoryFilter === cat
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inventory Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map(item => {
          const isCritical = item.reorderStatus === 'Critical Depletion';
          const isWarning = item.reorderStatus === 'Reorder Due';
          const stockRatio = Math.min(100, Math.round((item.currentStock / (item.threshold * 1.5)) * 100));

          return (
            <div
              key={item.id}
              className={`polar-card rounded-2xl p-4 border transition-all hover:border-cyan-500/60 font-mono ${
                isCritical 
                  ? 'border-rose-700/80 bg-rose-950/20' 
                  : isWarning 
                  ? 'border-amber-700/80 bg-amber-950/20' 
                  : 'border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{item.category}</span>
                  <h3 className="font-bold text-white text-sm mt-0.5 line-clamp-1">{item.name}</h3>
                </div>
                <StatusBadge status={item.reorderStatus} size="sm" pulse={isCritical} />
              </div>

              {/* Stock vs Threshold Numbers */}
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {item.currentStock.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Threshold: {item.threshold.toLocaleString()} {item.unit}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-xl font-bold ${
                    isCritical ? 'text-rose-400' :
                    isWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {item.estimatedDaysRemaining}d
                  </div>
                  <div className="text-[10px] text-slate-400">Runway Remaining</div>
                </div>
              </div>

              {/* Visual Stock Bar */}
              <div className="mt-3">
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCritical ? 'bg-rose-500' :
                      isWarning ? 'bg-amber-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${Math.max(5, stockRatio)}%` }}
                  />
                </div>
              </div>

              {/* Consumption & Storage Sector */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Daily Consumption:</span>
                  <span className="text-slate-200 font-semibold">{item.dailyConsumption} {item.unit}/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Depot:</span>
                  <span className="text-slate-200 truncate max-w-[170px]">{item.locationSector}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Audit:</span>
                  <span className="text-slate-400">{item.lastAudited}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => setAdjustModalItem({
                    id: item.id,
                    name: item.name,
                    unit: item.unit,
                    current: item.currentStock
                  })}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1"
                >
                  <span>Adjust Stock</span>
                </button>

                <button
                  onClick={() => setActiveTab('predictive')}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                >
                  <span>Forecast</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Adjust Stock / Log Consumption */}
      <Modal
        isOpen={!!adjustModalItem}
        onClose={() => setAdjustModalItem(null)}
        title="ADJUST RESOURCE STOCK LEVEL"
        subtitle={adjustModalItem ? `${adjustModalItem.name} (Current: ${adjustModalItem.current} ${adjustModalItem.unit})` : ''}
      >
        <form onSubmit={handleAdjustSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">DELTA QUANTITY (+ Restock / - Consumption)</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAdjustDelta(prev => prev - 50)}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                required
                value={adjustDelta}
                onChange={(e) => setAdjustDelta(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white text-center text-sm font-bold"
              />
              <button
                type="button"
                onClick={() => setAdjustDelta(prev => prev + 50)}
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">REASON / OPERATIONAL LOG</label>
            <select
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A142D] border border-slate-700 text-white"
            >
              <option value="Routine Daily Burn">Routine Daily Burn</option>
              <option value="Blizzard Heating Surge (+25%)">Blizzard Heating Surge (+25%)</option>
              <option value="Emergency Air-Drop Restock">Emergency Air-Drop Restock</option>
              <option value="Load Shedding Conservation">Load Shedding Conservation</option>
              <option value="Field Traverse Cache Staging">Field Traverse Cache Staging</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setAdjustModalItem(null)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-md"
            >
              Confirm Adjustment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
