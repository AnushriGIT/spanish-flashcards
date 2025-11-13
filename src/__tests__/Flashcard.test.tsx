import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from '../components/Flashcard';

test('Flashcard shows Spanish by default and flips to English on click', () => {
	render(<Flashcard spanish="el gato" english="the cat" />);
	expect(screen.getByText('el gato')).toBeInTheDocument();
	fireEvent.click(screen.getByRole('button'));
	expect(screen.getByText('the cat')).toBeInTheDocument();
});

test('Flashcard triggers onFlipChange', () => {
	const spy = vi.fn();
	render(<Flashcard spanish="el perro" english="the dog" onFlipChange={spy} />);
	fireEvent.click(screen.getByRole('button'));
	expect(spy).toHaveBeenCalledWith(true);
});


