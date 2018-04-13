const fetchAccountId = (igAccount) => {
	return new Promise( async (resolve, reject) => {
		try {
			const requestPromise = require('request-promise-native')
			const getFromCookieFile = require('./getFromCookieFile')
			const { users } = JSON.parse(await requestPromise({
				url: `https://i.instagram.com/api/v1/users/search/?&q=${igAccount}`,
				headers: {
					'x-ig-capabilities': '3brTAw==',
					'user-agent': 'Instagram 10.26.0 (iPhone7,2; iOS 10_1_1; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
					authority: 'i.instagram.com',
					cookie: `ds_user_id=${getFromCookieFile('ds_user_id')}; sessionid=${getFromCookieFile('sessionid')}; csrftoken=${getFromCookieFile('csrftoken')};`
				}
			}))
			const account = users.filter( ({ username }) => igAccount === username ).pop()
			if (account)
				resolve(account.pk)
			else
				reject(`${igAccount}: Essa conta do instagram não existe`)
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = fetchAccountId
