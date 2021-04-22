const { htmlToPdf } = require('./htmlToPdf')

describe('htmlToPdf', () => {
	it('should return a buffer', async () => {
		expect(await htmlToPdf('<h1/>')).toBeInstanceOf(Buffer)
	})
})
