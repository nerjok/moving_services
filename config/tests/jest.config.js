module.exports = {
  verbose: true,
  roots: ['../../tests'],
  testEnvironment: "node",
  globalSetup: "./setup.js",
  globalTeardown: "./teardown.js",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "../../../**"
  ]
};
