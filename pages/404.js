import React from 'react'

import SEO from '../components/SEO'

const NotFoundPage = () => (
	<>
		<SEO title='404: غير موجود' />
		<div className='text-center'>
			<h1>
				{'<'}NOT_FOUND{'>'}
			</h1>
			<p>
				This page doesn't exist.
				<a href='/'>Home</a>
			</p>
		</div>
	</>
)

// Per-page configuration to strip all nextjs client javascript from output
// bundle incase your code doesn't require javascript on the client at all
export const config = {
	unstable_runtimeJS: false
}

export default NotFoundPage
