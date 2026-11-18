const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchContests() {
  const res = await fetch(`${API_BASE}/contests`);
  if (!res.ok) throw new Error('Failed to fetch contests');
  return res.json();
}

export async function fetchProblems() {
  const res = await fetch(`${API_BASE}/problems`);
  if (!res.ok) throw new Error('Failed to fetch problems');
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchAchievements() {
  const res = await fetch(`${API_BASE}/achievements`);
  if (!res.ok) throw new Error('Failed to fetch achievements');
  return res.json();
}
