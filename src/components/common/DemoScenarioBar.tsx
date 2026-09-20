import React, { useState } from 'react';
import { Play, SkipForward, SkipBack, RotateCcw, ChevronDown, ChevronUp, CheckCircle2, Sparkles } from 'lucide-react';
import { useMission } from '../../context/MissionContext';

export const DemoScenarioBar: React.FC = () => {
  const { demoStep, setDemoStep, nextDemoStep, prevDemoStep, triggerFullDemoWorkflow, setActiveTab } = useMission();
  const [isMinimized, setIsMinimized] = useState(false);

  const steps = [
    {
      title: '1. Mission Starts: Command Center',
      tab: 'dashboard',
      actionText: 'Station Bharati status, readiness score, personnel and active alerts initialized.'
    },
    {
      title: '2. Cargo Tracking: Supply Manifest',
      tab: 'cargo',
      actionText: 'Track Icebreaker RV Bharati and air drops staged at Cape Town / Prydz Bay.'
    },
    {
      title: '3. Inventory Monitoring: Fuel Burn',
      tab: 'inventory',
      actionText: 'Review Arctic Jet A-1 runway (4,200L remaining at 350L/day = 12 days).'
    },
    {
      title: '4. 3D Digital Twin: Station Telemetry',
      tab: 'digitaltwin',
      actionText: 'Interactive 3D model of Bharati Station: Fuel depot, CAT gensets, hab modules.'
    },
    {
      title: '5. Predictive Intelligence: Shortage Risk',
      tab: 'predictive',
      actionText: 'Algorithmic forecast warns of zero-fuel event before next resupply window.'
    },
    {
      title: '6. Live Disruption: Sea Ice Delay',
      tab: 'cargo',
      actionText: 'RV Bharati delayed by 5 days in pack ice; triggers critical fuel warning alert.'
    },
    {
      title: '7. What-If Simulator: Mission Impact',
      tab: 'simulator',
      actionText: 'Simulate +5 Day delay & blizzard burn surge; visualizes CURRENT vs SIMULATED plan.'
    },
    {
      title: '8. Mitigation Execution: Load Shedding',
      tab: 'simulator',
      actionText: 'Apply non-essential heat reduction; adds 600L reserve buffer back to station.'
    },
    {
      title: '9. Sector B Emergency: Traverse Incident',
      tab: 'emergency',
      actionText: 'Field scout Jean-Luc suffers cold stress & sprain at -69.412°S during crevasse survey.'
    },
    {
      title: '10. Automated Response & 1-Click Dispatch',
      tab: 'emergency',
      actionText: 'System computes nearest medic, skidoo, trauma kits, and dynamic 8-min ETA.'
    },
    {
      title: '11. Operations Synchronized: Mission Recovered',
      tab: 'dashboard',
      actionText: 'Dashboard updates live readiness score and resolves tactical risks.'
    }
  ];

  const current = steps[demoStep] || steps[0];

  return (
    <div className="bg-gradient-to-r from-[#0C1A3A] via-[#102450] to-[#0C1A3A] border-b border-cyan-500/40 px-4 py-2 text-xs font-mono shadow-lg transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Step Badge & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500 text-black font-bold text-[11px] shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUDGE DEMO MODE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-bold text-sm tracking-wide">
              {current.title}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              {current.actionText}
            </span>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevDemoStep}
            disabled={demoStep === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200"
            title="Previous Step"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <span className="px-2 py-0.5 rounded bg-black/40 text-cyan-400 font-bold text-[11px]">
            {demoStep + 1} / {steps.length}
          </span>

          <button
            onClick={nextDemoStep}
            disabled={demoStep === steps.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold transition-all shadow-[0_0_10px_rgba(0,229,255,0.4)]"
            title="Next Step"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              triggerFullDemoWorkflow();
              setActiveTab('dashboard');
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Reset Demo to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            title={isMinimized ? 'Expand Step Navigator' : 'Minimize'}
          >
            {isMinimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Step Selector Pills */}
      {!isMinimized && (
        <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center gap-1.5 overflow-x-auto pb-1">
          {steps.map((step, idx) => {
            const isDone = idx < demoStep;
            const isCurrent = idx === demoStep;
            return (
              <button
                key={idx}
                onClick={() => {
                  setDemoStep(idx);
                  setActiveTab(step.tab);
                }}
                className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-all flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_8px_#00e5ff]'
                    : isDone
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isDone && <CheckCircle2 className="w-2.5 h-2.5" />}
                <span>{idx + 1}. {step.title.split(':')[0].replace(/^[0-9]+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
