/**
 * Returns a full name for generated PDF files where type is either lecture or slide
 * @param {string} courseCode
 * @param {string} slug
 * @param {string} type
 */
const generatePdfFilename = (courseCode, slug, type = 'lecture') =>
	`${courseCode}_${type}_${slug}.pdf`

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

module.exports = {
	formatDate,
	generatePdfFilename,
}
