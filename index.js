const stories = async () => {
	try {
		const loginAndSaveCookie = require('./functions/loginAndSaveCookie')
		await loginAndSaveCookie()
		const fetchStories = require('./functions/fetchStories')
		await fetchStories()
	} catch (error) {
		console.log(error)
	}
}

stories()
