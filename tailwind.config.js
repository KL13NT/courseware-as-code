// tailwind.config.js
module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [
		'./pages/**/*.js',
		'./pages/**/*.jsx',
		'./components/**/*.js',
		'./components/**/*.jsx',
	],
	variants: {
		extend: {},
	},
	plugins: [],
	theme: {
		extend: {
			colors: {
				accent: '#F3F3F3',
				shadow: '#1F1F1F',
				link: '#FACF90',
				code: '#2d2b57',
				'dark-700': '#393939',
			},
			maxWidth: {
				min: 'min-content',
				max: 'max-content',
			},
		},
		fontFamily: {
			display:
				'Raleway, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
		},
	},
}
