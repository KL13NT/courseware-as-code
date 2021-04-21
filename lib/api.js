/**
 * This file contains functionality related to aggregating content and
 * turning it into a nextjs-compatible format for getStaticProps and getStaticPaths
 */

import matter from 'gray-matter'

import { readFileSync, readdirSync } from 'fs'
import { join, resolve } from 'path'

const collections = join(process.cwd(), 'collections')

const isValidString = v => typeof v === 'string' && v.length > 0

/**
 * Available collections depend on the folders in collections folder
 */

/**
 * @typedef {Object} Slug
 * @property {String} path relative path from / without .md
 * @property {String} slug file name with .md
 */

export function getAllCollectionSlugs(collection) {
	if (!isValidString(collection)) throw Error('`collection` must be string')

	return readdirSync(`${collections}/${collection}`)
		.filter(path => path.endsWith('.md'))
		.map(slug => slug.replace('.md', ''))
}

export function getFSPathFromSlug(slug, collection) {
	if (!isValidString(collection) || !isValidString(slug))
		throw Error('`collection` | `slug` must be string')

	return resolve(__dirname, `${collections}/${collection}/${slug}`)
}

export function getFSPathFromWeb(path) {
	if (!isValidString(path)) throw Error('`path` must be string')

	return resolve(__dirname, `${collections}/${path}.md`)
}

export function getWebPathFromSlug(slug, collection) {
	if (!isValidString(collection) || !isValidString(slug))
		throw Error('`collection` | `slug` must be string')

	return `${collection}/${slug.replace('.md', '')}`
}

/**
 *
 * @param {String} slug
 * @param {String} collection
 */
export function getPostByFilename(slug, collection) {
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
		html: content,
		slug, // filename
		path: getWebPathFromSlug(slug, collection), // web path
	}
}

export function getAllPosts(collection) {
	if (!isValidString(collection))
		throw Error('`collection` | `slug` must be string')

	const slugs = getAllCollectionSlugs(collection)
	const posts = slugs
		.map(slug => getPostByFilename(slug, collection))
		.sort((post1, post2) => (post1.date > post2.date ? 1 : -1))

	return posts
}
