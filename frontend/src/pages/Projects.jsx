
import React from 'react';
import {
  Github,
  ExternalLink,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export default function Projects({ projects = [] }) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider block mb-1">
          // PRODUCTION BUILDS & ARCHITECTURE
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold font-sans text-text-main">
          Systems & Case Studies
        </h1>

        <p className="text-sm text-text-muted mt-1 font-sans max-w-4xl">
          Real-world applications built with strict adherence to latency budgets,
          distributed state synchronization, and deterministic backend boundaries.
        </p>
      </div>

      {/* Case Study Cards */}
      <div className="space-y-10">
        {projects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="dashboard-card p-6 sm:p-8 bg-surface border border-border"
          >
            {/* Top Bar: Order ID, Title, Action Links */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-accent-subtle text-accent border border-accent-border">
                    CASE STUDY #0{project.order}
                  </span>

                  <span className="text-xs font-mono text-text-muted">
                    {project.id === 'chatx'
                      ? 'Primary Real-Time System'
                      : 'Agentic AI Platform'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-text-main">
                  {project.title}
                </h2>

                <p className="text-sm sm:text-base font-medium text-text-muted mt-1">
                  {project.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs flex-shrink-0">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-text-main hover:border-text-main transition-colors font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>

                {project.liveDemoUrl ? (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Project Images */}
            <div className="mt-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {(project.images || []).map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-video rounded-xl overflow-hidden border border-border bg-surface-subtle"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';

                      e.currentTarget.nextElementSibling.classList.remove(
                        'hidden'
                      );
                    }}
                  />

                  {/* Image Fallback */}
                  <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-sm font-semibold text-text-main">
                      Image unavailable
                    </span>

                    <span className="text-xs text-text-muted mt-1">
                      {image.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Overview & Contributions */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                    // SYSTEM OVERVIEW & OBJECTIVE
                  </h3>

                  <p className="text-sm font-sans text-text-main leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-3">
                    // KEY CONTRIBUTIONS & DELIVERABLES
                  </h3>

                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                    {(project.contributions || []).map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />

                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Stack & Key Architectural Decision */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 rounded-xl border border-border bg-surface-subtle/40">
                  <h3 className="text-xs font-mono font-bold text-text-main uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-accent" />

                    <span>Technology Stack</span>
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {(project.stack || []).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-text-main"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-accent-border bg-accent-subtle/40">
                  <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                    // KEY ENGINEERING DECISION
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed">
                    {project.keyEngineeringDecision}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
