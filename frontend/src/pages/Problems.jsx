import React from 'react';
import {
  Code,
  Flame,
  Calendar,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function Problems({ problemsData }) {
  const lc = problemsData?.leetcode || {};
  const gfg = problemsData?.gfg || {};
  const notable = problemsData?.notableProblems || [];

  const totalSolved = (lc.problemsSolved?.total || 387) + (gfg.problemsSolved || 121);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-1">
          // PRACTICE TELEMETRY & ALGORITHMIC VOLUME
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-main">
          Problem Solving & Practice Metrics
        </h1>
        <p className="text-sm text-text-muted mt-1 font-sans max-w-4xl">
          Detailed metrics across algorithmic problem sets, difficulty distributions, implementation languages, and curated key algorithmic solutions.
        </p>
      </div>

      {/* Primary Practice Summary Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            <span>TOTAL SOLVED</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-text-main tabular-nums">
            {totalSolved}
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            387 LeetCode + 121 GFG
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-text-main" />
            <span>ACTIVE DAYS</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-text-main tabular-nums">
            {lc.activeDays || 208}
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            Days with verified commits
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-accent" />
            <span>MAX STREAK</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-accent tabular-nums">
            {lc.maxStreak || 35} Days
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            Continuous daily problem solves
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-text-main" />
            <span>PRIMARY LANGUAGE</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-text-main tabular-nums">
            C++ (358)
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            92.5% of solved solutions
          </p>
        </div>
      </section>

      {/* LeetCode Difficulty Split Breakdown */}
      <section className="dashboard-card p-6 sm:p-7">
        <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-6">
          <div>
            <h2 className="text-lg font-bold font-sans text-text-main">
              LeetCode Difficulty Distribution
            </h2>
            <p className="text-xs text-text-muted font-mono">
              387 total verified solves · 16 attempting
            </p>
          </div>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-surface-subtle border border-border">
            Acceptance Rate: 99.4%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Easy */}
          <div className="p-5 rounded-xl border border-border bg-surface-subtle/30">
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
              <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Easy
              </span>
              <span className="text-[11px]">{Math.round(((lc.problemsSolved?.easy || 118) / (lc.problemsSolved?.total || 387)) * 100)}%</span>
            </div>
            <div className="text-3xl font-bold font-mono text-text-main tabular-nums">
              {lc.problemsSolved?.easy || 118}
            </div>
            <p className="text-xs text-text-muted font-sans mt-1">
              Fundamental logic, array loops, simple string parsing
            </p>
          </div>

          {/* Medium */}
          <div className="p-5 rounded-xl border-2 border-accent/40 bg-accent-subtle/30">
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
              <span className="font-semibold text-accent flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Medium (Primary Focus)
              </span>
              <span className="text-[11px] font-bold text-accent">
                {Math.round(((lc.problemsSolved?.medium || 226) / (lc.problemsSolved?.total || 387)) * 100)}%
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-text-main tabular-nums">
              {lc.problemsSolved?.medium || 226}
            </div>
            <p className="text-xs text-text-muted font-sans mt-1">
              Graphs, Dynamic Programming, Segment Trees, Backtracking
            </p>
          </div>

          {/* Hard */}
          <div className="p-5 rounded-xl border border-border bg-surface-subtle/30">
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
              <span className="font-semibold text-rose-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                Hard
              </span>
              <span className="text-[11px]">{Math.round(((lc.problemsSolved?.hard || 43) / (lc.problemsSolved?.total || 387)) * 100)}%</span>
            </div>
            <div className="text-3xl font-bold font-mono text-text-main tabular-nums">
              {lc.problemsSolved?.hard || 43}
            </div>
            <p className="text-xs text-text-muted font-sans mt-1">
              Advanced DP with bitmasking, Monotonic Queues, Hard Graph paths
            </p>
          </div>
        </div>
      </section>

      {/* Languages & Topic Catalog Row */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 dashboard-card p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-border/80 mb-4">
              <Code className="w-4 h-4 text-accent" />
              <h2 className="text-base font-bold font-sans text-text-main">
                Programming Languages
              </h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {(lc.languages || []).map((l) => (
                <div key={l.language} className="flex items-center justify-between p-3 rounded bg-surface-subtle/60 border border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span className="font-semibold text-text-main font-sans">{l.language}</span>
                  </div>
                  <span className="font-bold text-text-main tabular-nums">
                    {l.problemsSolved} Solved
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-text-muted font-mono pt-4 mt-4 border-t border-border/60">
            C++ STL is utilized as the primary vehicle for sub-millisecond execution times.
          </p>
        </div>

        <div className="xl:col-span-7 dashboard-card p-6 sm:p-7">
          <div className="flex items-center gap-2 pb-3 border-b border-border/80 mb-4">
            <Layers className="w-4 h-4 text-accent" />
            <h2 className="text-base font-bold font-sans text-text-main">
              Topic Breakdown Catalog
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(lc.tagProblemCounts || []).map((t) => (
              <div
                key={t.tagName}
                className="p-3.5 rounded-lg border border-border bg-surface-subtle/30 flex items-center justify-between"
              >
                <span className="text-xs font-medium text-text-main font-sans">
                  {t.tagName}
                </span>
                <span className="text-xs font-mono font-bold text-accent tabular-nums">
                  {t.problemsSolved}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Solves */}
      {notable.length > 0 ? (
        <section className="dashboard-card p-6 sm:p-7">
          <div className="pb-3 border-b border-border/80 mb-6">
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block">
              // ARCHITECTURAL & ALGORITHMIC ARCHIVE
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-sans text-text-main">
              Notable Algorithmic Solves
            </h2>
            <p className="text-xs text-text-muted font-mono mt-0.5">
              Representative problems solved with tight time-complexity and minimal space overhead
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notable.map((prob) => {
              const diffColor =
                prob.difficulty === 'Easy'
                  ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                  : prob.difficulty === 'Medium'
                  ? 'text-amber-600 bg-amber-50 border-amber-200'
                  : 'text-rose-600 bg-rose-50 border-rose-200';

              return (
                <div
                  key={prob.id}
                  className="p-5 rounded-xl border border-border bg-surface hover:border-text-muted/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${diffColor}`}>
                        {prob.difficulty}
                      </span>
                      <a
                        href={prob.problemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Open Problem</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <h3 className="text-sm font-bold text-text-main font-sans">
                      {prob.title}
                    </h3>

                    <p className="text-xs text-text-muted/90 font-sans mt-2 leading-relaxed">
                      {prob.approach}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
                    {(prob.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-text-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
