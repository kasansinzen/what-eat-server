const { pathsToModuleNameMapper } = require('ts-jest');
// eslint-disable-next-line import/extensions
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@module/(.*)$": ["<rootDir>/module/$1"],
    "^@core/(.*)$": ["<rootDir>/core/$1"]
  },
  modulePaths: [
    '<rootDir>'
  ],
}