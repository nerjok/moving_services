module.exports = {
  verbose: true,
  roots: ['./'],
  testEnvironment: "node",
  globalSetup: "./config/tests/setup.js",
  globalTeardown: "./config/tests/teardown.js",
  collectCoverage: true,
  testMatch: ["**/tests/*.test.js"],
  collectCoverageFrom: [
    "<rootDir>/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/config/**",
    "!**/coverage/**",
    "!**/routes/**",
    "!<rootDir>/client/**",
    "!*.js"
  ]
};
