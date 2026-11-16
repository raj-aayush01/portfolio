import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  FileText,
  Mail,
  MapPin,
  GraduationCap,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import PhotoSlot from './PhotoSlot';

export default function Header({ profile, stats, onSyncComplete }) {
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('Syncing...');
    try {
      const res = await fetch('/api/sync');
      const data = await res.json();
      if (data.success) {
        setSyncMsg('Updated!');
        if (onSyncComplete) onSyncComplete();
      } else {
        setSyncMsg('Failed');
      }
    } catch {
      setSyncMsg('Error');
    } finally {
      setTimeout(() => {
        setSyncing(false);
        setSyncMsg('');
      }, 2500);
    }
  };
  const lcRating = '1,767';
  const ccRating = '1,271';
  const gfgScore = '504';

  return (
    <header className="w-full bg-[#FAF9F7] border-b border-border pt-6 pb-5">
      <div className="dashboard-container">
        {/* Top Row: Identity & Right Meta */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-5 border-b border-border/60">
          {/* Identity Block */}
          <div className="flex items-start gap-4">
            <PhotoSlot size="lg" className="border-border shadow-sm" />
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main font-sans">
                  Aayush Raj
                </h1>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent-border">
                  Available for SWE Roles
                </span>
              </div>
              <p className="text-sm font-medium text-text-muted mt-0.5">
                Competitive Programmer & Full-Stack Developer
              </p>
              <p className="text-xs sm:text-sm text-text-muted/90 max-w-2xl mt-1.5 italic font-sans">
                &ldquo;I solve problems on LeetCode and build real-time systems that hold up in production.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Meta Block: Location, Education, Quick Links */}
          <div className="flex flex-col lg:items-end gap-3 text-xs text-text-muted">
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4">
              <span className="inline-flex items-center gap-1.5 font-medium text-text-main">
                <GraduationCap className="w-4 h-4 text-text-muted" />
                B.Tech CSE · REVA University · 2027
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                Bengaluru, India
              </span>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono">
              <a
                href="https://github.com/raj-aayush01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-surface hover:border-text-main text-text-main transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rajaayush01/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-surface hover:border-text-main text-text-main transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Aayush_Raj_Resume.pdf"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-accent bg-accent text-white hover:bg-accent-hover transition-colors font-semibold"
                aria-label="Download Resume PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <a
                href="mailto:aayushraj065@gmail.com"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-surface hover:border-text-main text-text-main transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>

              {/* Sync Button */}
              <button
                onClick={handleSync}
                disabled={syncing}
                title="Sync live LeetCode data from API"
                aria-label="Sync LeetCode data"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-surface hover:border-text-main text-text-muted hover:text-text-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncMsg || 'Sync'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Platform Stat Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* LeetCode Badge (PRIMARY, highlighted most) */}
          <a
            href="https://leetcode.com/u/raj_aayush01/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block dashboard-card p-3.5 border-l-4 border-l-accent hover:border-accent transition-all"
            aria-label="LeetCode Profile"
          >
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-1">
              <span className="font-semibold text-text-main flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
                LeetCode
              </span>
              <span className="text-[11px] text-accent font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                raj_aayush01 <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
                  {lcRating}
                </span>
                <span className="text-xs text-text-muted ml-1.5 font-mono">Rating</span>
              </div>
              <div className="text-right text-[11px] font-mono text-text-muted">
                <span className="text-accent font-medium">Top 9.97%</span> · 34 Contests
              </div>
            </div>
          </a>

          {/* CodeChef Badge (SECONDARY) */}
          <a
            href="https://www.codechef.com/users/raj_aayush01"
            target="_blank"
            rel="noopener noreferrer"
            className="group block dashboard-card p-3.5 hover:border-text-muted transition-all"
            aria-label="CodeChef Profile"
          >
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-1">
              <span className="font-semibold text-text-main flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                CodeChef
              </span>
              <span className="text-[11px] text-text-muted group-hover:text-text-main group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                raj_aayush01 <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
                  {ccRating}
                </span>
                <span className="text-xs text-text-muted ml-1.5 font-mono">Rating</span>
              </div>
              <div className="text-right text-[11px] font-mono text-text-muted">
                <span>1★ (Div 4)</span> · Peak: 1,271
              </div>
            </div>
          </a>

          {/* GeeksforGeeks Badge (SUPPORTING) */}
          <a
            href="https://www.geeksforgeeks.org/profile/raj_aayush01"
            target="_blank"
            rel="noopener noreferrer"
            className="group block dashboard-card p-3.5 hover:border-text-muted transition-all"
            aria-label="GeeksforGeeks Profile"
          >
            <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-1">
              <span className="font-semibold text-text-main flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                GeeksforGeeks
              </span>
              <span className="text-[11px] text-text-muted group-hover:text-text-main group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                raj_aayush01 <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-text-main tabular-nums">
                  {gfgScore}
                </span>
                <span className="text-xs text-text-muted ml-1.5 font-mono">Score</span>
              </div>
              <div className="text-right text-[11px] font-mono text-text-muted">
                <span>121 Solved</span> · Rank #41 REVA
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
