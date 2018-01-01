const askUserForSecurityCode = () => {
	return new Promise( (resolve, reject) => {
		try {
			const readline = require('readline')
			const grabSecurityCodeFromUser = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			})
			grabSecurityCodeFromUser.question(`Type the security code sent via email:`, async (answer) => {
				grabSecurityCodeFromUser.close()
				resolve(answer)
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = askUserForSecurityCode
