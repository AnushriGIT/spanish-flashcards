export type QuizInfo =
	| { type: 'multiple-choice'; options: string[] }
	| { type: 'fill-in-the-blank' };

export type Flashcard = {
	category: 'animals' | 'food' | 'verbs';
	spanish: string;
	english: string;
	quiz: QuizInfo;
};

export const flashcards: Flashcard[] = [
	// Animals
	{
		category: 'animals',
		spanish: 'el gato',
		english: 'the cat',
		quiz: { type: 'multiple-choice', options: ['the dog', 'the house', 'the cat', 'the bird'] }
	},
	{
		category: 'animals',
		spanish: 'el perro',
		english: 'the dog',
		quiz: { type: 'multiple-choice', options: ['the dog', 'the fish', 'the horse', 'the cow'] }
	},
	{
		category: 'animals',
		spanish: 'el pájaro',
		english: 'the bird',
		quiz: { type: 'multiple-choice', options: ['the fish', 'the bird', 'the cat', 'the mouse'] }
	},
	// Food
	{
		category: 'food',
		spanish: 'la manzana',
		english: 'the apple',
		quiz: { type: 'multiple-choice', options: ['the banana', 'the orange', 'the apple', 'the bread'] }
	},
	{
		category: 'food',
		spanish: 'el pan',
		english: 'the bread',
		quiz: { type: 'multiple-choice', options: ['the cheese', 'the bread', 'the butter', 'the milk'] }
	},
	{
		category: 'food',
		spanish: 'el queso',
		english: 'the cheese',
		quiz: { type: 'multiple-choice', options: ['the milk', 'the yogurt', 'the butter', 'the cheese'] }
	},
	// Verbs
	{
		category: 'verbs',
		spanish: 'correr',
		english: 'to run',
		quiz: { type: 'multiple-choice', options: ['to eat', 'to sleep', 'to run', 'to walk'] }
	},
	{
		category: 'verbs',
		spanish: 'comer',
		english: 'to eat',
		quiz: { type: 'multiple-choice', options: ['to eat', 'to drink', 'to cook', 'to write'] }
	},
	{
		category: 'verbs',
		spanish: 'hablar',
		english: 'to speak',
		quiz: { type: 'multiple-choice', options: ['to hear', 'to speak', 'to read', 'to write'] }
	}
];

export const categories = ['animals', 'food', 'verbs'] as const;


