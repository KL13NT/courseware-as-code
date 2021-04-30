const path = require('path')
const fs = require('fs')

const puppeteer = require('puppeteer')

const { courseCode, printStyles } = require('../site.config')

const {
	formatDate,
	generatePdfFilename,
	sequentialPromises,
} = require('../lib/utils')
const { getAllPosts, unifiedMarkdownToHtml } = require('../lib/api')
const { htmlToPdf } = require('../lib/htmlToPdf')

const OUTPUT_PATH = path.resolve(__dirname, '../public')
const HEADER = '# NAME\n\nDESCRIPTION\n\nDATE\n\n---\n\n'

void (async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	const results = []
	const promises = getAllPosts(true).map(post => async () => {
		const { content, frontmatter } = post
		const md =
			HEADER.replace('NAME', frontmatter.name)
				.replace('DESCRIPTION', frontmatter.description)
				.replace('DATE', formatDate(frontmatter.date)) + content

		const { contents: html } = await unifiedMarkdownToHtml(md)

		console.log('[info] generating pdf file', frontmatter.name)

		const pdf = await htmlToPdf(page, html, printStyles || [])

		results.push({
			pdf,
			...post,
		})
	})

	await sequentialPromises(promises)

	results.forEach(({ pdf, slug }) => {
		const filename = generatePdfFilename(courseCode, slug, 'lectures')
		console.log('[info] writing output pdf file', filename)

		fs.writeFileSync(path.resolve(OUTPUT_PATH, filename), pdf)
	})

	await browser.close()
})()
