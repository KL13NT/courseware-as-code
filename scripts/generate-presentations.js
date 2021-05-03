const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const { Marp } = require('@marp-team/marp-core')

const { generatePdfFilename, sequentialPromises } = require('../lib/utils')
const { getAllSlides } = require('../lib/api')

const {
	courseCode,
	marpConstructorOptions,
} = require('../site.config')

const OUTPUT_PATH = path.resolve(__dirname, '../public')

void (async () => {
	const browser = await puppeteer.launch({
		headless: true,
		printBackground: true,
		displayHeaderFooter: false,
		defaultViewport: {
			width: 1280,
			height: 720,
		},
	})
	const page = await browser.newPage()
	const marp = new Marp(marpConstructorOptions || {})

	const presentations = []
	const promises = getAllSlides(true).map(post => async () => {
		const { original } = post

		console.log('[info] generating pdf file', post.frontmatter.name)

		const { html, css } = marp.render(original)
		await page.setContent(html)
		await page.addStyleTag({ content: css })

		const pdf = await page.pdf({
			preferCSSPageSize: true,
		})

		presentations.push({
			pdf,
			...post,
		})
	})

	await sequentialPromises(promises)
	presentations.forEach(({ pdf, slug }) => {
		const filename = generatePdfFilename(courseCode, slug, 'slides')
		console.log('[info] writing output pdf file', filename)

		fs.writeFileSync(path.resolve(OUTPUT_PATH, filename), pdf)
	})

	await browser.close()
})()
