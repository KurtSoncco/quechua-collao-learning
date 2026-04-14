import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number, total: number, answers: any[]) => void;
}

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface Paragraph {
  id: number;
  difficulty: Difficulty;
  theme: string;
  text: string;
  prompts: string[];
  answers: string[];
  full: string;
  translation: string;
}

const PARAGRAPHS: Paragraph[] = [
  // ── BEGINNER ──
  {
    id: 1,
    difficulty: 'beginner',
    theme: 'Morning routine',
    text: "Paqarin [1] hatun wasimanta. Chaysi unu [2]. Qhipamanta mama mikhuyta [3]. Ñuqaqa tiyaspa [4].",
    prompts: ["[1] I left (past)", "[2] I drank (past)", "[3] she cooked (past)", "[4] I ate (present)"],
    answers: ["lluqsirqani", "ukyarqani", "wayk'urqan", "mikhuni"],
    full: "Paqarin lluqsirqani hatun wasimanta. Chaysi unu ukyarqani. Qhipamanta mama mikhuyta wayk'urqan. Ñuqaqa tiyaspa mikhuni.",
    translation: "In the morning I left the big house. Then I drank water. Later, mom cooked food. I ate sitting."
  },
  {
    id: 2,
    difficulty: 'beginner',
    theme: 'Going to market',
    text: "Kunan p'unchay qhatuman [1]. Chaypi papa [2]. Qhipamantaqa wasimanmi [3]. Mamamanta sumaq mikhuyta [4].",
    prompts: ["[1] we went (inclusive past)", "[2] we bought (inclusive past)", "[3] we returned (inclusive past)", "[4] we received (inclusive past)"],
    answers: ["rirqanchis", "rantirqanchis", "kutirqanchis", "chaskikurqanchis"],
    full: "Kunan p'unchay qhatuman rirqanchis. Chaypi papa rantirqanchis. Qhipamantaqa wasimanmi kutirqanchis. Mamamanta sumaq mikhuyta chaskikurqanchis.",
    translation: "Today we went to the market. There we bought potatoes. Afterwards we returned home. We received a tasty meal from mom."
  },
  {
    id: 3,
    difficulty: 'beginner',
    theme: 'Playing children',
    text: "Wawakuna kancha patapi [1]. Paykunaqa [2] asikuspa. Iskay wawaqa chaskillamantataq [3]. Tuta chayamuptinkis [4].",
    prompts: ["[1] they played (past)", "[2] they were running (past progressive)", "[3] they sang (past)", "[4] they will sleep (future)"],
    answers: ["pukllarqanku", "phawasharqanku", "takirqanku", "puñunqaku"],
    full: "Wawakuna kancha patapi pukllarqanku. Paykunaqa phawasharqanku asikuspa. Iskay wawaqa chaskillamantataq takirqanku. Tuta chayamuptinkis puñunqaku.",
    translation: "The children played in the courtyard. They were running while laughing. Two children then sang. When night came they will sleep."
  },
  {
    id: 4,
    difficulty: 'beginner',
    theme: 'Working on the farm',
    text: "Taytay chakrapi [1] p'unchaynintin. Ñuqaqa payta [2]. Ch'isiyanaptinmi yawarwarmiy [3]. Wasipi puñuspa [4].",
    prompts: ["[1] he worked (past)", "[2] I helped (past)", "[3] we rested (exclusive past)", "[4] we will sleep (exclusive future)"],
    answers: ["llamk'arqan", "yanapanirqani", "samarqayku", "puñusaqku"],
    full: "Taytay chakrapi llamk'arqan p'unchaynintin. Ñuqaqa payta yanapanirqani. Ch'isiyanaptinmi yawarwarmiy samarqayku. Wasipi puñuspa puñusaqku.",
    translation: "My father worked in the field all day. I helped him. When evening came we (exclusive) rested. Sleeping at home we will sleep."
  },
  {
    id: 5,
    difficulty: 'beginner',
    theme: 'At school',
    text: "Yachay wasipi yachachiqniy Quechua [1]. Ñuqaqa allintas [2]. Qan imataq [3]? Payqa wayk'uta [4].",
    prompts: ["[1] taught (past)", "[2] I listened (past)", "[3] did you write? (past)", "[4] he read (past)"],
    answers: ["yachachirqan", "uyarirqani", "qillqarqanki", "ñawirirqan"],
    full: "Yachay wasipi yachachiqniy Quechua yachachirqan. Ñuqaqa allintas uyarirqani. Qan imataq qillqarqanki? Payqa wayk'uta ñawirirqan.",
    translation: "My teacher taught Quechua at school. I listened well. What did you write? He/she read the text."
  },
  // ── INTERMEDIATE ──
  {
    id: 6,
    difficulty: 'intermediate',
    theme: 'A journey to the mountains',
    text: "Qayna p'unchay hatun urquman [1]. Chaypi [2]. Kunanqa wasipi [3]. Paqarinqa qusaywanmi [4].",
    prompts: ["[1] I went (past)", "[2] I was walking (past progressive)", "[3] I am resting (present progressive)", "[4] we will return (inclusive future)"],
    answers: ["rirqani", "purisharqani", "samashani", "kutisunchis"],
    full: "Qayna p'unchay hatun urquman rirqani. Chaypi purisharqani. Kunanqa wasipi samashani. Paqarinqa qusaywanmi kutisunchis.",
    translation: "Yesterday I went to the big mountain. There I was walking. Now I am resting at home. Tomorrow my husband and I will return."
  },
  {
    id: 7,
    difficulty: 'intermediate',
    theme: 'Village festival',
    text: "Llaqtaypi hatun raymi [1]. Warmikunaqa [2] sumaq p'achakuna churaykuspa. Qarikunataq [3]. Ñuqaqa paykunawan [4].",
    prompts: ["[1] began (past)", "[2] were dancing (past progressive)", "[3] were singing (past progressive)", "[4] I was dancing (past progressive)"],
    answers: ["qallarirqan", "tususharqanku", "takisharqanku", "tususharqani"],
    full: "Llaqtaypi hatun raymi qallarirqan. Warmikunaqa tususharqanku sumaq p'achakuna churaykuspa. Qarikunataq takisharqanku. Ñuqaqa paykunawan tususharqani.",
    translation: "A big festival began in my village. The women were dancing wearing beautiful clothes. The men were singing. I was dancing with them."
  },
  {
    id: 8,
    difficulty: 'intermediate',
    theme: 'Asking for help',
    text: "Ñuqaqa wasiypi [1]. Qanqa kay qillqata [2]? Sichus munawaq chayqa, kay librotaqa [3]. Añanchasqayki [4].",
    prompts: ["[1] I am working (present progressive)", "[2] could you read? (conditional)", "[3] bring (imperative 2s)", "[4] I will thank you (future 1s)"],
    answers: ["llamk'ashani", "ñawiriwaq", "apamuy", "añanchayusaq"],
    full: "Ñuqaqa wasiypi llamk'ashani. Qanqa kay qillqata ñawiriwaq? Sichus munawaq chayqa, kay librotaqa apamuy. Añanchayusaq.",
    translation: "I am working at home. Could you read this writing? If you want, bring this book. I will thank you."
  },
  {
    id: 9,
    difficulty: 'intermediate',
    theme: 'Weaving and crafts',
    text: "Abuelas ch'isiyan [1]. Payqa sumaq p'achakunata [2]. Wiphala siq'ikuna churaykuspa [3]. Ñuqaqa paymanta [4].",
    prompts: ["[1] she is weaving (present progressive)", "[2] she makes (present)", "[3] she was finishing (past progressive)", "[4] I want to learn (present)"],
    answers: ["awashani", "ruwan", "tukusharqan", "yachay munani"],
    full: "Abuelas ch'isiyan awashani. Payqa sumaq p'achakunata ruwan. Wiphala siq'ikuna churaykuspa tukusharqan. Ñuqaqa paymanta yachay munani.",
    translation: "Grandmother is weaving in the afternoon. She makes beautiful clothes. She was finishing placing wiphala designs. I want to learn from her."
  },
  {
    id: 10,
    difficulty: 'intermediate',
    theme: 'Rainy season',
    text: "Para [1] chakra ichupis. Taytay chakrampi [2]. Ñuqanchisqa wasipi [3]. Wawakunataq [4].",
    prompts: ["[1] it is falling / raining (present progressive)", "[2] was walking (past progressive)", "[3] we were sheltering (past progressive)", "[4] were sleeping (past progressive)"],
    answers: ["urmashanña", "purisharqan", "samasharqanchis", "puñusharqanku"],
    full: "Para urmashanña chakra ichupis. Taytay chakrampi purisharqan. Ñuqanchisqa wasipi samasharqanchis. Wawakunataq puñusharqanku.",
    translation: "Rain is already falling over the fields. Father was walking through the fields. We were sheltering at home. The children were sleeping."
  },
  // ── ADVANCED ──
  {
    id: 11,
    difficulty: 'advanced',
    theme: 'A dream',
    text: "Qayna tuta hatun urqupi [1]. Chaypi puma [2]. Ñuqaqa [3] imatapas. Sichus puma hamusqa chayqa, [4]. Rikhuchisqaymi.",
    prompts: ["[1] I was dreaming (past progressive)", "[2] was watching me (past progressive)", "[3] I couldn't move (conditional neg.)", "[4] I would have run (conditional 1s)"],
    answers: ["musquykusharqani", "qhawasharqawan", "kuyuyman karqani", "phawawaq karqani"],
    full: "Qayna tuta hatun urqupi musquykusharqani. Chaypi puma qhawasharqawan. Ñuqaqa kuyuyman karqani imatapas. Sichus puma hamusqa chayqa, phawawaq karqani. Rikhuchisqaymi.",
    translation: "Last night I was dreaming on a big mountain. There a puma was watching me. I couldn't move at all. If the puma had come, I would have run. It showed itself to me."
  },
  {
    id: 12,
    difficulty: 'advanced',
    theme: 'Village elder speaks',
    text: "Ñawpaq pachapiqa, yayakuna chakrakunata [1]. Tarpusqaykichisqa [2]. Sichus mana allintas [3] chayqa, sara [4]. Chayrayku yachay [5].",
    prompts: [
      "[1] they defended (past)", "[2] will grow (future 3s)",
      "[3] you all watered (past)", "[4] will dry up (future)",
      "[5] you all must learn (imperative 2p)"
    ],
    answers: ["amacharqanku", "wiñanqa", "mayllarqankichis", "ch'akinqa", "yachaychis"],
    full: "Ñawpaq pachapiqa, yayakuna chakrakunata amacharqanku. Tarpusqaykichisqa wiñanqa. Sichus mana allintas mayllarqankichis chayqa, sara ch'akinqa. Chayrayku yachay yachaychis.",
    translation: "In the old times, the elders defended the fields. What you planted will grow. If you didn't water it well, the corn will dry up. That's why you all must learn."
  },
  {
    id: 13,
    difficulty: 'advanced',
    theme: 'Healing herbs',
    text: "Hampiq payniymi [1] qora hampita. Machu urqumanta [2]. Payqa unqusqakunata [3]. Sapa p'unchay [4] chayta yachay munaq.",
    prompts: ["[1] knows (present)", "[2] she gathered (past)", "[3] she heals (present)", "[4] I would seek (conditional 1s)"],
    answers: ["yachan", "allarqan", "hampichin", "maskaymanmi"],
    full: "Hampiq payniymi qora hampita yachan. Machu urqumanta allarqan. Payqa unqusqakunata hampichin. Sapa p'unchay maskaymanmi chayta yachay munaq.",
    translation: "The healer woman knows medicinal herbs. She gathered them from the ancient mountain. She heals the sick. Every day I would seek to learn that."
  },
  {
    id: 14,
    difficulty: 'advanced',
    theme: 'River and life',
    text: "Mayu wiñaypim [1]. Payqa pachamamap yawarmin [2]. Ayllukuna chaypi [3] unu upyananku. Mana mayuta [4] chayqa, tarpuykuna [5].",
    prompts: [
      "[1] it flows (present prog.)", "[2] it is (present)",
      "[3] gather (present progressive)", "[4] we protect (present)",
      "[5] will die (future)"
    ],
    answers: ["purishanmi", "kan", "huñushanku", "amachaniku", "wañunqaku"],
    full: "Mayu wiñaypim purishanmi. Payqa pachamamap yawarmin kan. Ayllukuna chaypi huñushanku unu upyananku. Mana mayuta amachaniku chayqa, tarpuykuna wañunqaku.",
    translation: "The river always flows. It is the blood of Pachamama. Communities are gathering there to drink water. If we don't protect the river, the crops will die."
  },
  {
    id: 15,
    difficulty: 'advanced',
    theme: 'Night sky',
    text: "Ch'askakunaqa tutapi [1]. Ñawpaq runakunaqa paykunamanta [2]. Huk ch'askaqa hatun killaman [3]. Sichus allinta [4] chayqa, paykuna [5].",
    prompts: [
      "[1] are shining (present progressive)", "[2] they remembered (past)",
      "[3] was moving (past progressive)", "[4] you look (present)",
      "[5] they will speak to you (future)"
    ],
    answers: ["k'anchashankun", "yuyarqanku", "kuyusharqan", "qhawanki", "rimanqasunki"],
    full: "Ch'askakunaqa tutapi k'anchashankun. Ñawpaq runakunaqa paykunamanta yuyarqanku. Huk ch'askaqa hatun killaman kuyusharqan. Sichus allinta qhawanki chayqa, paykuna rimanqasunki.",
    translation: "The stars shine at night. The ancient people remembered them. One star was moving toward the big moon. If you look well, they will speak to you."
  }
];

