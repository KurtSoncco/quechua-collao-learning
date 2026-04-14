import React from 'react';
import { getLevelInfo } from '../utils/gamification';
import type { PlayerStats } from '../utils/storage';

interface Props {
  stats: PlayerStats;
}

const GamificationBar: React.FC<Props> = ({ stats }) => {
  const { current, next, progress } = getLevelInfo(stats.xp);

  return (
    <div className="gam-bar">
      <div className="gam-stat">
        <span className="icon">🔥</span>
        <span>{stats.streak}d</span>
      </div>

      <div className="gam-stat">
        <span className="icon">⭐</span>
        <span>{stats.xp} XP</span>
      </div>

      <div className="gam-stat">
        <span className="icon">🏅</span>
        <span>{stats.badges.length}</span>
      </div>

      <div className="gam-level">
        <div className="gam-level-name">
          <span>{current.name} · Lv.{current.level}</span>
          {next && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{progress}%</span>}
        </div>
        <div className="gam-xp-bar">
          <div className="gam-xp-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default GamificationBar;
