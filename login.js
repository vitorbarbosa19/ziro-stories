const puppeteer = require('puppeteer')

puppeteer.launch().then( async (browser) => {
	try {
		const page = await browser.newPage()
		await page.goto(`https://instagram.com`)
		await page.click(`a[href*='javascript']`)
		await page.type(`input[type*='text']`, 'ma.joana_', {delay: 200})
		await page.type(`input[type*='password']`, 'casa10', {delay: 200})
		await page.click(`form > span > button`)
		await page.waitForNavigation()
		const loginChallenge = await page.$$eval('button', (buttonTags) => {
			return Array.prototype.map.call(buttonTags, (button) => { 
				return button.textContent === 'Send Security Code' ? true : false
			}).reduce( (accumulator, currentValue) => {
				return accumulator || currentValue
			})
		})
		if (loginChallenge) {
			await page.screenshot({ path: './screenshots/preChallenge.jpg' })
			await page.click(`form > span`)
			await page.click(`form > span`)
			await page.waitFor(1500)
			await page.screenshot({ path: './screenshots/postSecurityCodeRequest.jpg' })
			const askUserForSecurityCode = require('./askUserForSecurityCode')
			const securityCode = await askUserForSecurityCode()
			await page.type(`#security_code`, securityCode, {delay: 200})	
			await page.click(`form > span`)
			await page.waitForNavigation()
			await page.screenshot({ path: './screenshots/postChallenge.jpg' })
		}
		const cookies = await page.cookies()
		const writeCookieFile = require('./writeCookieFile')
		console.log(await writeCookieFile(cookies))
		await browser.close()
	} catch (error) {
		console.log(error)
	}
})
