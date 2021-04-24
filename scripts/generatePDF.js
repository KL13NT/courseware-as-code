const path = require('path')
const fs = require('fs')
const showdown = new (require('showdown').Converter)()
const { courseCode } = require('../site.config')

const { formatDate, generatePdfFilename } = require('../lib/utils')
const { getAllPosts } = require('../lib/api')
const { htmlToPdf } = require('../lib/htmlToPdf')

const OUTPUT_PATH = path.resolve(__dirname, '../public')
const HEADER = '# NAME\n\nDESCRIPTION\n\nDATE\n\n---\n\n'

function sequentialPromises(promises) {
	return promises.reduce(
		(promise, task) => promise.then(task),
		Promise.resolve()
	)
}

void (async () => {
	const results = []
	const promises = getAllPosts('lectures').map(post => async () => {
		const { content, frontmatter } = post
		const md =
			HEADER.replace('NAME', frontmatter.name)
				.replace('DESCRIPTION', frontmatter.description)
				.replace('DATE', formatDate(frontmatter.date)) + content
		const html = showdown.makeHtml(md)

		console.log('[info] generating pdf file', frontmatter.name)

		const pdf = await htmlToPdf(html, [
			path.resolve(__dirname, '../styling/layout.css'),
		])

		results.push({
			pdf,
			...post,
		})
	})

	await sequentialPromises(promises)
	results.forEach(({ pdf, slug }) => {
		const filename = generatePdfFilename(courseCode, slug, 'lecture')
		console.log('[info] writing output pdf file', filename)

		fs.writeFileSync(path.resolve(OUTPUT_PATH, filename), pdf)
	})
})()
