import { expect } from '@playwright/test';

/**
 * Lightweight API client helpers that use Playwright's `request` fixture.
 */
export async function apiGet(request, url, options = {}) {
  const res = await request.get(url, options);
  return res;
}

export async function apiPost(request, url, data, options = {}) {
  const res = await request.post(url, { data, ...options });
  return res;
}

export async function expectStatus(response, status) {
  expect(response.status()).toBe(status);
}
