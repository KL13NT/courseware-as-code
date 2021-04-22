/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import ReactMarkdown from 'react-markdown'

import SEO from '../../../components/SEO'

import { getPostByFilename } from '../../../lib/api'

import { courseCode, courseName } from '@config'
import { componentToPdf } from '../../../lib/componentToPdf'

export default function Slug({ content, frontmatter }) {
	return (
		<>
			<SEO />

			<h1>
				{courseCode} - {courseName}
			</h1>

			<h2 className='mt-2 mx-auto text-2xl lg:text-4xl inline'>
				{frontmatter.name}
			</h2>

			<p className='mt-2 text-xl'>
				{new Date(frontmatter.date).toLocaleDateString('en-GB', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>

			<p className='mt-2 text-xl'>{frontmatter.description}</p>

			<a href='?pdf=exportPDF'>Download this lecture as PDF</a>

			<hr />

			<ReactMarkdown>{content}</ReactMarkdown>
		</>
	)
}

export async function getServerSideProps({ res, params: { slug } }) {
	const post = getPostByFilename(slug, 'lectures')

	const buffer = await componentToPdf(<Slug {...post} />)

	res.setHeader(
		'Content-disposition',
		`attachment; filename="${courseCode}_lecture_${slug}"`
	)
	res.setHeader('Content-Type', 'application/pdf')
	res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate')
	res.end(buffer)

	return { props: {} }
}

export const config = {
	unstable_runtimeJS: false,
}
