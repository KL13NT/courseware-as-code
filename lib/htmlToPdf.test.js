const { htmlToPdf } = require('./htmlToPdf')
const puppeteer = require('puppeteer')

describe('htmlToPdf', () => {
	it('should return a buffer', async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		expect(await htmlToPdf(page, '<h1/>')).toBeInstanceOf(Buffer)

		await browser.close()
	})
})
