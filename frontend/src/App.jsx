import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Contests from './pages/Contests';
import Problems from './pages/Problems';
import Projects from './pages/Projects';
import About from './pages/About';

import {
  fetchProfile,
  fetchStats,
  fetchContests,
  fetchProblems,
  fetchProjects,
  fetchAchievements,
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [contestsData, setContestsData] = useState(null);
  const [problemsData, setProblemsData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [prof, st, ct, pr, pj, ach] = await Promise.all([
          fetchProfile().catch(() => null),
          fetchStats().catch(() => null),
          fetchContests().catch(() => null),
          fetchProblems().catch(() => null),
          fetchProjects().catch(() => []),
          fetchAchievements().catch(() => []),
        ]);

        setProfile(prof);
        setStats(st);
        setContestsData(ct);
        setProblemsData(pr);
        setProjects(pj);
        setAchievements(ach);
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, []);

  // Scroll to top on tab change
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-fetch live data after sync
  const handleSyncComplete = async () => {
    try {
      const [st, ct] = await Promise.all([
        fetchStats().catch(() => null),
        fetchContests().catch(() => null),
      ]);
      if (st) setStats(st);
      if (ct) setContestsData(ct);
    } catch (err) {
      console.error('Post-sync refresh error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header profile={profile} stats={stats} onSyncComplete={handleSyncComplete} />
      <Tabs activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main className="flex-1 w-full dashboard-container py-8 sm:py-10">
        {loading ? (
          <div className="w-full py-24 flex flex-col items-center justify-center font-mono text-xs text-text-muted">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3"></div>
            <span>Connecting to Express Backend & Fetching Real LeetCode Data...</span>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <Overview
                profile={profile}
                stats={stats}
                contestsData={contestsData}
                problemsData={problemsData}
                projects={projects}
                onNavigate={handleSelectTab}
              />
            )}
            {activeTab === 'contests' && <Contests contestsData={contestsData} />}
            {activeTab === 'problems' && <Problems problemsData={problemsData} />}
            {activeTab === 'projects' && <Projects projects={projects} />}
            {activeTab === 'about' && (
              <About profile={profile} achievements={achievements} />
            )}
          </>
        )}
      </main>

      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
