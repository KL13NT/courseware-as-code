import fs from 'fs'
import path from 'path'

const stylePath = path.resolve(__dirname, '../styling/layout.css')
const style = fs.readFileSync(stylePath, 'utf-8')

export default function Print({ children }) {
	return (
		<>
			<style>{style}</style>
			{children}
		</>
	)
}
