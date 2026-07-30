import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['junit', { outputFile: 'results/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.playwright.dev/todomvc',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { headless: false },

    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
            headless: false 
       },
      dependencies: ['setup'],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'api',
    //   testMatch: /.*\.api\.spec\.ts/,
    //   use: { baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com' },
    // },
  ],
  outputDir: 'test-results/',
  globalSetup: './src/utils/globalSetup.ts',
});
