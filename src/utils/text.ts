// Utilities for common string operations used across quiz and study flows.

import type { CategoryKey } from '../data/flashcards';

// Normalizes user input and answers for case-insensitive, whitespace-agnostic comparison.
export function normalizeAnswer(value: string): string {
	return value.toLowerCase().trim();
}

// Formats a category key to a user-friendly label (e.g., "animals" -> "Animals").
export function formatCategoryLabel(category: CategoryKey): string {
	return category[0].toUpperCase() + category.slice(1);
}


