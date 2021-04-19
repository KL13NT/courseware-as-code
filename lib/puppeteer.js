const puppeteer = require('puppeteer')

let browser = null
let page = null

/**
 *
 * @returns {Promise<puppeteer.Page>}
 */
async function getPage() {
	if (browser && page) return page

	browser = await puppeteer.launch({
		headless: true
	})

	page = await browser.newPage()

	return page
}

module.exports = { getPage }
