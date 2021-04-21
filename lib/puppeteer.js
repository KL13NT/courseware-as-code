const puppeteer = require('puppeteer')

/**@type {puppeteer.Browser} */
let browser = null
/**@type {puppeteer.Page} */
let page = null

/**
 *
 * @returns {Promise<puppeteer.Page>}
 */
async function getPage() {
	if (browser && page) return page

	browser = await puppeteer.launch({
		headless: true,
	})

	page = await browser.newPage()

	return page
}

async function terminate() {
	if (browser) return browser.close()
}

module.exports = { getPage, terminate }
