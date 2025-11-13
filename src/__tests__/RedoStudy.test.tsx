import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import RedoStudyStudyPage from '../pages/RedoStudySessionPage';
import { WrongCardsProvider, useWrongCards } from '../state/WrongCardsContext';
import { StatsProvider } from '../state/StatsContext';
import { flashcards } from '../data/flashcards';

function SeedWrongCards({ children }: { children: React.ReactNode }) {
	const wrong = useWrongCards();
	React.useEffect(() => {
		const firstAnimal = flashcards.find(c => c.category === 'animals')!;
		wrong.setWrongCards('animals', [firstAnimal]);
	}, []);
	return <>{children}</>;
}

test('Redo page shows previously wrong cards for the category', async () => {
	render(
		<StatsProvider>
			<WrongCardsProvider>
				<SeedWrongCards>
					<MemoryRouter initialEntries={['/study/animals/redo']}>
						<Routes>
							<Route path="/study/:category/redo" element={<RedoStudyStudyPage />} />
						</Routes>
					</MemoryRouter>
				</SeedWrongCards>
			</WrongCardsProvider>
		</StatsProvider>
	);

	// Should show first wrong card in animals (el gato)
	expect(await screen.findByText('el gato')).toBeInTheDocument();
	expect(screen.getByText(/Card 1 of 1/)).toBeInTheDocument();
});


