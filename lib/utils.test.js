const {
	generatePdfFilename,
	formatDate,
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
