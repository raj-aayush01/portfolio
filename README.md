# Aayush Raj — Developer Portfolio (MERN Stack)

A clean, high-performance developer portfolio built on a clean **MERN architecture** with a full-width dashboard layout.

---

## 📂 Architecture

```text
Portfolio/
├── backend/                  # Node.js + Express REST API Server (Port 5000)
│   ├── server.js             # API endpoints (/api/profile, /api/stats, /api/contests, etc.)
│   ├── package.json          # Express, CORS, Dotenv
│   └── data/                 # Raw JSON store & snapshots
│       ├── leetcode.json     # All 34 real LeetCode contests (with exact dip & rise)
│       ├── codechef.json     # CodeChef contest history
│       ├── gfg.json          # GeeksforGeeks metrics
│       ├── profile.json      # Bio, education, skills, socials
│       ├── projects.json     # ChatX (#1) and Reclaim-AI (#2) case studies
│       ├── achievements.json # Merged Node.js PR #97 proof, badges
│       └── notable-problems.json # Algorithmic solves with 2-line approaches
└── frontend/                 # React 18 + Vite + Tailwind CSS (Port 3000)
    ├── vite.config.js        # Vite config with API proxy to Express backend
    ├── index.html            # HTML entry point with Space Grotesk + IBM Plex Mono fonts
    ├── public/
    │   ├── resume.pdf        # Recruiter download PDF
    │   └── favicon.svg       # Dashboard SVG icon
    └── src/
        ├── App.jsx           # Main state, tab switcher, API loader
        ├── index.css         # Full-width fluid container styling
        ├── components/       # Header, Tabs, RatingChart, RecentContests, TopicBars, etc.
        ├── pages/            # Overview, Contests, Problems, Projects, About
        └── services/api.js   # Fetch client to Express backend
```

---

## 🚀 How to Run Locally

### 1. Start the Express Backend
In a terminal:
```bash
cd backend
npm start
```
*Backend runs on: **http://localhost:5000***

### 2. Start the React Frontend
In a second terminal:
```bash
cd frontend
npm run dev
```
*Frontend runs on: **http://localhost:3000***

---

## 📊 Key Highlights
- **Full Fluid Width**: The layout expands smoothly to fill wide screens (`max-w-[1720px]` fluid container) with comfortable padding, eliminating boxed margins.
- **Real LeetCode Data (34 Rounds)**: Includes your exact historical rating curve fetched from LeetCode GraphQL, including the dip in Weekly Contest 521 (1,585) and the steep rise up to 1,767 in Weekly Contest 526!
- **Projects in Order**: **ChatX** (#1) and **Reclaim-AI** (#2) with detailed engineering case studies.
- **Node.js Official Contribution**: Verified proof link to merged PR [#97](https://github.com/nodejs/learn/pull/97) in the Node.js documentation.
