import React, { useState } from 'react';
import { X, CheckCheck, AlertCircle, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { StatusBadge } from './StatusBadge';
import { AlertSeverity } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { alerts, acknowledgeAlert, dismissAlert, setActiveTab } = useMission();
  const [filter, setFilter] = useState<'ALL' | AlertSeverity>('ALL');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    return a.severity === filter;
  });

  const handleActionClick = (category: string) => {
    if (category === 'Fuel' || category === 'Cargo') {
      setActiveTab('predictive');
    } else if (category === 'Generator') {
      setActiveTab('assets');
    } else if (category === 'Medical' || category === 'Personnel') {
      setActiveTab('emergency');
    } else {
      setActiveTab('dashboard');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A132B] border-l border-polar-border shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0E1A38]">
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-base font-bold text-white tracking-wide">MISSION ALERTS & COMMS</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {alerts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Severity Filter Tabs */}
          <div className="px-4 py-2 border-b border-slate-800/80 bg-[#070E22] flex items-center gap-1.5 font-mono text-xs">
            {(['ALL', 'CRITICAL', 'WARNING', 'INFO'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === tab
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
            {filteredAlerts.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No alerts matching active criteria.
              </div>
            ) : (
              filteredAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-950/40 border-rose-800/80 hover:border-rose-600'
                      : alert.severity === 'WARNING'
                      ? 'bg-amber-950/40 border-amber-800/80 hover:border-amber-600'
                      : 'bg-blue-950/40 border-blue-800/80 hover:border-blue-600'
                  } ${alert.acknowledged ? 'opacity-70' : 'shadow-md'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={alert.severity} size="sm" pulse={!alert.acknowledged && alert.severity === 'CRITICAL'} />
                      <span className="text-[10px] text-slate-400 font-medium">{alert.category}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                  </div>

                  <h4 className="mt-2 text-xs font-bold text-white">{alert.title}</h4>
                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed font-sans">{alert.description}</p>

                  {alert.actionRecommendation && (
                    <div className="mt-2 p-2 rounded bg-black/40 border border-slate-700/60 text-[11px] text-cyan-300 font-sans">
                      <strong className="text-cyan-400 font-mono text-[10px] uppercase">Recommended Action: </strong>
                      {alert.actionRecommendation}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      {!alert.acknowledged ? (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700"
                        >
                          <CheckCheck className="w-3 h-3 text-emerald-400" />
                          <span>Acknowledge</span>
                        </button>
                      ) : (
                        <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" /> Acknowledged
                        </span>
                      )}
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-slate-400 hover:text-rose-400 px-1.5 py-0.5"
                      >
                        Dismiss
                      </button>
                    </div>

                    <button
                      onClick={() => handleActionClick(alert.category)}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      <span>Triage</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
