import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function RecentContests({ contests = [], onNavigateContests }) {
  return (
    <div className="dashboard-card p-6 sm:p-7 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-sans text-text-main">
            Recent Contests
          </h2>
          <p className="text-xs text-text-muted font-mono">Last 5 rated rounds</p>
        </div>
        <button
          type="button"
          onClick={onNavigateContests}
          className="text-xs font-mono font-medium text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative space-y-4 my-auto">
        <div className="absolute top-2.5 bottom-2.5 left-[7px] w-0.5 bg-border/80" aria-hidden="true" />

        {contests.map((c, i) => {
          const isPositive = c.ratingChange >= 0;
          const d = new Date(c.date);
          const displayDate = isNaN(d.getTime())
            ? c.date
            : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

          return (
            <div key={`${c.contestName}-${i}`} className="relative flex items-start justify-between gap-3 pl-6">
              <span
                className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-surface ${
                  isPositive ? 'bg-delta-positive' : 'bg-delta-negative'
                }`}
                aria-hidden="true"
              />

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono text-text-muted block">
                  {displayDate}
                </span>
                <span className="text-sm font-semibold text-text-main block truncate font-sans">
                  {c.contestName}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  #{Number(c.rank).toLocaleString()} · {c.platform}
                </span>
              </div>

              <div className="text-right flex-shrink-0 pt-1">
                <span
                  className={`text-xs font-mono font-bold tabular-nums px-2 py-0.5 rounded ${
                    isPositive
                      ? 'bg-delta-positive-bg text-delta-positive'
                      : 'bg-delta-negative-bg text-delta-negative'
                  }`}
                >
                  {isPositive ? `+${c.ratingChange}` : c.ratingChange}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-2 border-t border-border/60 text-right">
        <button
          type="button"
          onClick={onNavigateContests}
          className="text-xs font-mono text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          Inspect full 34+ contest history &rarr;
        </button>
      </div>
    </div>
  );
}
