module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: [
		'./pages/**/*.js',
		'./pages/**/*.jsx',
		'./components/**/*.js',
		'./components/**/*.jsx',
		'./components/**/*.mdx',
		'./pages/**/*.mdx'
	],
	theme: {
		extend: {},
		fontFamily: {}
	},
	variants: {},
	plugins: []
}
