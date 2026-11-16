import React from 'react';
import {
  Code2,
  Trophy,
  TrendingUp,
  Flame,
  ArrowUpRight,
  Github,
  FileText,
  Mail,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RatingChart from '../components/RatingChart';
import RecentContests from '../components/RecentContests';
import TopicBars from '../components/TopicBars';
import SourceDonut from '../components/SourceDonut';

export default function Overview({
  profile,
  stats,
  contestsData,
  problemsData,
  projects,
  onNavigate,
}) {
  const lcContests = contestsData?.leetcode?.contests || [];
  const ccContests = contestsData?.codechef?.contests || [];
  const tagTopics = problemsData?.leetcode?.tagProblemCounts || [];

  return (
    <div className="space-y-8">
      {/* 1. Bio Introduction & Quick Actions */}
      <section className="dashboard-card p-6 sm:p-7 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-4xl">
          <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-1">
            // OVERVIEW & EXECUTIVE SUMMARY
          </span>
          <p className="text-sm sm:text-base text-text-main font-sans leading-relaxed">
            {profile?.bio ||
              'I am a computer science student at REVA University focusing on competitive programming and real-time backend systems. My core practice is on LeetCode (1767 contest rating, top 9.97%), backed by practical engineering with WebSockets, Node.js, and agentic workflows.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs flex-shrink-0">
          <a
            href={profile?.links?.resumePdf || '/resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            download="Aayush_Raj_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </a>

          <a
            href={profile?.links?.github || 'https://github.com/raj-aayush01'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text-main hover:border-text-main transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={`mailto:${profile?.email || 'aayushraj065@gmail.com'}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text-main hover:border-text-main transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>
      </section>

      {/* 2. Primary Analytics Row: Wide Rating Chart + Recent Contests Timeline */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-8">
          <RatingChart
            leetcodeContests={lcContests}
            codechefContests={ccContests}
          />
        </div>
        <div className="xl:col-span-4">
          <RecentContests
            contests={stats?.recentContests || []}
            onNavigateContests={() => onNavigate('contests')}
          />
        </div>
      </section>

      {/* 3. Four Stat Cards Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={Code2}
          value={stats?.totalProblemsSolved || 508}
          label="Problems Solved"
          subLabel="Total Verified"
          subValue="500+ across LC & GFG"
        />

        <StatCard
          icon={Trophy}
          value={stats?.totalContestsAttended || 34}
          label="Contests Participated"
          subLabel="Primary Arena"
          subValue="LeetCode Rated (34 Rounds)"
        />

        <StatCard
          icon={TrendingUp}
          value={stats?.peakRating?.rating || 1767}
          label="Peak Rating"
          subLabel="Platform Peak"
          subValue={`${stats?.peakRating?.platform || 'LeetCode'} (Top 9.97%)`}
          delta={{
            value: `+${stats?.maxRatingIncrease?.delta || 61}`,
            positive: true,
          }}
        />

        <StatCard
          icon={Flame}
          value={problemsData?.leetcode?.maxStreak || 35}
          label="Day Max Streak"
          subLabel="Annual Submissions"
          subValue={`${Number(problemsData?.leetcode?.yearlySubmissions || 1787).toLocaleString()} Submissions`}
        />
      </section>

      {/* 4. Secondary Analytics Row: Solved by Topic + Problem Sources Donut */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        <div className="xl:col-span-7">
          <TopicBars
            topics={tagTopics}
            onNavigateProblems={() => onNavigate('problems')}
          />
        </div>
        <div className="xl:col-span-5">
          <SourceDonut sources={stats?.sources || []} />
        </div>
      </section>

      {/* 5. Featured Projects Summary Strip (ChatX FIRST, Reclaim-AI SECOND) */}
      <section className="dashboard-card p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-border/80 mb-5">
          <div>
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block">
              // VERIFIED BUILDS
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-sans text-text-main">
              Featured Systems & Applications
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono font-medium text-accent hover:text-accent-hover inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projects || []).map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-xl border border-border bg-surface-subtle/50 hover:border-text-muted/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-accent">
                    #0{p.order}
                  </span>
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-text-muted hover:text-text-main inline-flex items-center gap-1"
                  >
                    <span>repo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="text-base font-bold text-text-main font-sans">
                  {p.title}
                </h3>
                <p className="text-xs font-medium text-text-muted mt-0.5 font-sans">
                  {p.tagline}
                </p>
                <p className="text-xs text-text-muted/90 mt-2 font-sans line-clamp-2">
                  {p.overview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-text-main"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="text-xs font-mono text-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Read full engineering case study &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
