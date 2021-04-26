module.exports = {
	clearMocks: true,
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	collectCoverageFrom: ['./lib/**/*.js'],
	coverageReporters: ['json-summary', 'html', 'text', 'lcov'],
	testMatch: ['./**/*.test.js'],
	setupFilesAfterEnv: ['./jest.setup.js'],
}
