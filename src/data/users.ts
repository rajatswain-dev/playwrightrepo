import { User } from '../types';

export const users: Record<string, User> = {
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@test.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
    name: 'Admin User',
  },
  standard: {
    email: process.env.USER_EMAIL || 'user@test.com',
    password: process.env.USER_PASSWORD || 'User@123',
    role: 'user',
    name: 'Standard User',
  },
  guest: {
    email: 'guest@test.com',
    password: 'Guest@123',
    role: 'guest',
    name: 'Guest User',
  },
};
