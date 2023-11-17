module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': 'jest-transform-stub'
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  // ... cualquier otra configuración que tengas ...
};
