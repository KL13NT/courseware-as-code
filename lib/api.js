/**
 * This file contains functionality related to aggregating content and
 * turning it into a nextjs-compatible format for getStaticProps and
 * getStaticPaths as well as transforming markdown to html
 */
const { highlightLanguages } = require('../site.config')

const matter = require('gray-matter')
const unified = require('unified')
const markdown = require('remark-parse')
const math = require('remark-math')
const remark2rehype = require('remark-rehype')
const katex = require('rehype-katex')
const stringify = require('rehype-stringify')
const highlight = require('rehype-highlight')
const embed = require('./embed')

const { readFileSync, readdirSync, existsSync } = require('fs')
const { join, resolve } = require('path')
const { generatePdfFilename } = require('./utils')
const { courseCode } = require('../site.config')

const collections = join(process.cwd(), 'collections')

/**
 * Validates that a string has length > 0 and is typeof string
 * @param {string} v
 */
const isValidString = v => typeof v === 'string' && v.length > 0

/**
 * Available collections depend on the folders in collections folder
 */

/**
 * @typedef {Object} Slug
 * @property {String} path relative path from / without .md
 * @property {String} slug file name with .md
 */

function getAllCollectionSlugs(collection) {
	if (!isValidString(collection)) throw Error('`collection` must be string')

	return readdirSync(`${collections}/${collection}`)
		.filter(path => path.endsWith('.md'))
		.map(slug => slug.replace('.md', ''))
}

function getWebPathFromSlug(slug, collection) {
	if (!isValidString(collection) || !isValidString(slug))
		throw Error('`collection` | `slug` must be string')

	return `${collection}/${slug.replace('.md', '')}`
}

/**
 *
 * @param {String} slug
 * @param {String} collection
 */
function getPostBySlug(slug, collection, inline = false) {
	if (!isValidString(collection) || !isValidString(slug))
		throw Error('`collection` | `slug` must be string')

	const file = readFileSync(
		resolve(__dirname, `${collections}/${collection}/${slug}.md`),
		'utf-8'
	)

	const { data, content } = matter(file)

	return {
		frontmatter: {
			...data,
			date: new Date(data.date).toJSON(),
		},
		content: !inline ? content : embed(content),
		original: !inline ? file : embed(file),
		slug, // filename
		documents: {
			lecture: generatePdfFilename(courseCode, slug, 'lectures'),
			slides: existsSync(resolve(__dirname, `${collections}/slides/${slug}.md`))
				? generatePdfFilename(courseCode, slug, 'slides')
				: null,
		},
		path: getWebPathFromSlug(slug, collection), // web path
		dir: resolve(__dirname, `${collections}/${collection}`),
	}
}

/**
 * @param {boolean} inline
 */
function getAllPosts(inline) {
	const slugs = getAllCollectionSlugs('lectures')
	const posts = slugs
		.map(slug => getPostBySlug(slug, 'lectures', inline))
		.sort((post1, post2) => (post1.date > post2.date ? 1 : -1))

	return posts
}

/**
 * @param {boolean} inline
 */
function getAllSlides(inline) {
	const slugs = getAllCollectionSlugs('slides')
	const posts = slugs
		.map(slug => getPostBySlug(slug, 'slides', inline))
		.sort((post1, post2) => (post1.date > post2.date ? 1 : -1))

	return posts
}

/**
 * Produces a 1-to-1 Markdown-to-HTML output
 */
const unifiedMarkdownToHtml = content =>
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
		.process(content)

module.exports = {
	isValidString,
	getAllCollectionSlugs,
	getAllPosts,
	getAllSlides,
	getWebPathFromSlug,
	getPostBySlug,
	unifiedMarkdownToHtml,
}
