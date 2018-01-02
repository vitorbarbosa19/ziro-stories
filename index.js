const stories = async () => {
	try {
		const loginAndSaveCookie = require('./functions/loginAndSaveCookie')
		await loginAndSaveCookie()
		const getAccountsFromSheet = require('./functions/getAccountsFromSheet')
		const igAccounts = await getAccountsFromSheet()
		const fetchStories = require('./functions/fetchStories')
		const timeoutToPleaseIg = require('./functions/timeoutToPleaseIg')
		for (let index = 0; index < igAccounts.length; index++) {
			await fetchStories(igAccounts[index].name, igAccounts[index].brand)
			await timeoutToPleaseIg(1500)
		}
		console.log('Program finished!')
	} catch (error) {
		console.log(error)
	}
}

stories()
