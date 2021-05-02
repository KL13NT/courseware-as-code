const {
	isValidString,
	getAllCollectionSlugs,
	getAllPosts,
	getAllSlides,
	getPostBySlug,
	getWebPathFromSlug,
	unifiedMarkdownToHtml,
} = require('./api')

describe('isValidString', () => {
	it('should return false', async () => {
		expect(isValidString('')).toEqual(false)
		expect(isValidString()).toEqual(false)
		expect(isValidString(0)).toEqual(false)
		expect(isValidString({})).toEqual(false)
	})

	it('should return true', async () => {
		expect(isValidString('1')).toEqual(true)
		expect(isValidString('b')).toEqual(true)
	})
})

describe('getAllCollectionSlugs', () => {
	it('should throw', async () => {
		expect(() => getAllCollectionSlugs('')).toThrow()
	})

	it('should return an array', async () => {
		expect(Array.isArray(getAllCollectionSlugs('lectures'))).toEqual(true)
	})

	it('should return an array of strings', async () => {
		expect(getAllCollectionSlugs('lectures')).toEqual(['tutorial'])
	})
})

/**
 * These tests won't work without the tutorial markdown file in collection/lectures
 */
describe('getAllPosts', () => {
	it('should return an array', async () => {
		expect(Array.isArray(getAllPosts())).toEqual(true)
	})

	it('should return an array of posts', async () => {
		expect(getAllPosts()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					frontmatter: expect.objectContaining({
						date: expect.stringMatching(/.*/),
					}),
					content: expect.stringMatching(/.+/),
					slug: expect.stringMatching(/.+/),
					path: expect.stringMatching(/.+/),
				}),
			])
		)
	})
})

/**
 * These tests won't work without the tutorial markdown file in collection/lectures
 */
describe('getAllSlides', () => {
	it('should return an array', async () => {
		expect(Array.isArray(getAllSlides())).toEqual(true)
	})

	it('should return an array of posts', async () => {
		expect(getAllSlides()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					frontmatter: expect.objectContaining({
						date: expect.stringMatching(/.*/),
					}),
					content: expect.stringMatching(/.+/),
					slug: expect.stringMatching(/.+/),
					path: expect.stringMatching(/.+/),
				}),
			])
		)
	})
})

/**
 * These tests won't work without the tutorial markdown file in collection/lectures
 */
describe('getPostBySlug', () => {
	it('should throw', async () => {
		expect(() => getPostBySlug()).toThrow()
		expect(() => getPostBySlug('')).toThrow()
		expect(() => getPostBySlug('', '')).toThrow()
	})

	it('should return an object', async () => {
		expect(getPostBySlug('tutorial', 'lectures')).toEqual(
			expect.objectContaining({})
		)
	})

	it('should return a post', async () => {
		expect(getPostBySlug('tutorial', 'lectures')).toEqual(
			expect.objectContaining({
				frontmatter: expect.objectContaining({
					date: expect.stringMatching(/.*/),
				}),
				original: expect.stringMatching(/.+/),
				content: expect.stringMatching(/.+/),
				slug: expect.stringMatching(/.+/),
				path: expect.stringMatching(/.+/),
			})
		)
	})
})

describe('getWebPathFromSlug', () => {
	it('should throw', async () => {
		expect(() => getWebPathFromSlug()).toThrow()
		expect(() => getWebPathFromSlug('')).toThrow()
		expect(() => getWebPathFromSlug('', '')).toThrow()
	})

	it('should return a web route string', async () => {
		expect(getWebPathFromSlug('tutorial', 'lectures')).toEqual(
			expect.stringMatching(/(.+?)\/(.+?)+/)
		)
	})
})

describe('unified markdown processors', () => {
	it('unifiedMarkdownToHtml should return a promise', async () => {
		await expect(unifiedMarkdownToHtml()).resolves.toEqual(
			expect.objectContaining({ contents: expect.stringMatching('') })
		)
	})

	it('unifiedMarkdownToHtml should return a proper HTML output', async () => {
		expect(await unifiedMarkdownToHtml('# Header')).toEqual(
			expect.objectContaining({
				contents: expect.stringMatching('<h1>Header</h1>'),
			})
		)
	})
})
