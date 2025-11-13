import { test, expect } from '@playwright/test';

test('Multiple Choice quiz shows prompt, options, feedback, and next', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Quiz Mode' }).click();
	// Ensure MC selected
	await page.getByRole('button', { name: 'Multiple Choice' }).click();
	await page.getByRole('link', { name: 'Animals' }).click();

	// First card is "el gato" -> "the cat"
	await expect(page.getByText('el gato')).toBeVisible();

	// Click a wrong option like "the dog"
	await page.getByRole('button', { name: 'the dog' }).click();
	await expect(page.getByText(/Wrong — the answer was: the cat/i)).toBeVisible();

	// Next advances
	await page.getByRole('button', { name: 'Next' }).click();
	await expect(page.getByText(/Question 2 of/)).toBeVisible();
});


