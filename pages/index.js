import React from 'react'

import SEO from '../components/SEO'

export default function Index() {
	return (
		<>
			<SEO />
		</>
	)
}

// Per-page configuration to strip all nextjs client javascript from output
// bundle incase your code doesn't require javascript on the client at all
export const config = {
	unstable_runtimeJS: false
}
