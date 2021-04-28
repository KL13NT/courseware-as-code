const path = require('path')

module.exports = {
	/** the course name */
	courseName: 'Sample Course',
	/** the course code */
	courseCode: 'CS551',
	/** a short course description */
	courseDescription: 'This is a sample description for your course!',
	/** your campus homepage link */
	campusLink: 'https://github.com/KL13NT/courseware-as-code',
	/** styles used when producing PDF files */
	printStyles: [
		path.resolve(__dirname, './styling/layout.css'),
		path.resolve(__dirname, './node_modules/katex/dist/katex.min.css'),
		path.resolve(
			__dirname,
			'./node_modules/highlight.js/styles/shades-of-purple.css'
		),
	],
	/** used for syntax highlighting */
	highlightLanguages: ['javascript', 'typescript'],
}
