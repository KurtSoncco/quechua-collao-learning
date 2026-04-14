import React, { useState, useEffect } from 'react';
import { TOP_VERBS, CONJUGATIONS } from '../data/verbs';
import type { Verb, Tense, Person } from '../data/verbs';

interface Props {
  onComplete: (score: number, total: number, answers: any[]) => void;
}

const PERSON_LABELS: Record<Person, string> = {
  '1s': 'I (Ñuqa)',
  '2s': 'You (Qan)',
  '3s': 'He/She (Pay)',
  '1pi': 'We Incl. (Ñuqanchis)',
  '1pe': 'We Excl. (Ñuqayku)',
  '2p': 'You all (Qankuna)',
  '3p': 'They (Paykuna)'
};

const TENSE_LABELS: Record<Tense, string> = {
  present: 'Present',
  past: 'Past',
  future: 'Future',
  imperative: 'Imperative',
  conditional: 'Conditional',
  present_progressive: 'Present Progressive',
  past_progressive: 'Past Progressive',
  future_progressive: 'Future Progressive'
};

const TENSES: Tense[] = ['present', 'past', 'future', 'imperative', 'conditional', 'present_progressive', 'past_progressive', 'future_progressive'];
const PERSONS: Person[] = ['1s', '2s', '3s', '1pi', '1pe', '2p', '3p'];
const COUNT = 5;

const ConjugationExercise: React.FC<Props> = ({ onComplete }) => {
  const [exerciseData, setExerciseData] = useState<{ verb: Verb; tense: Tense; person: Person; correctAnswer: string }[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    const exercises = Array.from({ length: COUNT }).map(() => {
      const verb = TOP_VERBS[Math.floor(Math.random() * TOP_VERBS.length)];
      const tense = TENSES[Math.floor(Math.random() * TENSES.length)];
      let person = PERSONS[Math.floor(Math.random() * PERSONS.length)];
      if (tense === 'imperative' && (person === '1s' || person === '1pe')) person = '2s';
      const suffix = CONJUGATIONS[tense][person];
      const correctAnswer = Array.isArray(suffix) ? verb.root + suffix[0] : verb.root + suffix;
      return { verb, tense, person, correctAnswer };
    });
    setExerciseData(exercises);
    setUserAnswers(new Array(COUNT).fill(''));
  }, []);

  const handleSubmit = () => {
    let score = 0;
    const answers = exerciseData.map((ex, i) => {
      const isCorrect = userAnswers[i].trim().toLowerCase() === ex.correctAnswer.toLowerCase();
      if (isCorrect) score++;
      return {
        question: `Conjugate "${ex.verb.infinitive}" (${ex.verb.meaning}) — ${TENSE_LABELS[ex.tense]}, ${PERSON_LABELS[ex.person]}`,
        correct: ex.correctAnswer,
        user: userAnswers[i],
        isCorrect
      };
    });
    onComplete(score, COUNT, answers);
  };

  const progress = Math.round((userAnswers.filter(a => a.trim().length > 0).length / COUNT) * 100);

  return (
    <div className="card">
      <h2 className="exercise-title">Conjugation: Fill in the Blanks</h2>

      <div className="progress-row">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{userAnswers.filter(a => a.trim().length > 0).length}/{COUNT}</span>
      </div>

      {exerciseData.map((ex, i) => (
        <div key={i} className="input-group">
          <label>
            <strong style={{ color: 'var(--primary-dark)' }}>{ex.verb.infinitive}</strong>
            <span style={{ color: 'var(--text-muted)' }}> — {ex.verb.meaning}</span>
            <br />
            <span style={{ fontSize: '0.82rem' }}>
              {TENSE_LABELS[ex.tense]} · {PERSON_LABELS[ex.person]}
            </span>
          </label>
          <input
            type="text"
            inputMode="text"
            autoCorrect="off"
            autoCapitalize="none"
            value={userAnswers[i]}
            placeholder="Type conjugated verb..."
            onChange={(e) => {
              const n = [...userAnswers]; n[i] = e.target.value; setUserAnswers(n);
            }}
          />
        </div>
      ))}

      <button className="btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>
        Submit Conjugations
      </button>
    </div>
  );
};

export default ConjugationExercise;
