import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/utils/apiClient';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CreatePostBody {
  title: string;
  body: string;
  userId: number;
}

test.describe('Posts API', () => {
  let apiClient: ApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ApiClient(request, 'https://jsonplaceholder.typicode.com');
  });

  test('GET /posts - should return list of posts', async () => {
    const { status, body } = await apiClient.get<Post[]>('/posts');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /posts/:id - should return a single post', async () => {
    const { status, body } = await apiClient.get<Post>('/posts/1');

    expect(status).toBe(200);
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');
  });

  test('GET /posts/:id - should return 404 for non-existent post', async () => {
    const { status } = await apiClient.get('/posts/99999');
    expect(status).toBe(404);
  });

  test('POST /posts - should create a new post', async () => {
    const newPost: CreatePostBody = {
      title: 'Test Post Title',
      body: 'This is the body of the test post.',
      userId: 1,
    };

    const { status, body } = await apiClient.post<Post>('/posts', newPost);

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
  });

  test('PUT /posts/:id - should update a post', async () => {
    const updatedPost: Post = {
      id: 1,
      userId: 1,
      title: 'Updated Title',
      body: 'Updated body content',
    };

    const { status, body } = await apiClient.put<Post>('/posts/1', updatedPost);

    expect(status).toBe(200);
    expect(body.title).toBe('Updated Title');
  });

  test('PATCH /posts/:id - should partially update a post', async () => {
    const { status, body } = await apiClient.patch<Post>('/posts/1', {
      title: 'Patched Title',
    });

    expect(status).toBe(200);
    expect(body.title).toBe('Patched Title');
  });

  test('DELETE /posts/:id - should delete a post', async () => {
    const { status } = await apiClient.delete('/posts/1');
    expect(status).toBe(200);
  });

  test('GET /posts with query params - should filter posts by userId', async () => {
    const { status, body } = await apiClient.get<Post[]>('/posts', { userId: '1' });

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    body.forEach(post => {
      expect(post.userId).toBe(1);
    });
  });
});
