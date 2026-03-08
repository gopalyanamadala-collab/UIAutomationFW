import { test, expect } from '@playwright/test';
import { apiGet, apiPost, expectStatus } from '../../utils/apiClient.js';

test.describe('API - sample', () => {
  test('GET root returns 200', async ({ request }) => {
    const base = process.env.BASE_URL || 'https://playwright.dev';
    const res = await apiGet(request, base + '/');
    await expectStatus(res, 200);
  });

  test('POST example (echo) should return 200', async ({ request }) => {
    const echoUrl = process.env.API_ECHO || 'https://postman-echo.com/post';
    const payload = { hello: 'world' };
    const res = await apiPost(request, echoUrl, payload);
    await expectStatus(res, 200);
    const body = await res.json();
    expect(body.data || body.json).toBeTruthy();
  });
});
