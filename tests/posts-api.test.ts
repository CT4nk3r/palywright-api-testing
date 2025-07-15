import { test, expect, request } from '@playwright/test';
import { post1, comment1 } from './fixtures';

test.describe('JSONPlaceholder Posts API Tests', () => {
  let api;

  test.beforeAll(async ({ playwright }) => {
    api = await request.newContext({
      baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    });
  });

  test('GET /posts/1 should return post 1', async () => {
    const res = await api.get('/posts/1');
    expect(res.ok()).toBeTruthy();

    const post = await res.json();
    expect(post).toEqual(post1);
  });

  test('GET /posts/1/comments should return comments for post 1', async () => {
    const res = await api.get('/posts/1/comments');
    const comments = await res.json();

    expect(res.status()).toBe(200);
    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0]).toHaveProperty('postId', comment1.postId);
  });

  test('POST /posts should create a new post', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const res = await api.post('/posts', {
      data: newPost,
    });

    expect(res.status()).toBe(201);
    const createdPost = await res.json();
    expect(createdPost).toMatchObject(newPost);
  });

  test('PUT /posts/1 should update post 1', async () => {
    const updatedPost = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const res = await api.put('/posts/1', {
      data: updatedPost,
    });

    expect(res.status()).toBe(200);
    const updatedPostResponse = await res.json();
    expect(updatedPostResponse).toEqual(updatedPost);
  });

  test('PATCH /posts/1 should update the title of post 1', async () => {
    const patchData = {
      title: 'foo',
    };

    const res = await api.patch('/posts/1', {
      data: patchData,
    });

    expect(res.status()).toBe(200);
    const patchedPost = await res.json();
    expect(patchedPost.title).toBe(patchData.title);
  });

  test('DELETE /posts/1 should delete post 1', async () => {
    const res = await api.delete('/posts/1');
    expect(res.status()).toBe(200);
  });
});