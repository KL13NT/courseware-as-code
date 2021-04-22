import { courseCode, courseName, courseDescription } from '@config'

export default function Header() {
	return (
		<header>
			<h1>
				{courseCode} - {courseName}
			</h1>
			<p>{courseDescription}</p>
			<hr />
		</header>
	)
}
