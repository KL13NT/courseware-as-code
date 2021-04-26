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
const generatePdfFilename = (courseCode, slug) => `${courseCode}_${slug}.pdf`

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
	sequentialPromises,
}
