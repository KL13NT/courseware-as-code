/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'

import SEO from '../../components/SEO'

import { getAllPosts } from '../../lib/api'

import { courseCode, courseName, courseDescription } from '@config'

import styles from './lectures.module.css'

export default function Index({ posts }) {
	return (
		<>
			<SEO title='Blog' path='blog' />
			<div className='header'>
				<h1>
					{courseCode} - {courseName}
				</h1>
				<p>{courseDescription}</p>
			</div>
			<hr />
			<ul className={styles.list}>
				{posts.map(({ frontmatter, path }) => (
					<li key={frontmatter.name}>
						<time>
							{new Date(frontmatter.date).toLocaleDateString('en-GB', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>

						<Link href={path}>
							<a>
								<h2>{frontmatter.name}</h2>
							</a>
						</Link>

						<p>{frontmatter.description}</p>

						<hr />
					</li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps() {
	const posts = getAllPosts()

	return {
		props: {
			posts,
		},
	}
}

export const config = {
	unstable_runtimeJS: false,
}
