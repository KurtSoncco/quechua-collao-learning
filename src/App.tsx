import { useState, useEffect } from 'react';
import './App.css';
import MatchingExercise from './components/MatchingExercise';
import ConjugationExercise from './components/ConjugationExercise';
import TranslationExercise from './components/TranslationExercise';
import ScoreBoard from './components/ScoreBoard';
import ReviewSection from './components/ReviewSection';
import GamificationBar from './components/GamificationBar';
import { loadStats, saveStats, updateStreak } from './utils/storage';
import { calculateXP, checkBadges, getLevelInfo, ALL_BADGES } from './utils/gamification';
import type { PlayerStats } from './utils/storage';

type Screen = 'intro' | 'matching' | 'conjugation' | 'translation' | 'score' | 'study';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [totalScore, setTotalScore] = useState(0);
  const [totalPossible, setTotalPossible] = useState(0);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [stats, setStats] = useState<PlayerStats>(() => loadStats());
  const [sessionXP, setSessionXP] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    const updated = updateStreak(stats);
    setStats(updated);
    saveStats(updated);
  }, []);

  const handleComplete = (score: number, total: number, answers: any[]) => {
    const newTotalScore = totalScore + score;
    const newTotalPossible = totalPossible + total;

    setTotalScore(newTotalScore);
    setTotalPossible(newTotalPossible);
    setAllAnswers(prev => [...prev, ...answers]);

    const newCombo = score === total ? combo + 1 : 0;
    setCombo(newCombo);

    const xp = calculateXP(score, total, newCombo);
    setSessionXP(prev => prev + xp);

    const updatedStats: PlayerStats = {
      ...stats,
      xp: stats.xp + xp,
      totalCorrect: stats.totalCorrect + score,
      totalAnswered: stats.totalAnswered + total,
      personalBest: Math.max(stats.personalBest, total > 0 ? Math.round((newTotalScore / newTotalPossible) * 100) : 0),
      level: getLevelInfo(stats.xp + xp).current.level,
    };

    const earned = checkBadges(updatedStats);
    if (earned.length > 0) {
      updatedStats.badges = [...updatedStats.badges, ...earned];
      setNewBadges(earned);
    }

    setStats(updatedStats);
    saveStats(updatedStats);

    if (currentScreen === 'matching') setCurrentScreen('conjugation');
    else if (currentScreen === 'conjugation') setCurrentScreen('translation');
    else if (currentScreen === 'translation') setCurrentScreen('score');
  };

  const handleRestart = () => {
    setTotalScore(0);
    setTotalPossible(0);
    setAllAnswers([]);
    setSessionXP(0);
    setNewBadges([]);
    setCombo(0);
    setCurrentScreen('intro');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Yachasun Quechua</h1>
        <p className="subtitle">Master Quechua Collao verbs — one lesson at a time</p>
      </header>

      {currentScreen !== 'study' && <GamificationBar stats={stats} />}

      <main>
        {currentScreen === 'intro' && (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 className="exercise-title">Ready to practice?</h2>
            <p className="intro-desc">
              Three exercises in sequence: Matching, Conjugation, then Paragraph fill-in-the-blank.
              Earn XP, build streaks, and unlock badges.
            </p>
            <div className="intro-actions">
              <button className="btn-primary" style={{ fontSize: '1.05rem' }} onClick={() => setCurrentScreen('matching')}>
                Start Learning
              </button>
              <button className="btn-secondary" onClick={() => setCurrentScreen('study')}>
                Review Verbs & Grammar
              </button>
            </div>

            {stats.badges.length > 0 && (
              <div style={{ marginTop: '1.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Badges
                </div>
                <div className="badges-row" style={{ justifyContent: 'center' }}>
                  {stats.badges.map(id => {
                    const badge = ALL_BADGES.find(b => b.id === id);
                    return badge ? (
                      <div key={id} className="badge-chip">
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {currentScreen === 'study' && (
          <>
            <button className="btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => setCurrentScreen('intro')}>
              ← Back to Home
            </button>
            <ReviewSection />
          </>
        )}

        {currentScreen === 'matching' && <MatchingExercise onComplete={handleComplete} />}
        {currentScreen === 'conjugation' && <ConjugationExercise onComplete={handleComplete} />}
        {currentScreen === 'translation' && <TranslationExercise onComplete={handleComplete} />}

        {currentScreen === 'score' && (
          <ScoreBoard
            score={totalScore}
            total={totalPossible}
            answers={allAnswers}
            xpEarned={sessionXP}
            newBadges={newBadges}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
