const { htmlToPdf } = require('./htmlToPdf')
const puppeteer = require('puppeteer')

let browser = null
let page = null

beforeAll(async () => {
	browser = await puppeteer.launch()
	page = await browser.newPage()
})

afterAll(async () => {
	browser.close()
})

/**
 * These tests will fail without the styling/layout.css
 */
describe('htmlToPdf', () => {
	it('should return a buffer', async () => {
		const buffer = await htmlToPdf({ page, html: '<h1/>' })
		expect(buffer).toBeInstanceOf(Buffer)
	})

	it('should return different buffers depending on css differences', async () => {
		const buffer = await htmlToPdf({
			page,
			html: '<h1><h1/>',
			css: '*{background: black}',
		})
		expect(
			await htmlToPdf({
				page,
				html: '<h1><h1/>',
				css: '*{background: red}',
			})
		).not.toHaveLength(buffer.length)
	})
})
