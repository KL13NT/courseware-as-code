const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const { generatePdfFilename, sequentialPromises } = require('../lib/utils')
const { getAllPosts, unifiedMarkdownToHtml } = require('../lib/api')
const { htmlToPdf } = require('../lib/htmlToPdf')

const { courseCode, lectureStyles } = require('../site.config')
const OUTPUT_PATH = path.resolve(__dirname, '../public')

void (async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	// Reading style files and transforming them using postcss
	const styles = lectureStyles
		.map(file => fs.readFileSync(file, 'utf-8'))
		.join('\n\n')

	const { css } = await postcss([tailwindcss, autoprefixer]).process(styles, {
		from: undefined,
	})

	const results = []
	const promises = getAllPosts(true).map(post => async () => {
		const { content, frontmatter } = post
		const md = `# ${frontmatter.name}\n\n${frontmatter.description}\n\n---\n\n${content}`

		const { contents: html } = await unifiedMarkdownToHtml(md)

		console.log('[info] generating pdf file', frontmatter.name)

		const pdf = await htmlToPdf({ page, html, styleContents: css })

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
