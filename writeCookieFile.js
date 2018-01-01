const writeCookieFile = (cookies) => {
	return new Promise( (resolve, reject) => {
		try {
			const fs = require('fs')
			const util = require('util')
			fs.writeFile('cookies.js', `module.exports = ${util.inspect(cookies)}`, (error) => {
				if (error)
					reject(error)
				resolve('success')
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = writeCookieFile
