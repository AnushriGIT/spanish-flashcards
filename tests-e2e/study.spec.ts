import { test, expect } from '@playwright/test';

test('Study flow: flip card, mark right/wrong, progress', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Study Mode' }).click();
	await page.getByRole('link', { name: 'Animals' }).click();

	// Click the card to flip
	await page.getByRole('button').first().click();

	// Buttons appear only after flip
	await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible();
	await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible();

	// Mark Right, should advance
	await page.getByRole('button', { name: '✅ Right' }).click();
	await expect(page.getByText(/Card 2 of/)).toBeVisible();
});