const TranslationExercise: React.FC<Props> = ({ onComplete }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [selected, setSelected] = useState<Paragraph | null>(null);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [hints, setHints] = useState<boolean[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  useEffect(() => {
    pickParagraph(difficulty);
  }, []);

  const pickParagraph = (diff: Difficulty) => {
    const pool = PARAGRAPHS.filter(p => p.difficulty === diff);
    const p = pool[Math.floor(Math.random() * pool.length)];
    setSelected(p);
    setUserInputs(new Array(p.prompts.length).fill(''));
    setHints(new Array(p.prompts.length).fill(false));
    setSubmitted(false);
    setResults([]);
  };

  const handleDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    pickParagraph(d);
  };

  const handleHint = (i: number) => {
    setHints(prev => { const n = [...prev]; n[i] = true; return n; });
  };

  const handleSubmit = () => {
    if (!selected) return;
    const res = selected.answers.map((ans, i) =>
      userInputs[i].trim().toLowerCase() === ans.toLowerCase()
    );
    setResults(res);
    setSubmitted(true);
    const score = res.filter(Boolean).length;
    const hintPenalty = hints.filter(Boolean).length;
    const adjustedScore = Math.max(0, score - hintPenalty);
    const answers = selected.prompts.map((p, i) => ({
      question: `Fill blank (${i + 1}): ${p}`,
      correct: selected.answers[i],
      user: userInputs[i],
      isCorrect: res[i]
    }));
    onComplete(adjustedScore, selected.prompts.length, answers);
  };

  if (!selected) return null;

  const getHintText = (prompt: string): string => {
    const match = prompt.match(/\(([^)]+)\)/g);
    return match ? match.join(', ') : 'Think about the root + suffix';
  };

  return (
    <div className="card">
      <h2 className="exercise-title">Paragraph: Fill the Blanks</h2>

      <div className="difficulty-tabs">
        {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(d => (
          <button
            key={d}
            className={`difficulty-tab ${difficulty === d ? 'active' : ''}`}
            onClick={() => handleDifficulty(d)}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
        Theme: {selected.theme}
      </div>

      <div className="paragraph-text">
        {selected.text.split(/\[\d+\]/).map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < selected.prompts.length && (
              <span className="blank-num">{i + 1}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div>
        {selected.prompts.map((prompt, i) => (
          <div key={i} className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
              <span className="blank-num" style={{ width: 20, height: 20, fontSize: '0.7rem' }}>{i + 1}</span>
              <span>{prompt.replace(/^\[\d+\]\s*/, '')}</span>
              {!hints[i] && !submitted && (
                <button className="hint-btn" onClick={() => handleHint(i)}>hint −1pt</button>
              )}
            </label>
            {hints[i] && (
              <div className="hint-text">Hint: {getHintText(prompt)}</div>
            )}
            <input
              type="text"
              inputMode="text"
              autoCorrect="off"
              autoCapitalize="none"
              value={userInputs[i]}
              disabled={submitted}
              style={submitted ? {
                background: results[i] ? 'var(--success-light)' : 'var(--error-light)',
                borderColor: results[i] ? 'var(--success)' : 'var(--error)'
              } : {}}
              onChange={(e) => {
                const n = [...userInputs]; n[i] = e.target.value; setUserInputs(n);
              }}
            />
            {submitted && !results[i] && (
              <div className="hint-text" style={{ color: 'var(--success)' }}>
                ✓ {selected.answers[i]}
              </div>
            )}
          </div>
        ))}
      </div>

      {submitted && (
        <div className="full-paragraph">
          <h4>Full Paragraph</h4>
          <p style={{ marginBottom: '0.5rem' }}>{selected.full}</p>
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>{selected.translation}</p>
        </div>
      )}

      {!submitted && (
        <button className="btn-primary" style={{ width: '100%', marginTop: '0.75rem' }} onClick={handleSubmit}>
          Submit
        </button>
      )}

      {submitted && (
        <button className="btn-secondary" style={{ width: '100%', marginTop: '0.75rem' }} onClick={() => pickParagraph(difficulty)}>
          Try Another
        </button>
      )}
    </div>
  );
};

export default TranslationExercise;
