import React, { useState } from 'react';
import { TOP_VERBS, CONJUGATIONS } from '../data/verbs';
import type { Person, Tense } from '../data/verbs';

const PERSON_LABELS: Record<Person, string> = {
  '1s': 'I (Ñuqa)',
  '2s': 'You (Qan)',
  '3s': 'He/She (Pay)',
  '1pi': 'We (Incl. - Ñuqanchis)',
  '1pe': 'We (Excl. - Ñuqayku)',
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
    <div className="card" style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h2 className="exercise-title">Reference & Study Guide</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={activeTab === 'verbs' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setActiveTab('verbs')}
        >
          Vocabulary (150 Verbs)
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
            style={{ width: '100%', marginBottom: '1.5rem' }}
          />
          <div style={{ maxHeight: '500px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {filteredVerbs.map((v, i) => (
              <div key={i} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: 'var(--primary-dark)' }}>{v.infinitive}</strong>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{v.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'grammar' && (
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
            In Quechua, verbs are highly regular. Take the <strong>root</strong> (infinitive minus -y) and add the following suffixes:
          </p>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {(Object.keys(CONJUGATIONS) as Tense[]).map(tense => (
              <div key={tense}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', borderBottom: '2px solid #f1f5f9' }}>
                  {TENSE_LABELS[tense]}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {(Object.keys(CONJUGATIONS[tense]) as Person[]).map(person => (
                    <div key={person} style={{ fontSize: '0.9rem' }}>
                      <span style={{ color: '#64748b' }}>{PERSON_LABELS[person]}:</span><br/>
                      <strong style={{ color: 'var(--secondary)' }}>-{CONJUGATIONS[tense][person] || '(n/a)'}</strong>
                    </div>
                  ))}
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
