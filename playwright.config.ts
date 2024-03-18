import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './src/tests',
	timeout: 20 * 2000,
	expect: {
		timeout: 5 * 2000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// reporter: [['html', { open: 'never' }]],
	reporter: 'list',
	use: {
		testIdAttribute: 'data-id',
		baseURL: 'http://localhost:6006',
		screenshot: process.env.CI ? 'off' : 'only-on-failure',
		trace: 'on-first-retry',
		actionTimeout: 10000,
		navigationTimeout: 10000,
		viewport: {
			width: 1200,
			height: 1800,
		},
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'Microsoft Edge',
			use: { channel: 'msedge' },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		// {
		// 	name: 'Mobile Chrome',
		// 	use: { ...devices['Pixel 5'] },
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: { ...devices['iPhone 12'] },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
});
