import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import QuizCategorySelectionPage from '../pages/QuizCategorySelectionPage';
import { renderWithProviders } from '../test-utils';

test('Quiz selection toggles type and updates category links', () => {
	renderWithProviders(<QuizCategorySelectionPage />);
	// Default selected is Multiple Choice, category link should go to /quiz/mc/animals
	const animalsMc = screen.getByText('Animals').closest('a');
	expect(animalsMc).toHaveAttribute('href', '/quiz/mc/animals');

	// Switch to Fill in the Blank
	fireEvent.click(screen.getByText('Fill in the Blank'));
	const animalsFib = screen.getByText('Animals').closest('a');
	expect(animalsFib).toHaveAttribute('href', '/quiz/fib/animals');
});


