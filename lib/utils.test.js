const {
	generatePdfFilename,
	formatDate,
	createUnifiedMarkdownProcessor,
	unifiedMarkdownToHtml,
	unifiedMarkdownInlineToHtml,
	sequentialPromises,
} = require('./utils')

describe('generatePdfFilename', () => {
	it('should throw type is not `lectures` nor `slides`', () => {
		expect(() =>
			generatePdfFilename('CS551', 'tutorial', 'presentation')
		).toThrow()
	})

	it('should return proper pdf filename', () => {
		expect(generatePdfFilename('CS551', 'tutorial', 'lectures')).toEqual(
			'CS551_tutorial_lectures.pdf'
		)
		expect(generatePdfFilename('CS551', 'tutorial', 'slides')).toEqual(
			'CS551_tutorial_slides.pdf'
		)
	})
})

describe('formatDate', () => {
	it('should return properly formatted date string', () => {
		expect(formatDate(new Date(0, 0, 0, 0, 0, 0, 0))).toEqual(
			'Sunday, 31 December 1899'
		)
		expect(formatDate(new Date(0))).toEqual('Thursday, 1 January 1970')
	})
})

describe('unified markdown processors', () => {
	it('createUnifiedMarkdownProcessor should return a unifiedjs processor', () => {
		expect(createUnifiedMarkdownProcessor()).toEqual(
			expect.objectContaining({})
		)
	})

	it('createUnifiedMarkdownProcessor should return a unifiedjs processor even if no languages are passed', () => {
		expect(createUnifiedMarkdownProcessor()).toEqual(
			expect.objectContaining({})
		)
	})

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

	it('unifiedMarkdownInlineToHtml should return a proper HTML output', async () => {
		expect(await unifiedMarkdownInlineToHtml('# Header')).toEqual(
			expect.objectContaining({
				contents: expect.stringMatching('<h1>Header</h1>'),
			})
		)
	})
})

describe('sequential promise execution using sequentialPromises', () => {
	it('should resolve with the result of the last promise in the list', async () => {
		const before = [
			() => Promise.resolve(false),
			() => Promise.resolve(false),
			() => Promise.resolve(true),
		]
		expect(await sequentialPromises(before)).toEqual(true)
	})

	it('if a promise rejects it should be catch-able', async () => {
		const before = [
			() => Promise.resolve(false),
			() => Promise.resolve(false),
			() => Promise.reject(true),
		]

		await expect(sequentialPromises(before)).rejects.toEqual(true)
	})

	it('should throw if passed anything other than an Array', async () => {
		expect(() => sequentialPromises()).toThrow()
	})
})
