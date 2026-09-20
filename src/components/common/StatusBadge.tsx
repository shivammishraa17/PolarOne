import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm', pulse = false }) => {
  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  const s = status.toUpperCase();

  if (s.includes('CRITICAL') || s === 'DELAYED' || s.includes('ALERT') || s === 'FAILED' || s === 'REPORTED') {
    colorClasses = 'bg-rose-950/80 text-rose-300 border-rose-700/80';
  } else if (s.includes('WARNING') || s.includes('DUE') || s === 'REORDER DUE' || s === 'DISPATCHED' || s.includes('STRESS')) {
    colorClasses = 'bg-amber-950/80 text-amber-300 border-amber-700/80';
  } else if (s === 'OPERATIONAL' || s === 'NOMINAL' || s === 'ONLINE' || s === 'DELIVERED' || s === 'SAFE' || s === 'RESOLVED' || s === 'SUCCESS') {
    colorClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80';
  } else if (s === 'IN TRANSIT' || s === 'SYNCING' || s === 'ON DUTY' || s === 'PLANNED' || s === 'PACKED' || s === 'HIGH') {
    colorClasses = 'bg-cyan-950/80 text-cyan-300 border-cyan-700/80';
  } else if (s === 'INFO' || s === 'ROUTINE' || s === 'RESTING') {
    colorClasses = 'bg-blue-950/80 text-blue-300 border-blue-700/80';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5 font-semibold'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-mono tracking-wider uppercase font-medium ${sizeClasses} ${colorClasses}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {status}
    </span>
  );
};
