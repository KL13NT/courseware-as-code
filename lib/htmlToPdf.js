// const { getPage } = require('./puppeteer')

/**
 * @param {import('puppeteer').Page} page
 * @param {string} html
 * @param {string[]} style
 * @param {import('puppeteer').PDFOptions} options
 */
async function htmlToPdf(page, html, style, options = {}) {
	await page.setContent(html)

	if (style)
		await Promise.all(
			style.map(path =>
				page.addStyleTag({
					path,
				})
			)
		)

	return page.pdf({ displayHeaderFooter: true, ...options })
}

module.exports = { htmlToPdf }
