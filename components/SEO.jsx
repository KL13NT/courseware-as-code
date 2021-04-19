import Head from 'next/head'

// fill these before deploying!
const URL = ''
const TITLE = ''
const DESCRIPTION = ''
const OG_TYPE = 'website'
const OG_IMAGE = ''
const SITENAME = ''
const TWITTER_CREATOR = ''

function SEO() {
	return (
		<Head>
			<title>{TITLE}</title>
			<meta content={TITLE} property='og:title' />
			<meta content={OG_TYPE} property='og:type' />
			<meta content={DESCRIPTION} name='description' />
			<meta content={DESCRIPTION} property='og:description' />
			<meta content={URL} property='og:URL' />
			<meta content={SITENAME} property='og:site_name' />
			<meta content={OG_IMAGE} property='og:image' />
			<meta content={'image/jpeg'} property='og:image:type' />
			<meta content={OG_IMAGE} property='og:image:URL' />
			<meta content={OG_IMAGE} property='og:image:secure_URL' />
			<meta content='summary_large_image' name='twitter:card'></meta>
			<meta content={TITLE} property='twitter:title' />
			<meta content={DESCRIPTION} property='twitter:description' />
			<meta content={TWITTER_CREATOR} property='twitter:creator' />
			<meta content={TWITTER_CREATOR} property='twitter:site' />
			<meta content={OG_IMAGE} property='twitter:image' />
			<html lang='en-GB' />
			{/* insert meta icons here  */}
		</Head>
	)
}

export default SEO
