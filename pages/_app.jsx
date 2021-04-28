import React from 'react'

import '../styling/layout.css'

function App({ Component, pageProps }) {
	return (
		<div className='container'>
			<Component {...pageProps} />
		</div>
	)
}

export default App
