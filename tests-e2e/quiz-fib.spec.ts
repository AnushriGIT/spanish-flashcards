import { test, expect } from '@playwright/test';

test('Fill in the Blank accepts case-insensitive correct answer', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Quiz Mode' }).click();
	await page.getByRole('button', { name: 'Fill in the Blank' }).click();
	await page.getByRole('link', { name: 'Verbs' }).click();

	// "correr" -> "to run"
	await expect(page.getByText('correr')).toBeVisible();
	const input = page.getByPlaceholder('Type the English word');
	await input.fill('To RUN');
	await page.getByRole('button', { name: 'Check' }).click();
	await expect(page.getByText(/Correct!/i)).toBeVisible();
});


