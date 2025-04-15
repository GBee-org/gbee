import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

const HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const PORT = Number(process.env.SERVER_PORT) || 5000;

const pgUrl = process.env.DATABASE_URL || '';

const username = process.env.DEFAULT_USER_NAME || 'UserName';
const email = process.env.DEFAULT_USER_EMAIL || 'user@example.com';
const password = process.env.DEFAULT_USER_PASSWORD || 'user_password';

export const ServerConfig = {
  HOSTNAME,
  PORT
};

export const postgres = {
  pgUrl,
};

export const defaultUser = {
  username,
  email,
  password
}