const fetchAccountId = (igAccount) => {
	return new Promise( async (resolve, reject) => {
		try {
			const requestPromise = require('request-promise-native')
			const accountInfo = await requestPromise(`https://instagram.com/${igAccount}/?__a=1`)
			resolve(JSON.parse(accountInfo).user.id)
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = fetchAccountId
