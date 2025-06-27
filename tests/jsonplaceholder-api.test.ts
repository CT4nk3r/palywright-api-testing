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

  test('GET /albums/1/photos should return photos for album 1', async () => {
    const res = await api.get('/albums/1/photos');
    const photos = await res.json();

    expect(res.status()).toBe(200);
    expect(photos.length).toBeGreaterThan(0);
    expect(photos[0]).toHaveProperty('albumId', 1);
  });

  test('GET /users/1/albums should return albums for user 1', async () => {
    const res = await api.get('/users/1/albums');
    const albums = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(albums[0]).toHaveProperty('userId', 1);
  });
});
