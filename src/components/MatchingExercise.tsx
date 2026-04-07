import React, { useState, useEffect } from 'react';
import { TOP_VERBS } from '../data/verbs';
import type { Verb } from '../data/verbs';

interface Props {
  onComplete: (score: number, total: number, answers: any[]) => void;
}

const MatchingExercise: React.FC<Props> = ({ onComplete }) => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [correctMatches, setCorrectMatches] = useState<number[]>([]);

  useEffect(() => {
    const selected = [...TOP_VERBS].sort(() => 0.5 - Math.random()).slice(0, 5);
    setVerbs(selected);
    setShuffledMeanings([...selected.map(v => v.meaning)].sort(() => 0.5 - Math.random()));
  }, []);

  const handleVerbClick = (index: number) => {
    if (correctMatches.includes(index)) return;
    setSelectedVerb(index);
    checkMatch(index, selectedMeaning);
  };

  const handleMeaningClick = (index: number) => {
    const verbIndex = Object.keys(matches).find(key => matches[parseInt(key)] === index);
    if (verbIndex && correctMatches.includes(parseInt(verbIndex))) return;
    setSelectedMeaning(index);
    checkMatch(selectedVerb, index);
  };

  const checkMatch = (vIndex: number | null, mIndex: number | null) => {
    if (vIndex !== null && mIndex !== null) {
      const isCorrect = verbs[vIndex].meaning === shuffledMeanings[mIndex];
      if (isCorrect) {
        setCorrectMatches(prev => [...prev, vIndex]);
      }
      setMatches(prev => ({ ...prev, [vIndex]: mIndex }));
      setSelectedVerb(null);
      setSelectedMeaning(null);
    }
  };

  const handleSubmit = () => {
    const score = correctMatches.length;
    const answers = verbs.map((v, i) => ({
      question: v.infinitive,
      correct: v.meaning,
      user: matches[i] !== undefined ? shuffledMeanings[matches[i]] : 'None',
      isCorrect: correctMatches.includes(i)
    }));
    onComplete(score, verbs.length, answers);
  };

  return (
    <div className="card">
      <h2 className="exercise-title">Match the Verb with its Meaning</h2>
      <div className="matching-grid">
        <div className="column">
          {verbs.map((verb, i) => (
            <div
              key={i}
              className={`matching-item ${selectedVerb === i ? 'selected' : ''} ${correctMatches.includes(i) ? 'correct' : ''}`}
              onClick={() => handleVerbClick(i)}
            >
              {verb.infinitive}
            </div>
          ))}
        </div>
        <div className="column">
          {shuffledMeanings.map((meaning, i) => {
            const verbIndex = Object.keys(matches).find(key => matches[parseInt(key)] === i);
            const isCorrect = verbIndex !== undefined && correctMatches.includes(parseInt(verbIndex));
            
            return (
              <div
                key={i}
                className={`matching-item ${selectedMeaning === i ? 'selected' : ''} ${isCorrect ? 'correct' : ''}`}
                onClick={() => handleMeaningClick(i)}
              >
                {meaning}
              </div>
            );
          })}
        </div>
      </div>
      <button 
        className="btn-primary" 
        style={{ marginTop: '2rem', width: '100%' }}
        onClick={handleSubmit}
      >
        Finish Matching
      </button>
    </div>
  );
};

export default MatchingExercise;
