const angularPreset = require('jest-preset-angular/jest-preset');

module.exports = {
  ...angularPreset,
  displayName: 'ngrx-extensions',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/projects/ngrx-extensions',
};
