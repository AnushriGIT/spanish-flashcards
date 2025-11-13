import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests-e2e',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry'
	},
	webServer: {
		command: 'npm run dev -- --port 5173 --strictPort',
		url: 'http://localhost:5173',
		reuseExistingServer: true,
		timeout: 60_000
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
	],
	reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});


