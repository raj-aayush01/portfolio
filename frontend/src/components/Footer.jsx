import React from 'react';

export default function Footer({ onSelectTab }) {
  return (
    <footer className="w-full bg-[#FAF9F7] border-t border-border mt-20 py-8 text-xs text-text-muted font-mono">
      <div className="dashboard-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-delta-positive inline-block" aria-hidden="true"></span>
          <span>MERN Architecture: Express API + React Client · Real LeetCode Data (34 Contests)</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onSelectTab('about')}
            className="hover:text-text-main transition-colors cursor-pointer"
          >
            About
          </button>
          <a
            href="https://github.com/raj-aayush01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-main transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://leetcode.com/u/raj_aayush01/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-main transition-colors"
          >
            LeetCode
          </a>
          <span>&copy; {new Date().getFullYear()} Aayush Raj</span>
        </div>
      </div>
    </footer>
  );
}
