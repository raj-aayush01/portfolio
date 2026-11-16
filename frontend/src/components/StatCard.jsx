import React from 'react';

export default function StatCard({
  icon: Icon,
  value,
  label,
  subValue,
  subLabel,
  delta,
}) {
  return (
    <div className="dashboard-card p-5 sm:p-6 flex flex-col justify-between hover:border-text-muted/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-lg bg-surface-subtle text-text-main border border-border">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        {delta ? (
          <span
            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
              delta.positive
                ? 'bg-delta-positive-bg text-delta-positive'
                : 'bg-delta-negative-bg text-delta-negative'
            }`}
          >
            {delta.value}
          </span>
        ) : null}
      </div>

      <div className="mt-2">
        <div className="text-2xl sm:text-3xl font-bold font-mono text-text-main tabular-nums tracking-tight">
          {value}
        </div>
        <div className="text-xs sm:text-sm font-medium text-text-muted mt-1 font-sans">
          {label}
        </div>

        {subValue || subLabel ? (
          <div className="text-[11px] font-mono text-text-muted/80 mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
            {subLabel ? <span>{subLabel}</span> : null}
            {subValue ? <span className="font-semibold text-text-main">{subValue}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
