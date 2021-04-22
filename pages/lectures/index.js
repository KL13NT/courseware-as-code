/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'

import SEO from '../../components/SEO'

import { getAllPosts } from '../../lib/api'

import { courseCode, courseName, courseDescription } from '@config'

export default function Index({ posts }) {
	return (
		<>
			<SEO title='Blog' path='blog' />
			<h1>
				{courseCode} - {courseName}
			</h1>
			<p>{courseDescription}</p>
			<hr />
			<ul className='mt-12'>
				{posts.map(({ frontmatter, path }) => (
					<li className={'list-none mb-12'} key={frontmatter.name}>
						<Link href={path}>
							<a className='mx-auto bg-transparent'>
								<h2 className='mt-2 mx-auto text-2xl lg:text-4xl inline'>
									{frontmatter.name}
								</h2>
							</a>
						</Link>

						<p className='mt-2 text-xl'>
							{new Date(frontmatter.date).toLocaleDateString('en-GB', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>

						<p className='mt-2 text-xl'>{frontmatter.description}</p>
					</li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps() {
	const posts = getAllPosts('lectures')

	return {
		props: {
			posts,
		},
	}
}

export const config = {
	unstable_runtimeJS: false,
}
