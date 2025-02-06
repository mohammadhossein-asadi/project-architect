const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'src/testing/e2e/cypress/support/index.ts'
  }
});