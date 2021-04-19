const React = require('react')
const { renderToString } = require('react-dom/server')
const { getPage } = require('./puppeteer')

/**
 * @param {React.ReactElement} component
 */
async function componentToPdf(component, style) {
	const componentString = renderToString(component)

	const page = await getPage()

	await page.setContent(componentString)

	if (style) await page.addStyleTag({ path: style })

	return page.pdf({ displayHeaderFooter: true })
}

module.exports = { componentToPdf }
