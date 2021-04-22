import React from 'react'

import '../styling/layout.css'
import '../styling/index.sass'

function App({ Component, pageProps }) {
	return (
		<div className='container'>
			<Component {...pageProps} />
		</div>
	)
}

export default App
