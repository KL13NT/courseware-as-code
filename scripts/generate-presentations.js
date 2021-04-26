const path = require('path')
const fs = require('fs')

const puppeteer = require('puppeteer')
const hummus = require('hummus')
const streams = require('memory-streams')
const showdown = new (require('showdown').Converter)()

const { courseCode } = require('../site.config')

const {
	formatDate,
	generatePdfFilename,
	sequentialPromises,
} = require('../lib/utils')
const { getAllSlides } = require('../lib/api')
const { htmlToPdf } = require('../lib/htmlToPdf')

const OUTPUT_PATH = path.resolve(__dirname, '../public')
const HEADER = '# NAME\n\nDESCRIPTION\n\nDATE\n\n---\n\n'

function combinePDFBuffers(firstBuffer, secondBuffer) {
	const outStream = new streams.WritableStream()
	const firstPDFStream = new hummus.PDFRStreamForBuffer(firstBuffer)
	const secondPDFStream = new hummus.PDFRStreamForBuffer(secondBuffer)

	const pdfWriter = hummus.createWriterToModify(
		firstPDFStream,
		new hummus.PDFStreamForResponse(outStream)
	)
	pdfWriter.appendPDFPagesFromPDF(secondPDFStream)
	pdfWriter.end()
	const newBuffer = outStream.toBuffer()
	outStream.end()

	return newBuffer
}

void (async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	const lectures = []
	const promises = getAllSlides('slides').map(post => async () => {
		const pages = []

		const { content, frontmatter } = post
		const md =
			HEADER.replace('NAME', frontmatter.name)
				.replace('DESCRIPTION', frontmatter.description)
				.replace('DATE', formatDate(frontmatter.date)) + content

		const mdPages = md.split('___')
		const pagePromises = mdPages.map(mdPage => async () => {
			const html = showdown.makeHtml(mdPage)

			const res = await htmlToPdf(
				page,
				html,
				[
					path.resolve(__dirname, '../styling/layout.css'),
					path.resolve(__dirname, '../styling/slide.css'),
				],
				{
					height: 720,
					width: 1280,
					scale: 1,
					printBackground: true,
					displayHeaderFooter: false,
					preferCSSPageSize: true,
				}
			)

			pages.push(res)
		})

		await sequentialPromises(pagePromises)

		console.log('[info] generating pdf file', frontmatter.name)

		const pdf = pages.reduce(combinePDFBuffers)

		lectures.push({
			pdf,
			...post,
		})
	})

	await sequentialPromises(promises)
	lectures.forEach(({ pdf, slug }) => {
		const filename = generatePdfFilename(courseCode, slug, 'slides')
		console.log('[info] writing output pdf file', filename)

		fs.writeFileSync(path.resolve(OUTPUT_PATH, filename), pdf)
	})

	await browser.close()
})()
