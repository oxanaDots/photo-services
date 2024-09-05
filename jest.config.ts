import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Use ts-jest to transpile TypeScript files
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Match test files
  // Uncomment the following line if you're using ES Modules and have "type": "module" in package.json
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore dist directory

};

export default config;

