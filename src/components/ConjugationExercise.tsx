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
  '1pi': 'We (Inclusive - Ñuqanchis)',
  '1pe': 'We (Exclusive - Ñuqayku)',
  '2p': 'You all (Qankuna)',
  '3p': 'They (Paykuna)'
};

const ConjugationExercise: React.FC<Props> = ({ onComplete }) => {
  const [exerciseData, setExerciseData] = useState<{ verb: Verb, tense: Tense, person: Person, correctAnswer: string }[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    const tenses: Tense[] = ['present', 'past', 'future', 'imperative', 'conditional', 'present_progressive', 'past_progressive', 'future_progressive'];
    const persons: Person[] = ['1s', '2s', '3s', '1pi', '1pe', '2p', '3p'];
    
    const selectedExercises = Array.from({ length: 5 }).map(() => {
      const verb = TOP_VERBS[Math.floor(Math.random() * TOP_VERBS.length)];
      const tense = tenses[Math.floor(Math.random() * tenses.length)];
      let person = persons[Math.floor(Math.random() * persons.length)];
      
      // Fix for imperative 1s/1pe
      if (tense === 'imperative' && (person === '1s' || person === '1pe')) {
        person = '2s';
      }
      
      const suffix = CONJUGATIONS[tense][person];
      const correctAnswer = verb.root + suffix;
      
      return { verb, tense, person, correctAnswer };
    });
    
    setExerciseData(selectedExercises);
    setUserAnswers(new Array(5).fill(''));
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    const answers = exerciseData.map((ex, i) => {
      const isCorrect = userAnswers[i].trim().toLowerCase() === ex.correctAnswer.toLowerCase();
      if (isCorrect) score++;
      return {
        question: `Conjugate ${ex.verb.infinitive} (${ex.verb.meaning}) in ${ex.tense} for ${PERSON_LABELS[ex.person]}`,
        correct: ex.correctAnswer,
        user: userAnswers[i],
        isCorrect
      };
    });
    onComplete(score, exerciseData.length, answers);
  };

  return (
    <div className="card">
      <h2 className="exercise-title">Conjugation: Fill in the Blanks</h2>
      {exerciseData.map((ex, i) => (
        <div key={i} className="input-group">
          <label className="conjugation-prompt">
            <strong>{ex.verb.infinitive}</strong> ({ex.verb.meaning}) <br/>
            Tense: <span>{ex.tense.charAt(0).toUpperCase() + ex.tense.slice(1)}</span> | Person: <span>{PERSON_LABELS[ex.person]}</span>
          </label>
          <input
            type="text"
            value={userAnswers[i]}
            placeholder="Type conjugated verb..."
            onChange={(e) => handleInputChange(i, e.target.value)}
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
