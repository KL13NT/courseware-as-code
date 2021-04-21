const React = require('react')
const { componentToPdf } = require('./componentToPdf')

describe('componentToPdf', () => {
	it('should return a buffer', async () => {
		expect(await componentToPdf(React.createElement('h1'))).toBeInstanceOf(
			Buffer
		)
	})
})
