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
		/** default layout for consistency with website */
		path.resolve(__dirname, './styling/layout.css'),
		/** katex styling for rendered LaTeX annotations */
		path.resolve(__dirname, './node_modules/katex/dist/katex.min.css'),
		/** highlight.js syntax-highlighting theme */
		path.resolve(
			__dirname,
			'./node_modules/highlight.js/styles/shades-of-purple.css'
		),
	],
	/** used for syntax highlighting */
	highlightLanguages: ['javascript', 'typescript'],
}
