import React, { useState, useEffect } from 'react';
import { TOP_VERBS } from '../data/verbs';
import type { Verb } from '../data/verbs';

interface Props {
  onComplete: (score: number, total: number, answers: any[]) => void;
}

const BATCH = 6;

const MatchingExercise: React.FC<Props> = ({ onComplete }) => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<number | null>(null);
  const [correctMatches, setCorrectMatches] = useState<number[]>([]);
  const [incorrectVerb, setIncorrectVerb] = useState<number | null>(null);
  const [verbToMeaning, setVerbToMeaning] = useState<Record<number, number>>({});
  const [combo, setCombo] = useState(0);
  const [comboFlash, setComboFlash] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const selected = [...TOP_VERBS].sort(() => 0.5 - Math.random()).slice(0, BATCH);
    setVerbs(selected);
    setShuffledMeanings([...selected.map(v => v.meaning)].sort(() => 0.5 - Math.random()));
    setSelectedVerb(null);
    setSelectedMeaning(null);
    setCorrectMatches([]);
    setIncorrectVerb(null);
    setVerbToMeaning({});
    setCombo(0);
  };

  const handleVerbClick = (i: number) => {
    if (correctMatches.includes(i)) return;
    setSelectedVerb(i);
    if (selectedMeaning !== null) tryMatch(i, selectedMeaning);
  };

  const handleMeaningClick = (i: number) => {
    const verbIdx = Object.entries(verbToMeaning).find(([, m]) => m === i && correctMatches.includes(Number(Object.keys(verbToMeaning).find(k => verbToMeaning[+k] === i)!)));
    if (verbIdx) return;
    setSelectedMeaning(i);
    if (selectedVerb !== null) tryMatch(selectedVerb, i);
  };

  const tryMatch = (vIdx: number, mIdx: number) => {
    const isCorrect = verbs[vIdx].meaning === shuffledMeanings[mIdx];
    if (isCorrect) {
      const newCorrect = [...correctMatches, vIdx];
      setCorrectMatches(newCorrect);
      setVerbToMeaning(prev => ({ ...prev, [vIdx]: mIdx }));
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo >= 2) { setComboFlash(true); setTimeout(() => setComboFlash(false), 600); }
      setSelectedVerb(null);
      setSelectedMeaning(null);

      if (newCorrect.length === BATCH) {
        setTimeout(() => {
          const answers = verbs.map((v, i) => ({
            question: v.infinitive,
            correct: v.meaning,
            user: verbToMeaning[i] !== undefined ? shuffledMeanings[verbToMeaning[i]] : v.meaning,
            isCorrect: true
          }));
          onComplete(BATCH, BATCH, answers);
        }, 500);
      }
    } else {
      setCombo(0);
      setIncorrectVerb(vIdx);
      setTimeout(() => setIncorrectVerb(null), 500);
      setSelectedVerb(null);
      setSelectedMeaning(null);
    }
  };

  const meaningIsMatched = (mIdx: number) =>
    Object.entries(verbToMeaning).some(([v, m]) => +m === mIdx && correctMatches.includes(+v));

  const progress = Math.round((correctMatches.length / BATCH) * 100);

  return (
    <div className="card">
      <h2 className="exercise-title">Match the Verb with its Meaning</h2>

      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{correctMatches.length}/{BATCH}</span>
        {combo >= 2 && (
          <span style={{
            fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)',
            transition: 'transform 0.2s', transform: comboFlash ? 'scale(1.3)' : 'scale(1)'
          }}>
            🔥 x{combo}
          </span>
        )}
      </div>

      <div className="matching-grid">
        <div className="matching-col">
          {verbs.map((verb, i) => (
            <div
              key={i}
              className={`matching-item
                ${selectedVerb === i ? 'selected' : ''}
                ${correctMatches.includes(i) ? 'correct' : ''}
                ${incorrectVerb === i ? 'incorrect' : ''}
              `}
              onClick={() => handleVerbClick(i)}
            >
              {verb.infinitive}
            </div>
          ))}
        </div>
        <div className="matching-col">
          {shuffledMeanings.map((meaning, i) => (
            <div
              key={i}
              className={`matching-item
                ${selectedMeaning === i ? 'selected' : ''}
                ${meaningIsMatched(i) ? 'correct' : ''}
              `}
              onClick={() => handleMeaningClick(i)}
            >
              {meaning}
            </div>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        style={{ width: '100%' }}
        onClick={() => {
          const answers = verbs.map((v, i) => ({
            question: v.infinitive,
            correct: v.meaning,
            user: verbToMeaning[i] !== undefined ? shuffledMeanings[verbToMeaning[i]] : '(none)',
            isCorrect: correctMatches.includes(i)
          }));
          onComplete(correctMatches.length, BATCH, answers);
        }}
      >
        Finish Matching
      </button>
    </div>
  );
};

export default MatchingExercise;
