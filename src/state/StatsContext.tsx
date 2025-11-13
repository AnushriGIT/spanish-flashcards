import React from 'react';
import type { CategoryKey } from '../data/flashcards';

export type StatsPerCategory = {
	studied: number;
	correct: number;
	wrong: number;
};

export type StatsState = Record<CategoryKey, StatsPerCategory>;

type StatsContextValue = {
	getStats: () => StatsState;
	recordAnswer: (category: CategoryKey, isCorrect: boolean) => void;
	resetAll: () => void;
};

const STORAGE_KEY = 'stats:v1';

const defaultCategoryStats: StatsPerCategory = { studied: 0, correct: 0, wrong: 0 };
const defaultState: StatsState = {
	animals: { ...defaultCategoryStats },
	food: { ...defaultCategoryStats },
	verbs: { ...defaultCategoryStats }
};

// Provides application-wide study/quiz statistics with localStorage persistence.
const StatsContext = React.createContext<StatsContextValue | undefined>(undefined);

function loadInitial(): StatsState {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultState;
		const parsed = JSON.parse(raw) as Partial<StatsState>;
		return {
			animals: { ...defaultCategoryStats, ...(parsed.animals ?? {}) },
			food: { ...defaultCategoryStats, ...(parsed.food ?? {}) },
			verbs: { ...defaultCategoryStats, ...(parsed.verbs ?? {}) }
		};
	} catch {
		return defaultState;
	}
}

export function StatsProvider(props: { children: React.ReactNode }): JSX.Element {
	// Initialize from localStorage and persist on every change.
	const [state, setState] = React.useState<StatsState>(loadInitial);

	React.useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {
			// ignore storage errors
		}
	}, [state]);

	const value = React.useMemo<StatsContextValue>(() => ({
		getStats: () => state,
		recordAnswer: (category, isCorrect) => {
			setState(prev => {
				const cat = prev[category] ?? { ...defaultCategoryStats };
				const next: StatsPerCategory = {
					studied: cat.studied + 1,
					correct: cat.correct + (isCorrect ? 1 : 0),
					wrong: cat.wrong + (isCorrect ? 0 : 1)
				};
				return { ...prev, [category]: next };
			});
		},
		resetAll: () => setState(defaultState)
	}), [state]);

	return <StatsContext.Provider value={value}>{props.children}</StatsContext.Provider>;
}

export function useStats(): StatsContextValue {
	const ctx = React.useContext(StatsContext);
	if (!ctx) throw new Error('useStats must be used within a StatsProvider');
	return ctx;
}


