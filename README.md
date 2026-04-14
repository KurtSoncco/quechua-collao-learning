# Yachasun Quechua (Collao)

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

**Yachasun Quechua** is an interactive learning platform for mastering **150+ Quechua Collao verbs** — the variety spoken in the Lake Titicaca region of Peru and Bolivia. It combines conjugation drills, vocabulary matching, and culturally grounded paragraph exercises with a gamification system to keep you coming back daily.

---

## Live Demo

**[https://KurtSoncco.github.io/quechua-collao-learning/](https://KurtSoncco.github.io/quechua-collao-learning/)**

---

## Features

### Exercises
- **Matching** — pair Quechua infinitives with their meanings; a combo multiplier rewards consecutive correct answers
- **Conjugation** — fill in the conjugated form for a randomly selected verb, tense, and person
- **Paragraph fill-in-the-blank** — 15 culturally themed paragraphs (market day, festivals, farming, healing, night sky) across three difficulty tiers

### Difficulty tiers (Paragraph exercise)
| Tier | Tenses used |
|---|---|
| Beginner | Present, Past, Future |
| Intermediate | Past Progressive, Present Progressive, Future |
| Advanced | Conditional, all Progressives, mixed |

### Gamification
- **XP & Levels** — earn XP per correct answer with combo and perfect-score bonuses; progress through 5 Quechua-named levels: *Qallariq → Yachaqkuna → Rimaqkuna → Yachachiq → Amauta*
- **Daily streak** — tracked across sessions via localStorage; resets if you miss a day
- **8 badges** — unlocked by milestones: first match, perfect score, 3- and 7-day streaks, XP thresholds, and total correct answers

### Learning aids
- **Hint system** — reveal the tense/person clue on any blank at the cost of 1 point
- **Full paragraph reveal** — see the complete passage with English translation after submitting
- **Reference guide** — searchable vocabulary list and conjugation suffix table for all 8 tenses

### Design
- Andean-inspired color palette (terracotta, deep teal, gold, warm cream)
- Fraunces serif headings with a geometric SVG background pattern
- Fully mobile-responsive with `clamp()` sizing and 44 px minimum touch targets

---

## Verb coverage

The database covers 150+ verbs across semantic categories:

| Category | Examples |
|---|---|
| Motion | *riy* (go), *hamuy* (come), *phaway* (run), *puriy* (walk) |
| Communication | *rimay* (speak), *niy* (say), *tapuy* (ask), *uyariy* (listen) |
| Emotion | *kusikuy* (be happy), *llakikuy* (be sad), *manchakuy* (fear) |
| Daily life | *mikhuy* (eat), *ukyay* (drink), *puñuy* (sleep), *wayk'uy* (cook) |
| Work & land | *llamk'ay* (work), *tarpuy* (sow), *hallmay* (hoe), *aymuray* (harvest) |
| Mind | *yuyay* (remember), *yachay* (know), *iñiy* (believe), *musquykuy* (dream) |

Conjugation suffixes are implemented for **8 tenses × 7 persons**:

- Present, Past, Future
- Imperative, Conditional
- Present Progressive, Past Progressive, Future Progressive

Collao-specific variants (e.g. inclusive/exclusive *we*, alternate conditional forms) are included with comments in the source data.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Bundler | Vite 8 |
| Styling | Vanilla CSS with custom properties |
| Fonts | Fraunces (headings) + Poppins (body) via Google Fonts |
| Persistence | localStorage |
| Deployment | GitHub Pages via `gh-pages` |

---

## Local development

```bash
git clone https://github.com/KurtSoncco/quechua-collao-learning.git
cd quechua-collao-learning
npm install
npm run dev          # http://localhost:5173/quechua-collao-learning/
```

Build and deploy:

```bash
npm run build        # type-check + bundle
npm run deploy       # push dist/ to gh-pages branch
```

---

## Contributing

Pull requests are welcome. If you find a conjugation error or want to add more paragraphs or verbs, open an issue or submit a PR directly.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

*"Yachayqa kawsayninchismi" — Knowledge is our life.*
