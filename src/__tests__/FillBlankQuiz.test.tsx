import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FillBlankQuizPage from '../pages/FillBlankQuizPage';
import { renderWithProviders } from '../test-utils';

test('Fill-in-the-Blank accepts case-insensitive correct answer', () => {
	// verbs first card: "correr" -> "to run"
	renderWithProviders(<FillBlankQuizPage />, { route: '/quiz/fib/verbs', path: '/quiz/fib/:category' });
	expect(screen.getByText('correr')).toBeInTheDocument();
	const input = screen.getByPlaceholderText(/Type the English word/i);
	fireEvent.change(input, { target: { value: 'To RUN' } });
	fireEvent.click(screen.getByRole('button', { name: /Check/i }));
	expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
});


