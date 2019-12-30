module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest':{
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  }
};
