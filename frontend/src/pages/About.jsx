import React from 'react';
import {
  GraduationCap,
  Award,
  Layers,
  FileText,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Users,
} from 'lucide-react';
import PhotoSlot from '../components/PhotoSlot';

export default function About({ profile, achievements = [] }) {
  const education = profile?.education || [];
  const skills = profile?.skills || [];
  const clubRole = profile?.clubRole || {};

  return (
    <div className="space-y-12">
      {/* 1. Bio & Narrative Section */}
      <section className="dashboard-card p-6 sm:p-8 bg-surface">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <PhotoSlot size="lg" className="border-border shadow-sm flex-shrink-0" />
          <div className="space-y-3 max-w-4xl">
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block">
              // FIRST-PERSON BIOGRAPHY
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-main">
              Aayush Raj
            </h1>
            <p className="text-xs font-mono text-text-muted">
              Bengaluru, India · B.Tech CSE (REVA University, Class of 2027)
            </p>
            <p className="text-sm sm:text-base font-sans text-text-main leading-relaxed pt-1">
              I am a competitive programmer and full-stack software developer who believes that writing reliable software starts with mastering algorithmic fundamentals. My days are spent dissecting data structure complexities on LeetCode and architecting deterministic, real-time backend systems.
            </p>
            <p className="text-sm font-sans text-text-muted leading-relaxed">
              Whether building low-latency WebSocket protocols in Node.js or establishing strict validation guards around agentic AI models with Gemini, I focus on software that stays responsive under heavy concurrency and never fails silently.
            </p>

            {/* Resume & Connect Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
              <a
                href={profile?.links?.resumePdf || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                download="Aayush_Raj_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={profile?.links?.resumeDriveFallback || 'https://drive.google.com/file/d/165LD8uZ65bp3cfwp6f7IdTfljAL_M2u9/view?usp=sharing'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text-muted hover:text-text-main hover:border-text-main transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Drive Mirror</span>
              </a>

              <a
                href={profile?.links?.linkedin || 'https://www.linkedin.com/in/rajaayush01/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text-main hover:border-text-main transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${profile?.email || 'aayushraj065@gmail.com'}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-text-main hover:border-text-main transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile?.email || 'aayushraj065@gmail.com'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Education Credentials */}
      <section className="dashboard-card p-6 sm:p-8">
        <div className="flex items-center gap-2 pb-4 border-b border-border/80 mb-6">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold font-sans text-text-main">
            Education & Coursework
          </h2>
        </div>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-border bg-surface-subtle/30 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-bold font-sans text-text-main">
                  {edu.degree}
                </h3>
                <span className="text-xs font-mono font-semibold text-accent">
                  {edu.period}
                </span>
              </div>

              <div className="text-xs font-mono text-text-muted flex items-center justify-between">
                <span>{edu.institution} · {edu.location}</span>
                {edu.cgpa ? (
                  <span className="font-bold text-text-main px-2.5 py-0.5 rounded bg-surface border border-border">
                    CGPA: {edu.cgpa}
                  </span>
                ) : edu.score ? (
                  <span className="font-bold text-text-main px-2.5 py-0.5 rounded bg-surface border border-border">
                    Score: {edu.score}
                  </span>
                ) : null}
              </div>

              {edu.coursework && edu.coursework.length > 0 ? (
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-text-muted block mb-1">
                    Relevant Coursework:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border/80 text-text-main"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Technical Skills Grouping */}
      <section className="dashboard-card p-6 sm:p-8">
        <div className="flex items-center gap-2 pb-4 border-b border-border/80 mb-6">
          <Layers className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold font-sans text-text-main">
            Technical Skills Arsenal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-xl border border-border bg-surface-subtle/40"
            >
              <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2.5">
                // {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-text-main font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verified Achievements & Open Source Contribution */}
      <section className="dashboard-card p-6 sm:p-8">
        <div className="flex items-center gap-2 pb-4 border-b border-border/80 mb-6">
          <Award className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold font-sans text-text-main">
            Verified Achievements & Open Source
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-1.5">
                  <span className="font-semibold text-accent">{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold font-sans text-text-main">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-xs font-sans text-text-muted/90 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.proofUrl ? (
                <div className="pt-3 mt-3 border-t border-border/60">
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>View Official Proof / PR</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Campus Leadership: DevTrack */}
      <section className="dashboard-card p-6 sm:p-8 bg-surface">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-xl bg-accent-subtle text-accent border border-accent-border flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block">
              // CAMPUS LEADERSHIP & COMMUNITY
            </span>
            <h2 className="text-lg font-bold font-sans text-text-main">
              {clubRole.title || 'Core Member'} — {clubRole.club || 'DevTrack'}
            </h2>
            <p className="text-xs font-mono text-text-muted">
              {clubRole.institution || 'REVA University Technical Club'}
            </p>
            <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed pt-2">
              {clubRole.summary ||
                'Organized developer workshops, conducted hands-on technical sessions, and mentored 50+ students in web development and algorithmic programming fundamentals.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
