module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^server$': '<rootDir>/server.ts', // Map "server" to the actual server file
    },
    moduleDirectories: ['node_modules', '<rootDir>'], // Ensure Jest can find the server module
  };
  