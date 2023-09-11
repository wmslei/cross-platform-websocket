/* eslint-disable import/no-default-export */
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
