import client from './client';

export const login = ({ username, password }) =>
  client.post('/auth/login', { username, password });

export const register = ({ username, password, nickname, adminCode }) =>
  client.post('/auth/register', { username, password, nickname, adminCode });

export const check = () => client.get('/auth/check');

export const logout = () => client.post('/auth/logout');
