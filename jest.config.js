module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Set test environment to Node.js
  moduleNameMapper: {
    '^server$': '<rootDir>/server.ts', // Map "server" to the server file
  },
  moduleDirectories: [
    'node_modules', 
    '<rootDir>' // Allow Jest to resolve modules relative to the root directory
  ],
  testMatch: [
    '**/tests/**/*.test.ts' // Ensure Jest only runs TypeScript test files
  ],
  collectCoverage: true, // Optional: Enable coverage collection
  coverageDirectory: 'coverage', // Optional: Output coverage reports
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignore node_modules from coverage
    '<rootDir>/server.ts' // Ignore server.ts if necessary
  ]
};
