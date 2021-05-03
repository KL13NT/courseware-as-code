const path = require('path')

module.exports = {
	/** the course name */
	courseName: 'Introduction to Computer Science',
	/** the course code */
	courseCode: 'CS551',
	/** a short course description */
	courseDescription: 'This is a sample description for your course!',
	/** your campus homepage link */
	campusLink: 'https://github.com/KL13NT/courseware-as-code',
	/** styles used when producing PDF presentation files. each item must be
	 * a fully resolved path */
	slideStyles: [
		path.resolve(__dirname, './styling/slides.css'),
		path.resolve(__dirname, './node_modules/katex/dist/katex.min.css'),
		path.resolve(
			__dirname,
			'./node_modules/highlight.js/styles/shades-of-purple.css'
		),
	],
	/** styles used when producing PDF lecture files. each item must be
	 * a fully resolved path */
	lectureStyles: [
		path.resolve(__dirname, './styling/globals.css'),
		path.resolve(__dirname, './styling/index.css'),
		path.resolve(__dirname, './node_modules/katex/dist/katex.min.css'),
		path.resolve(
			__dirname,
			'./node_modules/highlight.js/styles/shades-of-purple.css'
		),
	],
	/** marp-core constructor options for presentation generation */
	marpConstructorOptions: {},
	/** syntax-highlighting languages for website and pdf lectures */
	highlightLanguages: ['javascript', 'typescript'],
}
