import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function SourceDonut({ sources = [] }) {
  const activeSources = sources.filter((s) => s.value > 0);
  const total = activeSources.reduce((acc, curr) => acc + curr.value, 0);

  const dataWithPercentages = activeSources.map((d) => ({
    ...d,
    percentage: total > 0 ? Math.round((d.value / total) * 100) : 0,
  }));

  return (
    <div className="dashboard-card p-6 sm:p-7 flex flex-col justify-between h-full">
      <div className="pb-3 border-b border-border/80 mb-2">
        <h2 className="text-base sm:text-lg font-bold font-sans text-text-main">
          Problem Sources
        </h2>
        <p className="text-xs text-text-muted font-mono">Platform split</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-3 my-auto">
        {/* Donut Canvas */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="p-2 bg-surface border border-border rounded font-mono text-xs shadow-md">
                        <span className="font-bold text-text-main">{d.name}: </span>
                        <span>{Number(d.value).toLocaleString()} solved ({d.percentage}%)</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={dataWithPercentages}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="#FFFFFF"
                strokeWidth={2}
              >
                {dataWithPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums leading-none">
              {Number(total).toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider mt-1">
              Solved
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-3 w-full">
          {dataWithPercentages.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
                <span className="font-medium text-text-main">{entry.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-text-muted">{Number(entry.value).toLocaleString()}</span>
                <span className="font-bold text-text-main w-8 text-right tabular-nums">
                  {entry.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-1 border-t border-border/60 text-right">
        <span className="text-xs font-mono text-text-muted">
          500+ problems validated across platforms
        </span>
      </div>
    </div>
  );
}
