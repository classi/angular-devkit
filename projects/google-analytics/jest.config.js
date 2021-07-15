const angularPreset = require('jest-preset-angular/jest-preset');

module.exports = {
  ...angularPreset,
  displayName: 'google-analytics',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/projects/google-analytics',
};
