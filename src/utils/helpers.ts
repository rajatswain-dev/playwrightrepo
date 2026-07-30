import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Wait for a specified number of milliseconds
 */
export async function wait(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string of given length
 */
export function randomString(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * Generate a random email address
 */
export function randomEmail(domain: string = 'test.com'): string {
  return `test_${randomString(6)}_${Date.now()}@${domain}`;
}

/**
 * Generate a random number between min and max (inclusive)
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Read JSON test data from a file
 */
export function readTestData<T>(filePath: string): T {
  const fullPath = path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw) as T;
}

/**
 * Intercept and mock an API call
 */
export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  responseBody: object,
  statusCode: number = 200
): Promise<void> {
  await page.route(urlPattern, route => {
    route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify(responseBody),
    });
  });
}

/**
 * Wait for network to be idle (no requests for 500ms)
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Retry a function up to maxRetries times
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error = new Error('Unknown error');
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await wait(delayMs);
      }
    }
  }
  throw lastError;
}

/**
 * Capture console errors from the page
 */
export function captureConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

/**
 * Ensure a directory exists, creating it if necessary
 */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
