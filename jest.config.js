  module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^server$': '<rootDir>/server.ts',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
};

  