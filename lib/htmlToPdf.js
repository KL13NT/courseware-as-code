const { getPage } = require('./puppeteer')

/**
 * @param {string} html
 * @param {string[]} style
 */
async function htmlToPdf(html, style) {
	const page = await getPage()

	await page.setContent(html)

	if (style)
		await Promise.all(
			style.map(path =>
				page.addStyleTag({
					path,
				})
			)
		)

	return page.pdf({ displayHeaderFooter: true })
}

module.exports = { htmlToPdf }
