import React from 'react';
import type { Flashcard, CategoryKey } from '../data/flashcards';

export type WrongCardsState = Record<CategoryKey, Flashcard[]>;

type WrongCardsContextValue = {
	getWrongCards: (category: CategoryKey) => Flashcard[];
	setWrongCards: (category: CategoryKey, cards: Flashcard[]) => void;
	resetWrongCards: (category: CategoryKey) => void;
	resetAll: () => void;
};

// Tracks "wrong" cards per category across sessions to support a redo flow.
const WrongCardsContext = React.createContext<WrongCardsContextValue | undefined>(undefined);

export function WrongCardsProvider(props: { children: React.ReactNode }): JSX.Element {
	const [state, setState] = React.useState<WrongCardsState>({});

	const value = React.useMemo<WrongCardsContextValue>(() => ({
		getWrongCards: (category: CategoryKey) => state[category] ?? [],
		setWrongCards: (category: CategoryKey, cards: Flashcard[]) => {
			setState(prev => ({ ...prev, [category]: cards }));
		},
		resetWrongCards: (category: CategoryKey) => {
			setState(prev => {
				const next = { ...prev };
				delete next[category];
				return next;
			});
		},
		resetAll: () => setState({})
	}), [state]);

	return <WrongCardsContext.Provider value={value}>{props.children}</WrongCardsContext.Provider>;
}

export function useWrongCards(): WrongCardsContextValue {
	const ctx = React.useContext(WrongCardsContext);
	if (!ctx) {
		throw new Error('useWrongCards must be used within a WrongCardsProvider');
	}
	return ctx;
}


