import React, { useState } from 'react';

interface Props {
  score: number;
  total: number;
  answers: any[];
  onRestart: () => void;
}

const ScoreBoard: React.FC<Props> = ({ score, total, answers, onRestart }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="card scoreboard">
      <h2 className="exercise-title">Well Done!</h2>
      <p>You finished the exercise!</p>
      <div className="score-value">{percentage}%</div>
      <p>{score} out of {total} correct</p>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn-secondary" onClick={() => setShowAnswers(!showAnswers)}>
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
        <button className="btn-primary" onClick={onRestart}>
          Start Again
        </button>
      </div>

      {showAnswers && (
        <div className="answers-list">
          <h3>Correct Answers</h3>
          {answers.map((ans, i) => (
            <div key={i} className="answer-item">
              <p><strong>Q:</strong> {ans.question}</p>
              <p><strong>Your answer:</strong> <span style={{ color: ans.isCorrect ? 'var(--success)' : 'var(--error)' }}>{ans.user || '(empty)'}</span></p>
              {!ans.isCorrect && <p><strong>Correct:</strong> <span style={{ color: 'var(--success)' }}>{ans.correct}</span></p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
