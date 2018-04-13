const fetchStories = async (account_name, brand_name) => {
	try {
		const getFromCookieFile = require('./getFromCookieFile')
		const fetchAccountId = require('./fetchAccountId')
		const account_id = await fetchAccountId(account_name)
		const parameters = {
			account_name: account_name,
			account_id: account_id,
			ds_user_id: getFromCookieFile('ds_user_id'),
			session_id: getFromCookieFile('sessionid'),
			csrftoken: getFromCookieFile('csrftoken'),
			url: `https://i.instagram.com/api/v1/feed/user/${account_id}/story/`
		}
		const requestPromise = require('request-promise-native')
		const response = await requestPromise({ 
				url: parameters.url,
				headers: {
					'x-ig-capabilities': '3brTAw==',
					'user-agent': 'Instagram 10.26.0 (iPhone7,2; iOS 10_1_1; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
					authority: 'i.instagram.com',
					cookie: `ds_user_id=${parameters.ds_user_id}; sessionid=${parameters.session_id}; csrftoken=${parameters.csrftoken};`
				}
			})
		if (JSON.parse(response).reel !== null) {
			const media = JSON.parse(response).reel.items
			const images = media.map( (item) => {
				return item.image_versions2.candidates.filter( (image) => {
					return image.height > 1000
				}).pop()
			})
			const request = require('request')
			const fs = require('fs')
			for (let index = 0; index < images.length; index++) {
				request(images[index].url).pipe(fs.createWriteStream(`images/${brand_name}-${index}_.jpg`))
			}
			console.log(`${account_name}: stories downloaded successfully!`)
		} else {
			console.log(`${account_name}: - no stories today -`)
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = fetchStories
