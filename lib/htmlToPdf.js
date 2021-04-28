const path = require('path')

/**
 * @param {import('puppeteer').Page} page
 * @param {string} html
 * @param {string[]} style
 * @param {import('puppeteer').PDFOptions} options
 */
async function htmlToPdf(page, html, style, options = {}) {
	await page.setContent(html)

	if (style) {
		if (!Array.isArray(style))
			throw Error('`style` must be an array containing paths to style files')

		await Promise.all(
			style.map(p =>
				page.addStyleTag({
					path: path.resolve(__dirname, p),
				})
			)
		)
	}

	return page.pdf({
		displayHeaderFooter: true,
		printBackground: true,
		...options,
	})
}

module.exports = { htmlToPdf }
