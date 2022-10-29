const { pathsToModuleNameMapper } = require('ts-jest');
// eslint-disable-next-line import/extensions
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "./",
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
    "^@module/(.*)$": ["src/module/$1"],
    "^@core/(.*)$": ["src/core/$1"]
  },
  modulePaths: [
    '<rootDir>'
  ],
}