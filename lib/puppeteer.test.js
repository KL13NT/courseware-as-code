const { getPage, terminate } = require('./puppeteer')

beforeAll(async () => {
	await getPage()
})

afterAll(async () => {
	await terminate()
})

describe('getPage', () => {
	it('should return a Puppeteer.Page instance', async () => {
		const page = await getPage()
		expect(page).not.toBeUndefined()
	})

	it('different calls should return the same Page instance', async () => {
		const page = await getPage()
		expect(await getPage()).toEqual(page)
		expect(await getPage()).toEqual(page)
	})
})
