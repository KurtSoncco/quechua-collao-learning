import React, { useState } from 'react';
import { TOP_VERBS, CONJUGATIONS } from '../data/verbs';
import type { Person, Tense } from '../data/verbs';

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

const ReviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verbs' | 'grammar'>('verbs');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVerbs = TOP_VERBS.filter(v =>
    v.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <h2 className="exercise-title">Reference & Study Guide</h2>

      <div className="review-tabs">
        <button
          className={activeTab === 'verbs' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('verbs')}
        >
          Vocabulary ({TOP_VERBS.length} Verbs)
        </button>
        <button
          className={activeTab === 'grammar' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('grammar')}
        >
          Conjugation Rules
        </button>
      </div>

      {activeTab === 'verbs' && (
        <div>
          <input
            type="text"
            placeholder="Search verbs or meanings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', marginBottom: '1.25rem' }}
          />
          <div className="verb-grid">
            {filteredVerbs.map((v, i) => (
              <div key={i} className="verb-card">
                <strong>{v.infinitive}</strong>
                <span>{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'grammar' && (
        <div style={{ maxHeight: '560px', overflowY: 'auto', paddingRight: '0.25rem' }}>
          <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            In Quechua, verbs are highly regular. Take the <strong>root</strong> (infinitive minus <em>-y</em>) and add the suffix for tense + person.
          </p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {(Object.keys(CONJUGATIONS) as Tense[]).map(tense => (
              <div key={tense}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.6rem', borderBottom: '2px solid #f0e0d0', paddingBottom: '0.3rem', fontFamily: 'Fraunces, serif' }}>
                  {TENSE_LABELS[tense]}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.4rem' }}>
                  {(Object.keys(CONJUGATIONS[tense]) as Person[]).map(person => {
                    const suffix = CONJUGATIONS[tense][person];
                    const display = Array.isArray(suffix) ? suffix.join(' / ') : suffix;
                    return (
                      <div key={person} style={{ fontSize: '0.875rem', padding: '0.35rem 0' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{PERSON_LABELS[person]}:</span><br />
                        <strong style={{ color: 'var(--secondary)' }}>-{display || '(n/a)'}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
