const unified = require('unified')
const markdown = require('remark-parse')
const math = require('remark-math')
const remark2rehype = require('remark-rehype')
const katex = require('rehype-katex')
const stringify = require('rehype-stringify')
const highlight = require('rehype-highlight')

const { highlightLanguages } = require('../site.config')

/**
 * Sequentially executes an array of promises
 * @param {Promise[]} promises
 */
function sequentialPromises(promises) {
	return promises.reduce(
		(promise, task) => promise.then(task),
		Promise.resolve()
	)
}

/**
 * Returns a full name for generated PDF files where type is either lecture or slide
 * @param {string} courseCode
 * @param {string} slug
 * @param {string} type
 */
const generatePdfFilename = (courseCode, slug, type) => {
	const allowed = ['lectures', 'slides']
	if (!allowed.includes(type)) throw Error(`Type must be one of ${allowed}`)

	return `${courseCode}_${slug}_${type}.pdf`
}

/**
 * @param {Date} date
 * @returns {string}
 */
const formatDate = date =>
	new Date(date).toLocaleDateString('en-GB', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const unifiedMarkdownToHtml = content =>
	unified()
		.use(markdown)
		.use(math)
		.use(remark2rehype)
		.use(katex)
		.use(stringify)
		.use(highlight, {
			languages: !highlightLanguages
				? {}
				: new Map(
						highlightLanguages.map(lang => [
							lang,
							require(`../node_modules/highlight.js/lib/languages/${lang}`),
						])
				  ),
		})
		.process(content)

module.exports = {
	formatDate,
	unifiedMarkdownToHtml,
	generatePdfFilename,
	sequentialPromises,
}
