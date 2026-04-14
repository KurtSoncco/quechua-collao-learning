export interface PlayerStats {
  xp: number;
  level: number;
  streak: number;
  lastPlayedDate: string;
  totalCorrect: number;
  totalAnswered: number;
  badges: string[];
  personalBest: number; // highest % score
}

const DEFAULT_STATS: PlayerStats = {
  xp: 0,
  level: 1,
  streak: 0,
  lastPlayedDate: '',
  totalCorrect: 0,
  totalAnswered: 0,
  badges: [],
  personalBest: 0,
};

const KEY = 'quechua_player_stats';

export function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveStats(stats: PlayerStats): void {
  localStorage.setItem(KEY, JSON.stringify(stats));
}

export function updateStreak(stats: PlayerStats): PlayerStats {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let streak = stats.streak;
  if (stats.lastPlayedDate === today) {
    // already played today, no change
  } else if (stats.lastPlayedDate === yesterday) {
    streak += 1;
  } else {
    streak = 1;
  }
  return { ...stats, streak, lastPlayedDate: today };
}
