module.exports = {
	clearMocks: true,
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	coverageReporters: ['json-summary', 'html', 'text', 'lcov'],
	testMatch: ['./**/*.test.js'],
}
