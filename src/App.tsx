import { useState } from 'react';
import './App.css';
import MatchingExercise from './components/MatchingExercise';
import ConjugationExercise from './components/ConjugationExercise';
import TranslationExercise from './components/TranslationExercise';
import ScoreBoard from './components/ScoreBoard';
import ReviewSection from './components/ReviewSection';

type Screen = 'intro' | 'matching' | 'conjugation' | 'translation' | 'score' | 'study';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [totalScore, setTotalScore] = useState(0);
  const [totalPossible, setTotalPossible] = useState(0);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);

  const handleComplete = (score: number, total: number, answers: any[]) => {
    setTotalScore(prev => prev + score);
    setTotalPossible(prev => prev + total);
    setAllAnswers(prev => [...prev, ...answers]);

    if (currentScreen === 'matching') setCurrentScreen('conjugation');
    else if (currentScreen === 'conjugation') setCurrentScreen('translation');
    else if (currentScreen === 'translation') setCurrentScreen('score');
  };

  const handleRestart = () => {
    setTotalScore(0);
    setTotalPossible(0);
    setAllAnswers([]);
    setCurrentScreen('intro');
  };

  return (
    <div className="app-container">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>

      <header>
        <h1>Yachasun Quechua</h1>
        <p className="subtitle">Master the top 150 Quechua Collao verbs</p>
      </header>

      <main>
        {currentScreen === 'intro' && (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 className="exercise-title">Ready to practice?</h2>
            <p style={{ marginBottom: '2rem' }}>
              We'll go through three types of exercises: Matching, Conjugation, and Paragraph Translation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-primary" style={{ fontSize: '1.2rem' }} onClick={() => setCurrentScreen('matching')}>
                Start Learning
              </button>
              <button className="btn-secondary" onClick={() => setCurrentScreen('study')}>
                Review Verbs & Grammar
              </button>
            </div>
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
            onRestart={handleRestart} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
