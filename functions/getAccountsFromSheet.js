const getAccountsFromSheet = async () => {
	try {
		require('dotenv').config()
		// get brands information from google spreadsheet
		const requestPromise = require('request-promise-native')
		const brandsInfo = JSON.parse(await requestPromise(process.env.SPREADSHEET_URL))
		// save name and update date of all instagram accounts and remove first element (sheet title row)
		const parseDate = require('./parseDate')
		const igAccounts = brandsInfo.values.map( (brandInfo) => {
			return {
				name: brandInfo[1],
				update: parseDate(brandInfo[3]),
				brand: brandInfo[0]
			}
		})
		igAccounts.shift()
		return igAccounts
	} catch (error) {
		return {
			message: 'Error on function getAccountsFromSheet()',
			error: error
		}
	}
}

module.exports = getAccountsFromSheet
