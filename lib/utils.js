const unified = require('unified')
const markdown = require('remark-parse')
const math = require('remark-math')
const remark2rehype = require('remark-rehype')
const katex = require('rehype-katex')
const stringify = require('rehype-stringify')
const highlight = require('rehype-highlight')
const embed = require('remark-embed-images')

const { highlightLanguages } = require('../site.config')

/**
 * Sequentially executes an array of promises
 * @param {Promise[]} promises
 */
function sequentialPromises(promises) {
	if (!Array.isArray(promises))
		throw TypeError(
			'Parameter must be an array of functions that return promises'
		)

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

/**
 * Creates a unified processor with shared plugins
 */
const createUnifiedMarkdownProcessor = (highlightLanguages = []) =>
	unified()
		.use(markdown)
		.use(math)
		.use(remark2rehype)
		.use(katex)
		.use(stringify)
		.use(highlight, {
			languages: new Map(
				highlightLanguages.map(lang => [
					lang,
					require(`../node_modules/highlight.js/lib/languages/${lang}`),
				])
			),
		})

/**
 * Produces HTML content with assets inlined
 */
const unifiedMarkdownInlineToHtml = content =>
	createUnifiedMarkdownProcessor(highlightLanguages).use(embed).process(content)

/**
 * Produces a 1-to-1 Markdown-to-HTML output
 */
const unifiedMarkdownToHtml = content =>
	createUnifiedMarkdownProcessor(highlightLanguages).process(content)

module.exports = {
	formatDate,
	unifiedMarkdownToHtml,
	unifiedMarkdownInlineToHtml,
	createUnifiedMarkdownProcessor,
	generatePdfFilename,
	sequentialPromises,
}
