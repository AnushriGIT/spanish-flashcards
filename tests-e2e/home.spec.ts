import { test, expect } from '@playwright/test';

test('Home shows navigation buttons', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'Study Mode' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Quiz Mode' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Stats Page' })).toBeVisible();
});


