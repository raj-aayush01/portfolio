import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot,
} from 'recharts';

export default function RatingChart({ leetcodeContests = [], codechefContests = [] }) {
  const [platform, setPlatform] = useState('LeetCode');

  const rawData = platform === 'LeetCode' ? leetcodeContests : codechefContests;

  // Format dates nicely
  const chartData = [...rawData]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item, index) => {
      const d = new Date(item.date);
      const displayDate = isNaN(d.getTime())
        ? item.date
        : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return {
        ...item,
        displayDate,
        index: index + 1,
      };
    });

  const latestContest = chartData[chartData.length - 1];
  const ratings = chartData.map((d) => d.rating);
  const minRating = ratings.length > 0 ? Math.floor(Math.min(...ratings) / 100) * 100 - 100 : 1200;
  const maxRating = ratings.length > 0 ? Math.ceil(Math.max(...ratings) / 100) * 100 + 100 : 2000;

  return (
    <div className="dashboard-card p-6 sm:p-7 flex flex-col justify-between h-full">
      {/* Header Row: Title, Dropdown, and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-sans text-text-main flex items-center gap-2">
            <span>Rating Progress</span>
            {latestContest ? (
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-accent-subtle text-accent border border-accent-border">
                {latestContest.rating}
              </span>
            ) : null}
          </h2>
          <p className="text-xs text-text-muted mt-0.5 font-mono">
            {platform} competitive contest rating timeline (34 rated rounds with real dip & surge)
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-3">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg border border-border bg-surface text-text-main focus:border-accent cursor-pointer transition-colors"
          >
            <option value="LeetCode">LeetCode (1767)</option>
            <option value="CodeChef">CodeChef (1271)</option>
          </select>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-[280px] sm:h-[340px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 35, left: -5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EFEB" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 11, fill: '#737373', fontFamily: '"IBM Plex Mono"' }}
                axisLine={{ stroke: '#E5E5E5' }}
                tickLine={false}
                dy={6}
              />
              <YAxis
                domain={[minRating, maxRating]}
                tick={{ fontSize: 11, fill: '#737373', fontFamily: '"IBM Plex Mono"' }}
                axisLine={false}
                tickLine={false}
                dx={-4}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const isPositive = data.ratingChange >= 0;
                    return (
                      <div className="p-3 bg-surface border border-border rounded-lg shadow-lg font-mono text-xs">
                        <div className="font-bold text-text-main font-sans text-sm mb-1">
                          {data.contestName}
                        </div>
                        <div className="text-text-muted text-[11px] mb-2">
                          {data.displayDate} · Rank #{Number(data.rank).toLocaleString()}
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-border/70">
                          <span className="text-text-muted">Rating:</span>
                          <span className="font-bold text-text-main text-sm">
                            {data.rating}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 mt-0.5">
                          <span className="text-text-muted">Delta:</span>
                          <span
                            className={`font-semibold ${
                              isPositive ? 'text-delta-positive' : 'text-delta-negative'
                            }`}
                          >
                            {isPositive ? `+${data.ratingChange}` : data.ratingChange}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#F28C28"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  fill: '#F28C28',
                  stroke: '#FFFFFF',
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 6,
                  fill: '#F28C28',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
              />

              {latestContest ? (
                <ReferenceDot
                  x={latestContest.displayDate}
                  y={latestContest.rating}
                  r={5}
                  fill="#F28C28"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  label={{
                    value: `${latestContest.rating}`,
                    position: 'top',
                    offset: 10,
                    fill: '#F28C28',
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: '"IBM Plex Mono"',
                  }}
                />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs font-mono text-text-muted">
            Loading contest history...
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-3 mt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block"></span>
          <span>Official Contest Rating Curve</span>
        </div>
        <span>{chartData.length} Contests Plotted</span>
      </div>
    </div>
  );
}
