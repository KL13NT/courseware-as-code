const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

/**
 *
 * @param {string} content
 * @param {string} dir
 */
module.exports = function (content) {
	const imageRegex = /!\[.*\]\((.+)\)/g
	const imageSrcRegex = /!\[.*\]\((.+)\)/
	const ext = /\.(.+)$/
	const match = content.match(imageRegex)
	let result = content

	if (!match) return content

	const urls = match.map(image => {
		const [, url] = image.match(imageSrcRegex)

		if (!url.startsWith('/')) return { url }
		else {
			const p = path.resolve(process.cwd(), 'public/', url.replace('/', ''))
			const base64 = `data:${mime.contentType(
				p.match(ext)[1]
			)};base64,${fs.readFileSync(p, 'base64')}`

			return { url, base64 }
		}
	})

	urls.forEach(url => {
		if (url.base64) result = result.replace(url.url, url.base64)
	})

	return result
}
