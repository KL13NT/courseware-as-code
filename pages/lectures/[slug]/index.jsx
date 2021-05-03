/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS
import 'highlight.js/styles/shades-of-purple.css' // a highlight-js theme

import SEO from '../../../components/SEO'

import {
	getAllCollectionSlugs,
	getPostBySlug,
	getWebPathFromSlug,
	unifiedMarkdownToHtml,
} from '../../../lib/api'

export default function Slug({ content, frontmatter, documents }) {
	return (
		<>
			<SEO title='Blog' path='blog' />

			<div className='header'>
				<time>
					{new Date(frontmatter.date).toLocaleDateString('en-GB', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</time>
				<h1>{frontmatter.name}</h1>
				<p>{frontmatter.description}</p>

				{documents.lecture ? (
					<>
						{' '}
						<a href={`/${documents.lecture}`} download>
							Download this lecture's PDF document
						</a>
						<br />
					</>
				) : null}

				{documents.slides ? (
					<>
						{' '}
						<a href={`/${documents.slides}`} download>
							Download this lecture's PDF presentation
						</a>
						<br />
					</>
				) : null}
			</div>

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
