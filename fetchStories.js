const fetchStories = async () => {
	try {
		const fetchAccountId = require('./fetchAccountId')
		const account_name = 'limonemodas'
		const account_id = await fetchAccountId(account_name)
		const getFromCookieFile = require('./getFromCookieFile')
		const parameters = {
			account_name: account_name,
			account_id: account_id,
			session_id: getFromCookieFile('sessionid'),
			ds_user_id: getFromCookieFile('ds_user_id'),
			url: `https://i.instagram.com/api/v1/feed/user/${account_id}/story/`
		}
		const requestPromise = require('request-promise-native')
		const response = await requestPromise({
			url: parameters.url,
			headers: {
				'x-ig-capabilities': '3w==',
				'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
				host: 'i.instagram.com',
				cookie: `sessionid=${parameters.session_id}; ds_user_id=${parameters.ds_user_id}`
			}
		})
		const media = JSON.parse(response).reel.items
		const images = media.map( (item) => {
			return item.image_versions2.candidates.filter( (image) => {
				return image.height > 1000
			}).pop()
		})
		const request = require('request')
		const fs = require('fs')
		for (index = 0; index < images.length; index++) {
			request(images[index].url).pipe(fs.createWriteStream(`images/${account_name}-${index}.jpg`))
		}
	} catch (error) {
		console.log(error)
	}
}

fetchStories()
