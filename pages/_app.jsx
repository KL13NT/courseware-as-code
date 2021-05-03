import React from 'react'

import '../styling/globals.css'
import '../styling/index.css'

function App({ Component, pageProps }) {
	return (
		<div className='container'>
			<Component {...pageProps} />
		</div>
	)
}

export default App
