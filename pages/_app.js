import React from 'react'

import '../styling/index.sass'

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
	const ReactDOM = require('react-dom')
	const axe = require('@axe-core/react')
	axe(React, ReactDOM, 1000)
}

function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}

export default App
