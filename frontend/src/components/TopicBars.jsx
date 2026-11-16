import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function TopicBars({ topics = [], onNavigateProblems }) {
  const topTopics = topics.slice(0, 6);
  const maxSolved = topTopics.length > 0 ? Math.max(...topTopics.map((t) => t.problemsSolved)) : 100;

  return (
    <div className="dashboard-card p-6 sm:p-7 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-sans text-text-main">
            Solved by Topic
          </h2>
          <p className="text-xs text-text-muted font-mono">LeetCode topic distribution</p>
        </div>
        <button
          type="button"
          onClick={onNavigateProblems}
          className="text-xs font-mono font-medium text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4 my-auto">
        {topTopics.map((item) => {
          const percentage = Math.round((item.problemsSolved / maxSolved) * 100);
          return (
            <div key={item.tagName} className="flex items-center gap-4">
              <span className="w-32 text-xs font-sans font-medium text-text-main truncate">
                {item.tagName}
              </span>
              <div className="flex-1 bg-surface-subtle h-3 rounded-full overflow-hidden border border-border/40">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(percentage, 8)}%` }}
                />
              </div>
              <span className="w-12 text-right text-xs font-mono font-bold text-text-main tabular-nums">
                {item.problemsSolved}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-2 border-t border-border/60 text-right">
        <button
          type="button"
          onClick={onNavigateProblems}
          className="text-xs font-mono text-text-muted hover:text-text-main transition-colors cursor-pointer"
        >
          See full topic catalog & languages &rarr;
        </button>
      </div>
    </div>
  );
}
