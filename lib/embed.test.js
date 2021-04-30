const embed = require('./embed')

describe('`embed` to transform /public paths to base64 URIs', () => {
	it('should return a different string than input', () => {
		expect(embed('![](/900.png)')).not.toEqual('![](/900.png)')
	})
})
