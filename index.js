const stories = async () => {
	try {
		const loginAndSaveCookie = require('./functions/loginAndSaveCookie')
		await loginAndSaveCookie()
		const fetchStories = require('./functions/fetchStories')
		const brands = ['morinafashion', 'blessedstore', 'dicollanioficial', 'karmanioficial']
		for (let index = 0; index < brands.length; index++) {
			await fetchStories(brands[index])
		}
		console.log('Program finished!')
	} catch (error) {
		console.log(error)
	}
}

stories()
