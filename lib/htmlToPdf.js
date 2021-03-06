/**
 * @param {object} param0
 * @param {import('puppeteer').Page} param0.page
 * @param {string} param0.html
 * @param {string[]} param0.style
 * @param {import('puppeteer').PDFOptions} param0.options
 */
async function htmlToPdf({ page, html, css, options = {} }) {
	await page.setContent(html)

	if (css) {
		await page.addStyleTag({ content: css })
	}

	return page.pdf({
		displayHeaderFooter: true,
		printBackground: true,
		scale: 0.8,
		margin: {
			top: '0.75in',
			bottom: '1.44in',
			left: '0.75in',
			right: '0.52in',
		},
		...options,
		headerTemplate:
			"<footer style='font-size: 10px; padding: 5px; text-align: center; width: 100%;'></footer>",
		footerTemplate:
			"<footer style='font-size: 10px; padding: 5px; text-align: center; width: 100%;'><span class='pageNumber'></span>/<span class='totalPages'></span></footer>",
	})
}

module.exports = { htmlToPdf }
