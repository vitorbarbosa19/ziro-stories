const loginAndSaveCookie = async () => {
	try {
		const puppeteer = require('puppeteer')
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.goto(`https://www.instagram.com/accounts/login`)
		await page.type(`input[type*='text']`, 'ma.joana_', {delay: 200})
		await page.type(`input[type*='password']`, 'casa10', {delay: 200})
		await page.click(`form > span > button`)
		await page.waitForNavigation()
		//check if there is a login challenge page
		const loginChallenge = await page.$$eval('button', (buttonTags) => {
			//scrape all buttons on current page and see if any is about sending a security code
			const buttonTexts = Array.prototype.map.call(buttonTags, (button) => { 
				return button.textContent === 'Send Security Code' ? true : false
			})
			if (buttonTexts.length > 0) {
				//if at least one button is about sending a security code, reduce to true
				return buttonTexts.reduce( (accumulator, currentValue) => {
					return accumulator || currentValue
				})
			}
			return false
		})
		if (loginChallenge) {
			await page.screenshot({ path: './functions/screenshots/1-preChallenge.jpg' })
			await page.keyboard.press('Escape')
			await page.click(`section > div > a`)
			await page.screenshot({ path: './functions/screenshots/2-closePopup.jpg' })
			await page.click(`form > span`)
			await page.waitFor(1500)
			await page.screenshot({ path: './functions/screenshots/3-securityCodeRequest.jpg' })
			const askUserForSecurityCode = require('./askUserForSecurityCode')
			const securityCode = await askUserForSecurityCode()
			await page.type(`#security_code`, securityCode, {delay: 200})	
			await page.click(`form > span`)
			await page.waitForNavigation()
			await page.screenshot({ path: './functions/screenshots/4-postChallenge.jpg' })
		}
		await page.goto(`https://www.instagram.com`)
		const cookies = await page.cookies()
		const writeCookieToFile = require('./writeCookieToFile')
		console.log(await writeCookieToFile(cookies))
		await browser.close()
	} catch (error) {
		console.log(error)
	}
}

module.exports = loginAndSaveCookie
