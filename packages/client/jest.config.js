import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./setup-tests.tsx']
};
