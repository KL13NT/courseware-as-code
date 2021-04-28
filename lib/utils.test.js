const { generatePdfFilename, formatDate } = require('./utils')

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
