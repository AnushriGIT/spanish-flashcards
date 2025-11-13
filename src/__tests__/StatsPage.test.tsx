import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StatsPage from '../pages/StatsPage';
import { StatsProvider } from '../state/StatsContext';

test('StatsPage shows totals and per-category breakdown from localStorage', () => {
	// Seed localStorage
	const seed = {
		animals: { studied: 5, correct: 3, wrong: 2 },
		food: { studied: 2, correct: 1, wrong: 1 },
		verbs: { studied: 3, correct: 3, wrong: 0 }
	};
	localStorage.setItem('stats:v1', JSON.stringify(seed));

	render(
		<StatsProvider>
			<MemoryRouter>
				<StatsPage />
			</MemoryRouter>
		</StatsProvider>
	);

	// Overall totals: studied 10, correct 7, wrong 3, accuracy 70%
	expect(screen.getByText(/Total studied: 10/)).toBeInTheDocument();
	expect(screen.getByText(/Correct: 7/)).toBeInTheDocument();
	expect(screen.getByText(/Incorrect: 3/)).toBeInTheDocument();
	expect(screen.getByText(/Accuracy: 70%/)).toBeInTheDocument();

	// Category breakdown checks (spot-check one)
	expect(screen.getByText('Animals')).toBeInTheDocument();
	expect(screen.getByText(/Studied: 5/)).toBeInTheDocument();
});


