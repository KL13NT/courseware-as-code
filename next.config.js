const path = require('path')

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
})

module.exports = withMDX({
	target: 'experimental-serverless-trace',
	pageExtensions: ['js', 'jsx', 'md', 'mdx'],
	future: {
		webpack5: true,
	},
	webpack: config => {
		config.resolve.alias['@config'] = path.resolve(
			__dirname,
			'./site.config.js'
		)

		return config
	},
})
