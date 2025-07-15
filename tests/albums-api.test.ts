import { test, expect, request } from '@playwright/test';
import { album1, photo1 } from './fixtures';

test.describe('JSONPlaceholder Albums API Tests', () => {
  let api;

  test.beforeAll(async ({ playwright }) => {
    api = await request.newContext({
      baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    });
  });

  test('GET /albums/1 should return album 1', async () => {
    const res = await api.get('/albums/1');
    expect(res.ok()).toBeTruthy();

    const album = await res.json();
    expect(album).toEqual(album1);
  });

  test('GET /albums/1/photos should return photos for album 1', async () => {
    const res = await api.get('/albums/1/photos');
    const photos = await res.json();

    expect(res.status()).toBe(200);
    expect(photos.length).toBeGreaterThan(0);
    expect(photos[0]).toHaveProperty('albumId', photo1.albumId);
  });

  test('GET /users/1/albums should return albums for user 1', async () => {
    const res = await api.get('/users/1/albums');
    const albums = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(albums[0]).toHaveProperty('userId', album1.userId);
  });
});