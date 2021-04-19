const { Page } = require('puppeteer')
const { getPage } = require('./puppeteer')

describe('getPage', () => {
	it('should return a Puppeteer.Page instance', async () => {
		const page = await getPage()
		expect(page).toBeInstanceOf(Page)
	})

	it('different calls should return the same Page instance', ()=>{
		const page = await getPage()
		expect(await getPage()).toEqual(page)
		expect(await getPage()).toEqual(page)
	})
})
