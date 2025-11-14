# Spanish Flashcards – Learning & Training Guide

## Overview
- Tech: Vite + React + TypeScript
- Modes: Study, Redo Wrong Cards, Quiz (MC/FIB), Stats
- State: React contexts (`StatsContext`, `WrongCardsContext`), optional localStorage

## Setup
```bash
node -v && npm -v
cd /Users/anushrin/Documents/Cursor/2DGame
npm install
```

## Run
```bash
npm run dev -- --port 5173 --strictPort
# open http://localhost:5173
```

## Build
```bash
npm run build
npm run preview  # http://localhost:5174
```

## Tests
- Unit/Integration (Vitest + RTL)
```bash
npm run test
```
- End-to-End (Playwright)
```bash
npx playwright install
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:report
```

## Deploy (Vercel)
- Dashboard: Import GitHub repo → Framework: Vite → Build: `npm run build` → Output: `dist`
- CLI (optional):
```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```
- SPA deep-link support (optional `vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Project Structure
- `src/components/Flashcard.tsx`: Flip card (Spanish ⇄ English)
- `src/data/flashcards.ts`: Static content (categories: animals, food, verbs)
- `src/pages/*`:
  - `HomePage.tsx`: Nav to Study/Quiz/Stats
  - `StudyCategorySelectionPage.tsx` → `StudySessionPage.tsx`
  - `RedoStudySessionPage.tsx`
  - `QuizCategorySelectionPage.tsx` → `MultipleChoiceQuizPage.tsx` / `FillBlankQuizPage.tsx`
  - `StatsPage.tsx`
- `src/state/*`:
  - `WrongCardsContext.tsx`: Stores wrong cards per category
  - `StatsContext.tsx`: Tracks studied/correct/wrong with localStorage
- `src/utils/text.ts`: `normalizeAnswer`, `formatCategoryLabel`
- Tests: `src/__tests__/*`, E2E in `tests-e2e/*`

## Data Format
Example (multiple choice):
```ts
type QuizInfo =
  | { type: 'multiple-choice'; options: string[] }
  | { type: 'fill-in-the-blank' };

type Flashcard = {
  category: 'animals' | 'food' | 'verbs';
  spanish: string;
  english: string;
  quiz: QuizInfo;
};
```

## Key Flows
- Study
  - Flip card → show “Right”/“Wrong”
  - Tracks wrong cards (session + context)
- Redo
  - Uses `WrongCardsContext` for previous session’s wrong cards
- Quiz (MC)
  - 4 options from data; instant feedback; Next
- Quiz (FIB)
  - Input answer; case-insensitive check; feedback; Next
- Stats
  - Totals and per-category; accuracy %; reset all; persisted to localStorage

## State & Persistence
- `StatsContext.recordAnswer(category, isCorrect)` increments totals
- Local storage key: `stats:v1`
- `WrongCardsContext` set/get/reset per category

## Git Basics
```bash
git add -A
git commit -m "feat: ... "
git remote -v
git push -u origin main
```
- Use PAT for HTTPS pushes; credential helper: `git config --global credential.helper osxkeychain`

## Troubleshooting
- “npm: command not found”: install Node (Homebrew or nvm)
- Port busy: `lsof -i :5173` → kill PID or run on 5174
- Tests: ensure `npx playwright install`; run unit tests separate from E2E
- Stats not updating: clear localStorage or click “Reset All Stats” on Stats page

## FAQs
- Deep links 404 on prod: add `vercel.json` rewrites
- Add new cards: update `src/data/flashcards.ts`
- New categories: extend types, data, and any UI lists accordingly


