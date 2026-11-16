import React from 'react';

const TABS = [
  { id: 'overview', name: 'Overview' },
  { id: 'contests', name: 'Contests' },
  { id: 'problems', name: 'Problems' },
  { id: 'projects', name: 'Projects' },
  { id: 'about', name: 'About' },
];

export default function Tabs({ activeTab, onSelectTab }) {
  return (
    <nav
      className="w-full bg-[#FAF9F7] border-b border-border sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
      aria-label="Portfolio Navigation Tabs"
    >
      <div className="dashboard-container">
        <div className="flex items-center space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar py-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-text-main font-semibold'
                    : 'text-text-muted hover:text-text-main'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{tab.name}</span>

                {isActive ? (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full transition-all"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
