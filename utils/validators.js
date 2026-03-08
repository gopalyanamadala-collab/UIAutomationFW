import { expect } from '@playwright/test';

export async function expectJsonProperty(response, path, expected) {
  const body = await response.json();
  // simple dot-path access
  const parts = path.split('.');
  let cur = body;
  for (const p of parts) cur = cur?.[p];
  expect(cur).toEqual(expected);
}
