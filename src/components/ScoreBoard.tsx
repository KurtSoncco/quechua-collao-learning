import React, { useState } from 'react';
import { ALL_BADGES } from '../utils/gamification';

interface Props {
  score: number;
  total: number;
  answers: any[];
  xpEarned: number;
  newBadges: string[];
  onRestart: () => void;
}

const ScoreBoard: React.FC<Props> = ({ score, total, answers, xpEarned, newBadges, onRestart }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getMessage = () => {
    if (percentage === 100) return 'Sumaq! Perfect score!';
    if (percentage >= 80) return 'Allinmi! Great job!';
    if (percentage >= 60) return 'Allillanmi. Keep practicing!';
    return 'Kallpachakuy! Keep going!';
  };

  return (
    <div className="card scoreboard">
      <h2 className="exercise-title">{getMessage()}</h2>

      <div className="score-ring-wrap">
        <div className="score-value">{percentage}%</div>
        <div className="score-sub">{score} / {total} correct</div>
        {xpEarned > 0 && (
          <div className="xp-earned">
            <span>+{xpEarned} XP</span>
          </div>
        )}
      </div>

      {newBadges.length > 0 && (
        <div>
          <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
            New badges unlocked!
          </div>
          <div className="badges-row">
            {newBadges.map(id => {
              const badge = ALL_BADGES.find(b => b.id === id);
              if (!badge) return null;
              return (
                <div key={id} className="badge-chip">
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                  <span className="new-badge-label">new</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <button className="btn-secondary" onClick={() => setShowAnswers(!showAnswers)}>
          {showAnswers ? 'Hide Review' : 'Review Answers'}
        </button>
        <button className="btn-primary" onClick={onRestart}>
          Play Again
        </button>
      </div>

      {showAnswers && (
        <div className="answers-list">
          {answers.map((ans, i) => (
            <div key={i} className={`answer-item ${ans.isCorrect ? 'correct-item' : 'wrong-item'}`}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ans.question}</p>
              <p>
                Your answer:{' '}
                <strong style={{ color: ans.isCorrect ? 'var(--success)' : 'var(--error)' }}>
                  {ans.user || '(empty)'}
                </strong>
              </p>
              {!ans.isCorrect && (
                <p>Correct: <strong style={{ color: 'var(--success)' }}>{ans.correct}</strong></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
