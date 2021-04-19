const { componentToPdf } = require('./componentToPdf')

class Test extends React.Component {
	render() {
		return React.createElement('h1')
	}
}

const component = new Test()

describe('componentToPdf', () => {
	it('should return a buffer', () => {
		expect(componentToPdf(component)).toBeInstanceOf(Buffer)
	})
})
