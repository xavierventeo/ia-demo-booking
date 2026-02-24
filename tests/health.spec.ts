import { test, expect } from '@playwright/test';

test('health endpoint returns ok status', async ({ request }) => {
  const response = await request.get('/health');

  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty('status', 'ok');
  expect(data).toHaveProperty('timestamp');
});
