import SEO from '../components/SEO'

export default function Index() {
	return (
		<>
			<SEO />
			<h1>Hello!</h1>
		</>
	)
}

// Per-page configuration to strip all nextjs client javascript from output
// bundle incase your code doesn't require javascript on the client at all
// export const config = {
// 	unstable_runtimeJS: false,
// }
