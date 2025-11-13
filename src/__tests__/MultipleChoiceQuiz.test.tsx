import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import MultipleChoiceQuizPage from '../pages/MultipleChoiceQuizPage';
import { renderWithProviders } from '../test-utils';

test('Multiple choice shows Spanish, options, feedback, and next', () => {
	// animals first card: "el gato" -> "the cat"; options include "the dog"
	renderWithProviders(<MultipleChoiceQuizPage />, { route: '/quiz/mc/animals', path: '/quiz/mc/:category' });
	expect(screen.getByText('el gato')).toBeInTheDocument();
	fireEvent.click(screen.getByRole('button', { name: 'the dog' }));
	expect(screen.getByText(/Wrong — the answer was: the cat/i)).toBeInTheDocument();
	fireEvent.click(screen.getByRole('button', { name: /Next/i }));
	expect(screen.getByText(/Question 2 of/i)).toBeInTheDocument();
});


