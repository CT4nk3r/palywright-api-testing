import { test, expect, request } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  let api;

  test.beforeAll(async ({ playwright }) => {
    api = await request.newContext({
      baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    });
  });

  test('GET /posts/1/comments should return comments for post 1', async () => {
    const res = await api.get('/posts/1/comments');
    expect(res.ok()).toBeTruthy();

    const comments = await res.json();
    expect(Array.isArray(comments)).toBe(true);
    expect(comments[0]).toHaveProperty('postId', 1);
  });
});
