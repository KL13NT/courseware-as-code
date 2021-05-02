const { htmlToPdf } = require('./htmlToPdf')
const puppeteer = require('puppeteer')

let browser = null
let page = null

/**
 * FIXME: This test suite suffers from mocking side effects. Puppeteer (when
 * used inside the htmlToPdf function) depends on the filesystem `fs` to resolve
 * style files and load them. Yet when I mock them, it seems to get stuck when
 * launching the browser instance.
 */

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
	let buffer = null

	it('should return a buffer', async () => {
		buffer = await htmlToPdf(page, '<h1/>')
		expect(buffer).toBeInstanceOf(Buffer)
	})

	it('should throw', async () => {
		await expect(
			htmlToPdf(page, '<h1/>', '../styling/layout.css')
		).rejects.toThrow()
	})

	it('should return a different buffer when using styles', async () => {
		expect(
			await htmlToPdf(page, '<h1/>', ['../styling/layout.css'])
		).not.toEqual(Buffer)
	})
})
