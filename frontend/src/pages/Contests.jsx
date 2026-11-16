import React from 'react';
import { Trophy, TrendingUp, Award, Target, Flame } from 'lucide-react';
import RatingChart from '../components/RatingChart';
import ContestTable from '../components/ContestTable';

export default function Contests({ contestsData }) {
  const lc = contestsData?.leetcode || {};
  const cc = contestsData?.codechef || {};
  const highlights = contestsData?.highlights || {};

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-1">
          // COMPETITIVE PERFORMANCE AUDIT
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-main">
          Contests & Rating Telemetry
        </h1>
        <p className="text-sm text-text-muted mt-1 font-sans max-w-4xl">
          Complete, verified historical record of all 34 rated online judge rounds on LeetCode and CodeChef. Evaluated under strict timer constraints and real-time rank competition.
        </p>
      </div>

      {/* Highlights Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span>BEST RANK</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
            #1,410
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            LC Biweekly Contest 194
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-delta-positive" />
            <span>MAX RATING GAIN</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-delta-positive tabular-nums">
            +61 pts
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            CC Starters 153 (Div 4)
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-accent" />
            <span>WIN STREAK</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
            6 Rounds
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            Consecutive positive rating climbs
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-2 text-text-muted mb-1 text-xs font-mono">
            <Target className="w-3.5 h-3.5 text-text-main" />
            <span>BEST ACCURACY</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
            3 / 4 Solved
          </div>
          <p className="text-[11px] text-text-muted font-mono mt-0.5">
            Consistently in Div 2/3 rounds
          </p>
        </div>
      </section>

      {/* SECTION 1: LEETCODE (Primary, larger) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent inline-block"></span>
            <h2 className="text-xl font-bold font-sans text-text-main">
              LeetCode Arena (Primary)
            </h2>
          </div>
          <span className="text-xs font-mono text-text-muted">
            Handle: <strong className="text-text-main">raj_aayush01</strong>
          </span>
        </div>

        {/* LeetCode Quick Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">CURRENT RATING</span>
            <span className="text-2xl font-bold font-mono text-accent tabular-nums">
              1,767
            </span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">GLOBAL RANK</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              #87,198
            </span>
            <span className="text-[10px] text-text-muted font-mono">/ 892,590</span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">PERCENTILE TIER</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              Top 9.97%
            </span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">CONTESTS ATTENDED</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              {lc.contestsAttended || 34}
            </span>
          </div>
        </div>

        {/* LeetCode Interactive Chart */}
        <RatingChart
          leetcodeContests={lc.contests || []}
          codechefContests={cc.contests || []}
        />

        {/* LeetCode Badges Strip */}
        <div className="dashboard-card p-5 sm:p-6">
          <h3 className="text-sm font-bold font-sans text-text-main mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            <span>Contest & Practice Badges</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {(lc.badges || []).map((b) => (
              <div
                key={b.name}
                className="px-3.5 py-2 rounded-lg border border-border bg-surface-subtle/60 flex items-center gap-2.5 font-mono text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div>
                  <div className="font-semibold text-text-main">{b.name}</div>
                  <div className="text-[10px] text-text-muted">{b.category || 'Contest'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LeetCode Full Sortable Table */}
        <ContestTable contests={lc.contests || []} platformName="LeetCode" />
      </section>

      {/* SECTION 2: CODECHEF (Secondary) */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
            <h2 className="text-xl font-bold font-sans text-text-main">
              CodeChef Arena (Secondary)
            </h2>
          </div>
          <span className="text-xs font-mono text-text-muted">
            Handle: <strong className="text-text-main">raj_aayush01</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">CURRENT RATING</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              1,271
            </span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">STARS & DIVISION</span>
            <span className="text-2xl font-bold font-mono text-text-main">
              1★ (Div 4)
            </span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">GLOBAL RANK</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              #72,837
            </span>
          </div>
          <div className="dashboard-card p-4 bg-surface-subtle/40">
            <span className="text-[11px] font-mono text-text-muted block">COUNTRY RANK</span>
            <span className="text-2xl font-bold font-mono text-text-main tabular-nums">
              #69,881
            </span>
          </div>
        </div>

        <ContestTable contests={cc.contests || []} platformName="CodeChef" />
      </section>
    </div>
  );
}
