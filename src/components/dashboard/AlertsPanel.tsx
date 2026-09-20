import React from 'react';
import { AlertCircle, AlertTriangle, Info, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from '../common/StatusBadge';

export const AlertsPanel: React.FC = () => {
  const { alerts, acknowledgeAlert, setActiveTab } = useMission();

  const handleAction = (category: string) => {
    if (category === 'Fuel' || category === 'Cargo') {
      setActiveTab('predictive');
    } else if (category === 'Generator') {
      setActiveTab('assets');
    } else if (category === 'Medical' || category === 'Personnel') {
      setActiveTab('emergency');
    } else {
      setActiveTab('dashboard');
    }
  };

  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <div className="polar-panel rounded-2xl p-5 border border-polar-border flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-700/60 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
              <span>REAL-TIME OPERATIONAL ALERTS</span>
              {unacknowledgedAlerts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-rose-600 text-white animate-pulse">
                  {unacknowledgedAlerts.length} ACTION REQUIRED
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Severity: CRITICAL • WARNING • INFO</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('emergency')}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
        >
          <span>Emergency Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {alerts.slice(0, 5).map(alert => {
          const isCritical = alert.severity === 'CRITICAL';
          const isWarning = alert.severity === 'WARNING';
          return (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border transition-all ${
                isCritical 
                  ? 'bg-rose-950/40 border-rose-800/80 hover:border-rose-600' 
                  : isWarning 
                  ? 'bg-amber-950/40 border-amber-800/80 hover:border-amber-600'
                  : 'bg-blue-950/30 border-blue-900/60'
              } ${alert.acknowledged ? 'opacity-65' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StatusBadge status={alert.severity} size="sm" pulse={!alert.acknowledged && isCritical} />
                  <span className="text-[11px] font-mono text-slate-400 uppercase">{alert.category}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
              </div>

              <h4 className="mt-1.5 text-xs font-bold font-mono text-white">{alert.title}</h4>
              <p className="mt-1 text-[11px] text-slate-300 font-sans leading-relaxed">{alert.description}</p>

              {alert.actionRecommendation && (
                <div className="mt-2 p-2 rounded bg-black/40 border border-slate-700/60 text-[11px] text-cyan-300 font-sans">
                  <strong className="text-cyan-400 font-mono text-[10px] uppercase">Recommendation: </strong>
                  {alert.actionRecommendation}
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                {!alert.acknowledged ? (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="flex items-center gap-1 text-slate-300 hover:text-white text-[11px] px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>
                ) : (
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Acknowledged
                  </span>
                )}

                <button
                  onClick={() => handleAction(alert.category)}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Resolve</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
