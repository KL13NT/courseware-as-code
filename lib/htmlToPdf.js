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
		margin: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		},
		...options,
		headerTemplate:
			"<footer style='font-size: 10px; padding: 5px; text-align: center; width: 100%;'></footer>",
		footerTemplate:
			"<footer style='font-size: 10px; padding: 5px; text-align: center; width: 100%;'><span class='pageNumber'></span>/<span class='totalPages'></span></footer>",
	})
}

module.exports = { htmlToPdf }
