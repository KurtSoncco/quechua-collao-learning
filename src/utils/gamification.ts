import type { PlayerStats } from './storage';

export const XP_PER_CORRECT = 10;
export const XP_COMBO_BONUS = 5;

export const LEVELS = [
  { level: 1, name: 'Qallariq', label: 'Beginner', minXP: 0 },
  { level: 2, name: 'Yachaqkuna', label: 'Learner', minXP: 100 },
  { level: 3, name: 'Rimaqkuna', label: 'Speaker', minXP: 250 },
  { level: 4, name: 'Yachachiq', label: 'Teacher', minXP: 500 },
  { level: 5, name: 'Amauta', label: 'Master', minXP: 1000 },
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ALL_BADGES: Badge[] = [
  { id: 'first_match', name: 'First Match', description: 'Complete your first matching exercise', icon: '🎯' },
  { id: 'perfect_score', name: 'Sumaq!', description: 'Get 100% on any exercise session', icon: '⭐' },
  { id: 'streak_3', name: 'Kawsaq', description: 'Maintain a 3-day streak', icon: '🔥' },
  { id: 'streak_7', name: 'Wiñay Kawsaq', description: 'Maintain a 7-day streak', icon: '🌟' },
  { id: 'xp_100', name: 'Yachaqkuna', description: 'Earn 100 XP', icon: '📚' },
  { id: 'xp_500', name: 'Hatun Yachaq', description: 'Earn 500 XP', icon: '🏆' },
  { id: 'correct_50', name: 'Allin Rimaq', description: 'Answer 50 questions correctly', icon: '✅' },
  { id: 'correct_200', name: 'Amauta', description: 'Answer 200 questions correctly', icon: '🦅' },
];

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null!;
      break;
    }
  }
  const progressXP = next ? xp - current.minXP : current.minXP;
  const rangeXP = next ? next.minXP - current.minXP : 1;
  const progress = Math.min(100, Math.round((progressXP / rangeXP) * 100));
  return { current, next, progress };
}

export function calculateXP(score: number, total: number, combo: number): number {
  const base = score * XP_PER_CORRECT;
  const comboBonus = Math.max(0, combo - 1) * XP_COMBO_BONUS;
  const perfectBonus = score === total ? 20 : 0;
  return base + comboBonus + perfectBonus;
}

export function checkBadges(stats: PlayerStats): string[] {
  const earned: string[] = [];
  if (stats.totalAnswered >= 1 && !stats.badges.includes('first_match')) earned.push('first_match');
  if (stats.personalBest >= 100 && !stats.badges.includes('perfect_score')) earned.push('perfect_score');
  if (stats.streak >= 3 && !stats.badges.includes('streak_3')) earned.push('streak_3');
  if (stats.streak >= 7 && !stats.badges.includes('streak_7')) earned.push('streak_7');
  if (stats.xp >= 100 && !stats.badges.includes('xp_100')) earned.push('xp_100');
  if (stats.xp >= 500 && !stats.badges.includes('xp_500')) earned.push('xp_500');
  if (stats.totalCorrect >= 50 && !stats.badges.includes('correct_50')) earned.push('correct_50');
  if (stats.totalCorrect >= 200 && !stats.badges.includes('correct_200')) earned.push('correct_200');
  return earned;
}
