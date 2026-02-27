import { test, expect } from '@playwright/test';

test.describe('Rocket Management API', () => {
  let rocketId: string;

  test('Scenario: Create a rocket with valid fields', async ({ request }) => {
    const response = await request.post('/rockets', {
      data: {
        name: 'Orion',
        range: 'moon',
        capacity: 4,
      },
    });

    expect(response.status()).toBe(201);

    const rocket = await response.json();
    expect(rocket).toHaveProperty('id');
    expect(rocket).toHaveProperty('name', 'Orion');
    expect(rocket).toHaveProperty('range', 'moon');
    expect(rocket).toHaveProperty('capacity', 4);

    rocketId = rocket.id;
  });

  test('Scenario: Reject create when name is missing', async ({ request }) => {
    const response = await request.post('/rockets', {
      data: {
        range: 'orbital',
        capacity: 3,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'validation_error');
    expect(error.details).toContain('name is required');
  });

  test('Scenario: Reject update when name is missing', async ({ request }) => {
    const createResp = await request.post('/rockets', {
      data: {
        name: 'Falcon',
        range: 'orbital',
        capacity: 3,
      },
    });
    const { id } = await createResp.json();

    const response = await request.put(`/rockets/${id}`, {
      data: {
        range: 'moon',
        capacity: 5,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'validation_error');
    expect(error.details).toContain('name is required');
  });

  test('Scenario: Reject create when range is invalid', async ({ request }) => {
    const response = await request.post('/rockets', {
      data: {
        name: 'InvalidRocket',
        range: 'invalid_range',
        capacity: 2,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'validation_error');
    expect(error.details).toContain('range must be one of suborbital, orbital, moon, mars');
  });

  test('Scenario: Reject update when range is invalid', async ({ request }) => {
    const createResp = await request.post('/rockets', {
      data: {
        name: 'Falcon',
        range: 'orbital',
        capacity: 3,
      },
    });
    const { id } = await createResp.json();

    const response = await request.put(`/rockets/${id}`, {
      data: {
        name: 'Falcon',
        range: 'invalid_range',
        capacity: 3,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'validation_error');
  });

  test('Scenario: Reject create when capacity is out of bounds (below 1)', async ({ request }) => {
    const response = await request.post('/rockets', {
      data: {
        name: 'SmallRocket',
        range: 'suborbital',
        capacity: 0,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.details).toContain('capacity must be between 1 and 10');
  });

  test('Scenario: Reject create when capacity is out of bounds (above 10)', async ({ request }) => {
    const response = await request.post('/rockets', {
      data: {
        name: 'HugeRocket',
        range: 'mars',
        capacity: 11,
      },
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.details).toContain('capacity must be between 1 and 10');
  });

  test('Scenario: List all rockets', async ({ request }) => {
    await request.post('/rockets', {
      data: {
        name: 'Rocket1',
        range: 'orbital',
        capacity: 2,
      },
    });

    await request.post('/rockets', {
      data: {
        name: 'Rocket2',
        range: 'moon',
        capacity: 4,
      },
    });

    const response = await request.get('/rockets');

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('items');
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items.length).toBeGreaterThanOrEqual(2);
  });

  test('Scenario: Get an existing rocket by identifier', async ({ request }) => {
    const createResp = await request.post('/rockets', {
      data: {
        name: 'GetTest',
        range: 'orbital',
        capacity: 3,
      },
    });
    const { id } = await createResp.json();

    const response = await request.get(`/rockets/${id}`);

    expect(response.status()).toBe(200);

    const rocket = await response.json();
    expect(rocket).toHaveProperty('id', id);
    expect(rocket).toHaveProperty('name', 'GetTest');
  });

  test('Scenario: Get a rocket by identifier that does not exist', async ({ request }) => {
    const response = await request.get('/rockets/nonexistent-id-99999');

    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error).toHaveProperty('error', 'not_found');
  });

  test('Scenario: Update an existing rocket', async ({ request }) => {
    const createResp = await request.post('/rockets', {
      data: {
        name: 'OriginalName',
        range: 'orbital',
        capacity: 3,
      },
    });
    const { id } = await createResp.json();

    const updateResp = await request.put(`/rockets/${id}`, {
      data: {
        name: 'UpdatedName',
        range: 'moon',
        capacity: 5,
      },
    });

    expect(updateResp.status()).toBe(200);

    const updated = await updateResp.json();
    expect(updated).toHaveProperty('id', id);
    expect(updated).toHaveProperty('name', 'UpdatedName');
    expect(updated).toHaveProperty('range', 'moon');
    expect(updated).toHaveProperty('capacity', 5);
  });

  test('Scenario: Delete an existing rocket', async ({ request }) => {
    const createResp = await request.post('/rockets', {
      data: {
        name: 'ToDelete',
        range: 'suborbital',
        capacity: 2,
      },
    });
    const { id } = await createResp.json();

    const deleteResp = await request.delete(`/rockets/${id}`);

    expect(deleteResp.status()).toBe(200);

    const result = await deleteResp.json();
    expect(result).toHaveProperty('status', 'deleted');
    expect(result).toHaveProperty('id', id);

    const getResp = await request.get(`/rockets/${id}`);
    expect(getResp.status()).toBe(404);
  });

  test('Scenario: All valid range values accepted', async ({ request }) => {
    const ranges: Array<'suborbital' | 'orbital' | 'moon' | 'mars'> = ['suborbital', 'orbital', 'moon', 'mars'];

    for (const range of ranges) {
      const response = await request.post('/rockets', {
        data: {
          name: `Rocket-${range}`,
          range,
          capacity: 5,
        },
      });

      expect(response.status()).toBe(201);
      const rocket = await response.json();
      expect(rocket.range).toBe(range);
    }
  });
});
