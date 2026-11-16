const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to safely read JSON data files
function loadData(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return null;
  }
}

const { syncLeetCodeData } = require('./sync');

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1b. Live Sync Endpoint
app.get('/api/sync', async (req, res) => {
  try {
    const updated = await syncLeetCodeData();
    res.json({ success: true, message: 'Synced with LeetCode live API', contestsCount: updated.contests.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Profile & Identity
app.get('/api/profile', (req, res) => {
  const profile = loadData('profile.json');
  if (!profile) return res.status(500).json({ error: 'Failed to load profile' });
  res.json(profile);
});

// 3. Projects (ChatX FIRST, Reclaim-AI SECOND)
app.get('/api/projects', (req, res) => {
  const projects = loadData('projects.json') || [];
  projects.sort((a, b) => a.order - b.order);
  res.json(projects);
});

// 4. Combined Stats for Dashboard Overview
app.get('/api/stats', (req, res) => {
  const lc = loadData('leetcode.json') || { problemsSolved: { total: 387 }, contests: [] };
  const cc = loadData('codechef.json') || { rating: 1271, highestRating: 1271, contests: [] };
  const gfg = loadData('gfg.json') || { problemsSolved: 121 };

  const totalProblemsSolved = lc.problemsSolved.total + gfg.problemsSolved;
  const totalContestsAttended = lc.contestsAttended || lc.contests.length;

  const peakRating = {
    rating: Math.max(lc.contestRating || 1767, cc.highestRating || 1271),
    platform: (lc.contestRating || 1767) >= (cc.highestRating || 1271) ? 'LeetCode' : 'CodeChef',
  };

  // Combine and sort contests chronologically descending for recent timeline
  const allContests = [...(lc.contests || []), ...(cc.contests || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let bestRank = { rank: 999999, contestName: 'Biweekly Contest 194', platform: 'LeetCode' };
  let maxGain = { delta: 0, contestName: 'Starters 153', platform: 'CodeChef' };

  allContests.forEach((c) => {
    if (c.rank > 0 && c.rank < bestRank.rank) {
      bestRank = { rank: c.rank, contestName: c.contestName, platform: c.platform };
    }
    if (c.ratingChange > maxGain.delta) {
      maxGain = { delta: c.ratingChange, contestName: c.contestName, platform: c.platform };
    }
  });

  res.json({
    totalProblemsSolved,
    totalContestsAttended,
    peakRating,
    bestRank,
    maxRatingIncrease: maxGain,
    recentContests: allContests.slice(0, 5),
    sources: [
      { name: 'LeetCode', value: lc.problemsSolved.total, color: '#F28C28' },
      { name: 'GeeksforGeeks', value: gfg.problemsSolved, color: '#10B981' },
      { name: 'CodeChef', value: 0, color: '#D97706' },
    ].filter(s => s.value > 0),
  });
});

// 5. Contests (Full LeetCode 34 real contests + CodeChef)
app.get('/api/contests', (req, res) => {
  const lc = loadData('leetcode.json') || {};
  const cc = loadData('codechef.json') || {};

  res.json({
    leetcode: {
      handle: lc.handle,
      rating: lc.contestRating,
      globalRank: lc.globalRanking,
      totalContestants: lc.totalContestants,
      topPercentage: lc.topPercentage,
      contestsAttended: lc.contestsAttended,
      badges: lc.badges || [],
      contests: lc.contests || [],
    },
    codechef: {
      handle: cc.handle,
      rating: cc.rating,
      stars: cc.stars,
      division: cc.division,
      highestRating: cc.highestRating,
      globalRank: cc.globalRank,
      countryRank: cc.countryRank,
      contests: cc.contests || [],
    },
    highlights: {
      bestRank: '#1,410 (Biweekly Contest 194)',
      maxGain: '+61 pts (CC Starters 153)',
      winStreak: '6 consecutive rounds',
      bestAccuracy: '3 / 4 Solved',
    },
  });
});

// 6. Problems Practice Data
app.get('/api/problems', (req, res) => {
  const lc = loadData('leetcode.json') || {};
  const gfg = loadData('gfg.json') || {};
  const notable = loadData('notable-problems.json') || [];

  res.json({
    leetcode: {
      problemsSolved: lc.problemsSolved || {},
      activeDays: lc.activeDays || 208,
      maxStreak: lc.maxStreak || 35,
      yearlySubmissions: lc.yearlySubmissions || 1787,
      languages: lc.languages || [],
      tagProblemCounts: lc.tagProblemCounts || [],
    },
    gfg: {
      codingScore: gfg.codingScore || 504,
      problemsSolved: gfg.problemsSolved || 121,
      instituteRank: gfg.instituteRank || 41,
    },
    notableProblems: notable,
  });
});

// 7. Achievements
app.get('/api/achievements', (req, res) => {
  const achievements = loadData('achievements.json') || [];
  res.json(achievements);
});

app.listen(PORT, () => {
  console.log(`Portfolio Express Backend listening on http://localhost:${PORT}`);
});
