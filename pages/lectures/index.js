/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'

import SEO from '../../components/SEO'
import Container from '../../components/Container'

import { getAllPosts } from '../../lib/api'

export default function Index({ posts }) {
	return (
		<Container>
			<SEO title='Blog' path='blog' />
			<h1>CS512</h1>
			<p>This is a sample description for your course!</p>
			<hr />
			<ul className='mt-12'>
				{posts.map(post => (
					<li
						className={'list-none mb-12 text-center'}
						key={post.frontmatter.name}
					>
						<Link href={post.path}>
							<a className='mx-auto bg-transparent'>
								<h2 className='mt-2 mx-auto text-2xl lg:text-4xl inline'>
									{post.frontmatter.name}
								</h2>
							</a>
						</Link>

						<p className='mt-4 text-xl'>
							{new Date(post.frontmatter.date).toLocaleDateString('en-GB', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>

						<p className='mt-4 text-xl'>{post.frontmatter.description}</p>
					</li>
				))}
			</ul>
		</Container>
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
