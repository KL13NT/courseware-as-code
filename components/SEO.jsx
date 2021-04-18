import React from 'react'
import Head from 'next/head'

//TODO: fill these
const url = ''
const title = ''
const description = ''
const og = ''

function SEO() {
	return (
		<Head>
			<title>{title}</title>
			<link
				type='application/rss+xml'
				rel='alternate'
				title='The Weekly Noob Podcast'
				href='https://anchor.fm/s/398d61b4/podcast/rss'
			/>
			<meta content={title} property='og:title' />
			<meta content='website' property='og:type' />
			<meta content={description} name='description' />
			<meta content={description} property='og:description' />
			<meta content={url} property='og:url' />
			<meta content='Nabil Tharwat' property='og:site_name' />
			<meta content={og} property='og:image' />
			<meta content={'image/jpeg'} property='og:image:type' />
			<meta content={og} property='og:image:url' />
			<meta content={og} property='og:image:secure_url' />
			<meta content='summary_large_image' name='twitter:card'></meta>
			<meta content={title} property='twitter:title' />
			<meta content={description} property='twitter:description' />
			<meta content='@Nabil_Tharwat' property='twitter:creator' />
			<meta content='@Nabil_Tharwat16' property='twitter:site' />
			<meta content={og} property='twitter:image' />
			<html lang='en-GB' />

			<link
				href='https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap'
				rel=''
			/>

			<link rel='manifest' href='/site.webmanifest' />
			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/icons/apple-touch-icon.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='/icons/favicon-32x32.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='16x16'
				href='/icons/favicon-16x16.png'
			/>
			<link rel='shortcut icon' href='/icons/favicon.ico' />
			<meta name='apple-mobile-web-app-title' content='The Weekly Noob' />
			<meta name='application-name' content='The Weekly Noob' />
			<meta name='msapplication-TileColor' content='#8a27a2' />
			<meta
				name='msapplication-TileImage'
				content='/icons/mstile-144x144.png'
			/>
			<meta name='msapplication-config' content='/icons/browserconfig.xml' />
			<meta name='theme-color' content='#ffffff' />
		</Head>
	)
}

export default SEO
