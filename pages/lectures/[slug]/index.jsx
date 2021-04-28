/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS
import 'highlight.js/styles/shades-of-purple.css' // a highlight-js theme

import SEO from '../../../components/SEO'

import {
	getAllCollectionSlugs,
	getPostBySlug,
	getWebPathFromSlug,
} from '../../../lib/api'

import { courseCode, courseName } from '@config'
import { generatePdfFilename, unifiedMarkdownToHtml } from '../../../lib/utils'

export default function Slug({ slug, content, frontmatter }) {
	return (
		<>
			<SEO title='Blog' path='blog' />

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

			<a
				href={`/${generatePdfFilename(courseCode, slug, 'lectures')}`}
				download
			>
				Download this lecture's PDF document
			</a>

			<br />

			<a href={`/${generatePdfFilename(courseCode, slug, 'slides')}`} download>
				Download this lecture's presentation
			</a>

			<hr />

			{/* <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
				{content}
			</ReactMarkdown> */}

			<div dangerouslySetInnerHTML={{ __html: content }} />
		</>
	)
}

export async function getStaticPaths() {
	const paths = getAllCollectionSlugs('lectures').map(slug => ({
		params: {
			slug,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params: { slug } }) {
	const post = getPostBySlug(slug, 'lectures')

	return {
		props: {
			...post,
			content: (await unifiedMarkdownToHtml(post.content)).contents,
			path: getWebPathFromSlug(slug, 'lecture'),
		},
	}
}

export const config = {
	unstable_runtimeJS: false,
}
