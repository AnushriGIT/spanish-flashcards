import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { StatsProvider } from './state/StatsContext';
import { WrongCardsProvider } from './state/WrongCardsContext';

export function renderWithProviders(ui: React.ReactElement, options?: { route?: string; path?: string }) {
	const route = options?.route ?? '/';
	const path = options?.path ?? '/';
	return render(
		<StatsProvider>
			<WrongCardsProvider>
				<MemoryRouter initialEntries={[route]}>
					<Routes>
						<Route path={path} element={ui} />
					</Routes>
				</MemoryRouter>
			</WrongCardsProvider>
		</StatsProvider>
	);
}


