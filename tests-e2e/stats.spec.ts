import { test, expect } from '@playwright/test';

test('Stats page shows totals and per-category breakdown (seeded)', async ({ page }) => {
	await page.addInitScript(() => {
		localStorage.setItem(
			'stats:v1',
			JSON.stringify({
				animals: { studied: 4, correct: 3, wrong: 1 },
				food: { studied: 2, correct: 1, wrong: 1 },
				verbs: { studied: 0, correct: 0, wrong: 0 }
			})
		);
	});
	await page.goto('/stats');
	await expect(page.getByText('Total studied: 6')).toBeVisible();
	await expect(page.getByText('Correct: 4')).toBeVisible();
	await expect(page.getByText('Incorrect: 2')).toBeVisible();
	await expect(page.getByText('Animals')).toBeVisible();
	await expect(page.getByText('Studied: 4')).toBeVisible();
});


