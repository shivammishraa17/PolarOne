import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral' | 'critical';
  trendText?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendText,
  badge,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`polar-card rounded-xl p-4 transition-all duration-200 hover:border-cyan-500/50 hover:bg-[#1A2C5A]/70 relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">{label}</span>
        <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-700/30 text-cyan-400 group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
        {badge}
      </div>

      {(subtext || trendText) && (
        <div className="mt-2 flex items-center justify-between text-xs">
          {subtext && <span className="text-slate-400 truncate">{subtext}</span>}
          {trendText && (
            <span className={`font-mono text-[11px] font-medium ml-auto ${
              trend === 'critical' ? 'text-rose-400' :
              trend === 'up' ? 'text-emerald-400' :
              trend === 'down' ? 'text-amber-400' : 'text-slate-400'
            }`}>
              {trendText}
            </span>
          )}
        </div>
      )}

      {/* Decorative corner tick */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
