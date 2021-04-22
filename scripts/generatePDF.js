const path = require('path')
const fs = require('fs')
const showdown = new (require('showdown').Converter)()
const { courseCode } = require('../site.config')

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
				.replace('DATE', frontmatter.date) + content
		const html = showdown.makeHtml(md)

		const pdf = await htmlToPdf(html, [
			path.resolve(__dirname, '../styling/print.css'),
		])

		results.push({
			pdf,
			...post,
		})
	})

	await sequentialPromises(promises)
	results.forEach(({ pdf, slug }) => {
		fs.writeFileSync(
			path.resolve(OUTPUT_PATH, `${courseCode}_lecture_${slug}.pdf`),
			pdf
		)
	})
	console.log(results)
})()
