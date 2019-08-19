module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/feature/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js'
  ]
}
