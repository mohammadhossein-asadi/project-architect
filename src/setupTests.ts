import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

// Add custom matchers
expect.extend({
  toBeValidPackageName(received: string) {
    const regex = /^[a-z0-9-_.]+$/;
    const pass = regex.test(received);
    return {
      message: () =>
        `expected ${received} to be a valid package name`,
      pass,
    };
  },
});