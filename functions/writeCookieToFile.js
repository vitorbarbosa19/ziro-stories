const writeCookieToFile = (cookies) => {
	return new Promise( (resolve, reject) => {
		try {
			const fs = require('fs')
			const util = require('util')
			fs.writeFile('./functions/cookies.js', `module.exports = ${util.inspect(cookies)}`, (error) => {
				if (error)
					reject(error)
				resolve('Cookies saved to file successfully!')
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = writeCookieToFile
