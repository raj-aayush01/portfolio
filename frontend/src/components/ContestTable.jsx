import React, { useState, useMemo } from 'react';

export default function ContestTable({ contests = [], platformName = 'LeetCode' }) {
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('desc');

  const availableYears = useMemo(() => {
    const years = new Set();
    contests.forEach((c) => {
      const year = c.date ? c.date.split('-')[0] : '';
      if (year) years.add(year);
    });
    return Array.from(years).sort().reverse();
  }, [contests]);

  const filteredContests = useMemo(() => {
    let result = [...contests];
    if (selectedYear !== 'ALL') {
      result = result.filter((c) => c.date && c.date.startsWith(selectedYear));
    }
    result.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [contests, selectedYear, sortOrder]);

  return (
    <div className="dashboard-card overflow-hidden">
      {/* Controls Header */}
      <div className="p-4 sm:p-5 bg-surface border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold font-sans text-text-main">
            {platformName} Contest History
          </h3>
          <p className="text-xs text-text-muted font-mono">
            Showing {filteredContests.length} of {contests.length} rated rounds
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-text-muted">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-xs font-mono px-2.5 py-1 rounded border border-border bg-surface text-text-main focus:border-accent cursor-pointer"
            >
              <option value="ALL">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="text-xs font-mono px-2.5 py-1 rounded border border-border bg-surface text-text-main hover:border-text-muted transition-colors cursor-pointer"
          >
            Sort: {sortOrder === 'desc' ? 'Newest ↓' : 'Oldest ↑'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono" aria-label="Contest Table">
          <thead>
            <tr className="bg-surface-subtle border-b border-border text-text-muted">
              <th scope="col" className="py-3 px-5 font-semibold">DATE</th>
              <th scope="col" className="py-3 px-5 font-semibold">CONTEST</th>
              <th scope="col" className="py-3 px-5 font-semibold">GLOBAL RANK</th>
              <th scope="col" className="py-3 px-5 font-semibold">PROBLEMS SOLVED</th>
              <th scope="col" className="py-3 px-5 font-semibold text-right">RATING CHANGE</th>
              <th scope="col" className="py-3 px-5 font-semibold text-right">NEW RATING</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredContests.map((c, idx) => {
              const isPositive = c.ratingChange >= 0;
              const d = new Date(c.date);
              const displayDate = isNaN(d.getTime())
                ? c.date
                : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <tr key={`${c.contestName}-${idx}`} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="py-3 px-5 text-text-muted whitespace-nowrap">
                    {displayDate}
                  </td>
                  <td className="py-3 px-5 font-sans font-semibold text-text-main">
                    {c.contestName}
                  </td>
                  <td className="py-3 px-5 text-text-main tabular-nums">
                    #{Number(c.rank).toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-text-muted tabular-nums">
                    {c.problemsSolved !== undefined && c.totalProblems
                      ? `${c.problemsSolved} / ${c.totalProblems}`
                      : '—'}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span
                      className={`inline-block font-bold tabular-nums px-2 py-0.5 rounded text-[11px] ${
                        isPositive
                          ? 'bg-delta-positive-bg text-delta-positive'
                          : 'bg-delta-negative-bg text-delta-negative'
                      }`}
                    >
                      {isPositive ? `+${c.ratingChange}` : c.ratingChange}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right font-bold text-text-main tabular-nums">
                    {c.rating}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
