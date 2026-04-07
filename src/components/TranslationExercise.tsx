import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number, total: number, answers: any[]) => void;
}

const PARAGRAPHS = [
  {
    text: "Qayna p'unchay hatun wasiman [1]. Chaypi [2]. Kunanqa papa mikhuyta [3]. Paqarinqa hatun qhatuman [4]. Chaypi sumaq p'achata [5].",
    prompts: [
      "[1] I went (past)", 
      "[2] I was working (past progressive)", 
      "[3] I want (present)", 
      "[4] we will go (inclusive future)",
      "[5] we will buy (inclusive future)"
    ],
    answers: ["rirqani", "llamk'asharqani", "munani", "risunchis", "rantisunchis"],
    full: "Qayna p'unchay hatun wasiman rirqani. Chaypi llamk'asharqani. Kunanqa papa mikhuyta munani. Paqarinqa hatun qhatuman risunchis. Chaypi sumaq p'achata rantisunchis."
  },
  {
    text: "Ñuqaqa wasiypi [1]. Qanri, imatataq [2]? Ñawpaqtaqa [3], kunantaq [4]. Sichus munawaq chayqa, hamuypas [5].",
    prompts: [
      "[1] I am resting (present progressive)",
      "[2] you are doing? (present progressive)",
      "[3] I was sleeping (past progressive)",
      "[4] I am reading (present progressive)",
      "[5] you could help (conditional)"
    ],
    answers: ["samashani", "ruwashanki", "puñusharqani", "ñawirishani", "yanapawaq"],
    full: "Ñuqaqa wasiypi samashani. Qanri, imatataq ruwashanki? Ñawpaqtaqa puñusharqani, kunantaq ñawirishani. Sichus munawaq chayqa, hamuypas yanapawaq."
  }
];

const TranslationExercise: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<typeof PARAGRAPHS[0] | null>(null);
  const [userInputs, setUserInputs] = useState<string[]>([]);

  useEffect(() => {
    const p = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
    setSelected(p);
    setUserInputs(new Array(p.prompts.length).fill(''));
  }, []);

  const handleSubmit = () => {
    if (!selected) return;
    let score = 0;
    const answers = selected.prompts.map((p, i) => {
      const isCorrect = userInputs[i].trim().toLowerCase() === selected.answers[i].toLowerCase();
      if (isCorrect) score++;
      return {
        question: `Translate: ${p}`,
        correct: selected.answers[i],
        user: userInputs[i],
        isCorrect
      };
    });
    onComplete(score, selected.prompts.length, answers);
  };

  if (!selected) return null;

  return (
    <div className="card">
      <h2 className="exercise-title">Paragraph Translation</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
        {selected.text.split(/\[\d+\]/).map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < selected.prompts.length && <strong style={{color: 'var(--primary)'}}>({i+1})</strong>}
          </React.Fragment>
        ))}
      </p>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
        {selected.prompts.map((prompt, i) => (
          <div key={i} className="input-group">
            <label><strong>({i+1})</strong> {prompt}</label>
            <input
              type="text"
              value={userInputs[i]}
              onChange={(e) => {
                const newInputs = [...userInputs];
                newInputs[i] = e.target.value;
                setUserInputs(newInputs);
              }}
            />
          </div>
        ))}
      </div>
      
      <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleSubmit}>
        Submit Translation
      </button>
    </div>
  );
};

export default TranslationExercise;
