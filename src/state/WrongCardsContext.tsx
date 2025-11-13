import React from 'react';
import type { Flashcard } from '../data/flashcards';

export type WrongCardsState = Record<string, Flashcard[]>;

type WrongCardsContextValue = {
	getWrongCards: (category: string) => Flashcard[];
	setWrongCards: (category: string, cards: Flashcard[]) => void;
	resetWrongCards: (category: string) => void;
	resetAll: () => void;
};

const WrongCardsContext = React.createContext<WrongCardsContextValue | undefined>(undefined);

export function WrongCardsProvider(props: { children: React.ReactNode }): JSX.Element {
	const [state, setState] = React.useState<WrongCardsState>({});

	const value = React.useMemo<WrongCardsContextValue>(() => ({
		getWrongCards: (category: string) => state[category] ?? [],
		setWrongCards: (category: string, cards: Flashcard[]) => {
			setState(prev => ({ ...prev, [category]: cards }));
		},
		resetWrongCards: (category: string) => {
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


