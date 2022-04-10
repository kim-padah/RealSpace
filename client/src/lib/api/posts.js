import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/posts', { title, body, tags });
